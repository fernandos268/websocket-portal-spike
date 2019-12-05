import { useState, useRef, useEffect, useMemo } from 'react';
import socketIO from 'socket.io-client'
import socketIOStream from 'socket.io-stream'
import validator from 'validator'
import uuid from 'uuidv4';
import axios from 'axios'
import { message } from 'antd'
import { Number } from 'core-js';

const urlCreator = window.URL || window.webkitURL

export default () => {
    let socket = useRef(null)

    const [socketId, setSocketId] = useState('')
    const [fieldValues, setFieldValues] = useState({
        user: '',
        message: ''
    })
    const [messageList, setMessageList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [fileList, setFileList] = useState([])
    const [newMessage, setNewMessage] = useState({
        user: '',
        message: ''
    })

    const [uploadProgressList, setUploadProgressList] = useState([])
    const [toUploadList, setToUploadList] = useState([])
    const [uploadedList, setUploadedList] = useState([])
    const [uploadFileCount, setUploadFileCount] = useState(0)

    useEffect(() => {
        socket.current = socketIO('http://localhost:4040')
        socket.current.on('connected', socket_id => handleSetSocketID(socket_id))
        socket.current.on('new message', data => {
            setNewMessage(data)
            setMessageList(list => [...list, {
                ...data,
                files: []
            }])
        })
    }, [])

    // LISTEN ON EVENT FROM SERVER --> UPLOAD PROGRESS SENT BY SERVER
    useEffect(() => {
        socket.current.on('upload progress', data => setUploadProgressList(list => {
            if (!list.find(e => e.file_uid === data.file_uid)) {
                return [...list, data]
            }
            return list.map(e => e.file_uid === data.file_uid ? data : e)
        }))
    }, []);

    // LISTEN ON EVENT FROM SERVER --> ON UPLOADED FILE SUCCESS
    useEffect(() => {
        socket.current.on('upload-success', (data) => {
            setUploadFileCount(data.files_count)
            socket.current.emit('request-file', data)
        })
    }, []);

    // LISTEN ON EVENT FROM SERVER --> STREAM FILES FROM SERVER
    useEffect(() => {
        socketIOStream(socket.current).on('stream-uploaded-file', (stream, data) => {
            setNewMessage(data.message)
            let parts = []
            stream.on('data', (chunk) => {
                parts = [...parts, chunk]
            })

            stream.on('end', () => {
                setUploadedList(list => [...list, {
                    file_url: parseImage(parts),
                    file_name: data.file_name,
                    file_uid: data.file_uid
                }])
                setNewMessage(data.message)
            })
        })
    }, []);

    // WHEN ALL THE FILES ARE ALREADY RETTURNED FROM SERVER
    useEffect(() => {
        if (uploadedList.length && uploadedList.length === toUploadList.length) {
            setMessageList(list => [...list, {
                ...newMessage,
                files: uploadedList
            }])
            return clearFieldValues()
        }
        if (uploadedList.length && !toUploadList.length && uploadedList.length === uploadFileCount) {
            setMessageList(list => [...list, {
                ...newMessage,
                files: uploadedList
            }])
            return clearFieldValues()
        }
    }, [uploadedList])

    const parseImage = (parts) => {
        const blob = new Blob([...parts]);
        return urlCreator.createObjectURL(blob);
    }


    const clearFieldValues = () => {
        setFieldValues(fieldValues => ({    // CLEAR MESSAGE FIELD
            ...fieldValues,
            message: '',
        }))
        setNewMessage({                     // CLEAR NEW MESSAGE RECEIVER VARIABLE
            user: '',
            message: ''
        })
        setFileList([])                     // CLEAR LIST OF FILES PREVIEW
        setToUploadList([])                 // CLEAR LIST OF FILES TO BE UPLOADED
        setUploadedList([])                 // CLEAR LIST OF UPLOADED FILES
        setUploadProgressList([])           // CLEAR UPLOAD PROGRESS
    }

    const handleSetSocketID = (id) => {
        setSocketId(id)
    }

    const handleInputChange = (value, key) => {
        const newFieldValues = { ...fieldValues, [key]: value }
        setFieldValues(newFieldValues)
    }

    const handleFileChange = (data) => {
        const newFile = {
            ...data,
            status: 'done',
            name: data.name,
            url: urlCreator.createObjectURL(data)
        }

        setFileList(list => [...list, newFile])
        setToUploadList(list => [...list, data])

        return false
    }

    const handleRemoveFile = (fileToRemove) => {
        setFileList(list => [...list].filter(file => file.uid !== fileToRemove.uid))
        setToUploadList(list => [...list].filter(file => file.uid !== fileToRemove.uid))
    }

    const handleSend = () => {
        if (!toUploadList.lengtfsh && fieldValues.user.trim() === '' && fieldValues.message.trim() === '') {
            return message.error('USER AND MESSAGE FIELD IS REQUIRED')
        }

        if (toUploadList.length && (validator.isEmpty(fieldValues.user) && validator.isEmpty(fieldValues.message))) {
            return message.error('USER AND MESSAGE FIELD IS REQUIRED')
        }

        if (!toUploadList.length) {
            socket.current.emit('send message', { ...fieldValues, socket_id: socketId })
        }
        if (toUploadList.length) {
            return toUploadList.forEach(file => {
                const file_name = `${fieldValues.user}-${file.uid}--${file.name}`
                const stream = socketIOStream.createStream()
                socketIOStream(socket.current).emit('file upload', stream, {
                    fileInfo: file,
                    size: file.size,
                    file_name,
                    message: {
                        ...fieldValues,
                        socket_id: socketId
                    },
                    files_count: toUploadList.length
                })
                const blobstream = socketIOStream.createBlobReadStream(file)
                blobstream.pipe(stream)
            })
        }
    }

    return {
        fileList,
        isLoading,
        // fileInfo,
        fieldValues,
        messageList,
        uploadProgressList,
        handleInputChange,
        handleSend,
        handleFileChange,
        handleRemoveFile
    }
}



{
    id: 1
    percentage: 20
}

{
    id: 2
    percentage: 20
}

{
    id: 1
    percentage: 30
}

{
    id: 3
    percentage: 14
}
