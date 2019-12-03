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
    const [streamedFile, setStreamedFile] = useState(null)
    const [uploadResponse, setUploadResponse] = useState(null)

    useEffect(() => {
        socket.current = socketIO('http://localhost:4040')
        socket.current.on('connected', socket_id => handleSetSocketID(socket_id))
        socket.current.on('new message', data => setMessageList(list => [...list, data]))
        socket.current.on('upload progress', data => setUploadProgress(data.progress))
        socket.current.on('upload success', data => setUploadResponse(data))
    }, [])

    useEffect(() => {
        console.log("uploadProgress --->", uploadProgress)
    }, [uploadProgress])

    // useEffect(() => {
    //     if (uploadResponse && uploadResponse.success) {
    //         const stream = socketIOStream.createStream()
    //         const file_name = `${fieldValues.user}--${fileInfo.name}`
    //         socketIOStream(socket.current).emit('client-stream-request', stream, { file_name })
    //     }
    // }, [uploadResponse])

    useEffect(() => {
        socketIOStream(socket.current).on('stream-uploaded-file', (stream, data) => {
            console.log('received', data)
            let parts = []
            stream.on('data', (data) => {
                console.log('data', data)
                parts.push(data)
            })

            stream.on('end', () => {
                console.log('end')
                parseImage(parts)
            });
        });
    }, []);

    useEffect(() => {
        console.log('STREAMED FILE -->', streamedFile)
    }, [streamedFile])

    const handleSetSocketID = (id) => {
        setSocketId(id)
    }

    const parseImage = (parts) => {
        // const arrayBufferView = new Uint8Array(image);
        const blob = new Blob([...parts], { type: "image/jpeg" });
        const urlCreator = window.URL
        window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);
        setStreamedFile(imageUrl)
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
        console.log("TCL: handleFileChange -> handleFileChange", data)
        setUploadProgress(0)
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
        setUploadProgress(0)
    }

    const handleSend = () => {
        if (fieldValues.user === '' && fieldValues.message === '') {
            return message.error('USER AND MESSAGE FIELDS ARE REQUIRED')
        }

        if (!fileInfo) {
            return message.error('NO FILE TO UPLOAD')
        }

        socket.current.emit('send message', { ...fieldValues, socket_id: socketId })
        const file_name = `${fieldValues.user}--${fileInfo.name}`
        const stream = socketIOStream.createStream()
        socketIOStream(socket.current).emit('file upload', stream, {
            fileInfo,
            size: fileInfo.size,
            file_name,
        })
        const blobstream = socketIOStream.createBlobReadStream(fileInfo)
        blobstream.pipe(stream)
    }

    return {
        streamedFile,
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
