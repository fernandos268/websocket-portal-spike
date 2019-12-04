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

    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadResponse, setUploadResponse] = useState(null)

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
        // socket.current.on('upload progress', data => setUploadProgress(data.progress))
        // socket.current.on('upload success', data => setUploadResponse(data))

    }, [])

    useEffect(() => {
        socket.current.on('upload-success', (data) => {
            console.log("TCL: upload-success", data.files_count)
            setUploadFileCount(data.files_count)
            socket.current.emit('request-file', data)
        })
    }, []);

    useEffect(() => {
        console.log('UPLOADED LIST --->', uploadedList)
        socketIOStream(socket.current).on('stream-uploaded-file', (stream, data) => {
            setNewMessage(data.message)
            let parts = []
            stream.on('data', (chunk) => {
                console.log('data', chunk)
                parts = [...parts, chunk]
            })

            stream.on('end', () => {
                console.log('end', data.file_name)
                setUploadedList(list => [...list, {
                    file_url: parseImage(parts),
                    file_name: data.file_name,
                    file_uid: data.file_uid
                }])
                setNewMessage(data.message)
            })
        })
    }, []);

    useEffect(() => {
        console.log('uploadFileCount -->', uploadFileCount)
    }, [uploadFileCount]);

    useEffect(() => {
        console.log('-------------------------------------------------------')
        console.log('POPULATE MESSAGE LIST 1111111')
        console.log('uploadedList.length -->', uploadedList.length, uploadedList)
        console.log('toUploadList.length -->', toUploadList.length)
        console.log('NUMBER OF FILES UPLOADED', uploadFileCount)
        console.log('-------------------------------------------------------')
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
        setFieldValues(fieldValues => ({
            ...fieldValues,
            message: '',
        }))
        setNewMessage({
            user: '',
            message: ''
        })
        setFileList([])
        setToUploadList([])
        setUploadedList([])
    }

    const handleSetSocketID = (id) => {
        setSocketId(id)
    }

    const handleInputChange = (value, key) => {
        const newFieldValues = { ...fieldValues, [key]: value }
        setFieldValues(newFieldValues)
    }

    const handleFileChange = (data) => {
        console.log("handleFileChange", data)

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
        if (!toUploadList.length && fieldValues.user.trim() === '' && fieldValues.message.trim() === '') {
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
        uploadProgress,
        handleInputChange,
        handleSend,
        handleFileChange,
        handleRemoveFile
    }
}
