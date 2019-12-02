import { useState, useRef, useEffect, useMemo } from 'react';
import socketIO from 'socket.io-client'
import socketIOStream from 'socket.io-stream'
import uuid from 'uuidv4';
import axios from 'axios'
import { message } from 'antd'

export default () => {
    let socket = useRef(null)
    const [socketId, setSocketId] = useState('')
    const [fieldValues, setFieldValues] = useState({
        user: '',
        message: ''
    })
    const [messageList, setMessageList] = useState([])
    const [fileInfo, setFileInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [fileList, setFileList] = useState([])
    const [uploadProgress, setUploadProgress] = useState(0)

    useEffect(() => {
        socket.current = socketIO('http://localhost:4040')
        socket.current.on('connected', socket_id => handleSetSocketID(socket_id))
        socket.current.on('new message', data => {
            setMessageList(list => [...list, data])
        })
        socket.current.on('upload sucess', data => setUploadProgress(data.upload_progress))
    }, [])

    useEffect(() => {
        socketIOStream(socket.current).on('file-add-stream-success', function (data) {
            console.info('file uploaded to server')
            console.log(data)
        })
    }, []);

    useEffect(() => {
        console.log('UPLOAD PROGRESS ---> ', uploadProgress)
    }, [uploadProgress])

    const handleSetSocketID = (id) => {
        setSocketId(id)
    }

    const handleInputChange = (value, key) => {
        const newFieldValues = { ...fieldValues, [key]: value }
        setFieldValues(newFieldValues)
    }

    const handleAddToList = (list, message) => {
        const newList = [...list, message]
        setMessageList(newList)
    }

    const handleFileChange = (data) => {
        if (fileList.length === 0) {
            setFileList(list => [...list, data])
            setFileInfo(data)
        } else if (fileList.length === 1) {
            setFileList(list => [...list, data].slice(1))
            setFileInfo(data)
        }
    }

    const handleRemoveFile = (fileToRemove) => {
        console.log("TCL: handleRemoveFile -> handleRemoveFile", fileToRemove)
        setFileInfo(info => info.uid !== fileToRemove.uid ? info : null)
        setFileList(list => [...list].filter(file => file.uid !== fileToRemove.uid))
    }

    const handleSend = () => {
        if (fieldValues.user === '' && fieldValues.message === '') {
            return message.error('USER AND MESSAGE FIELDS ARE REQUIRED')
        }

        if (!fileInfo) {
            return message.error('NO FILE TO UPLOAD')
        }

        socket.current.emit('send message', { ...fieldValues, socket_id: socketId })
        const enc = 'multipart/form-data'
        const stream = socketIOStream.createStream()
        const file_name = `${fieldValues.user}--${fileInfo.name}`

        socketIOStream(socket.current).emit('file upload', stream, {
            data: fileInfo,
            size: fileInfo.size,
            file_name,
            enc: enc
        })
        const blobstream = socketIOStream.createBlobReadStream(fileInfo);
        console.log("TCL: handleSend -> blobstream", blobstream)
        blobstream.pipe(stream);
    }

    return {
        fileList,
        isLoading,
        fileInfo,
        fieldValues,
        messageList,
        uploadProgress,
        handleInputChange,
        handleAddToList,
        handleSend,
        handleFileChange,
        handleRemoveFile
    }
}
