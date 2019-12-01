import { useState, useRef, useEffect, useMemo } from 'react';
import socketIO from 'socket.io-client'
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

    useEffect(() => {
        socket.current = socketIO('http://localhost:4040')
        socket.current.on('connected', socket_id => handleSetSocketID(socket_id))
        socket.current.on('new message', data => {
            setMessageList(list => [...list, data])
        })

    }, [])

    const handleInputChange = (value, key) => {
        const newFieldValues = { ...fieldValues, [key]: value }
        setFieldValues(newFieldValues)
    }

    const handleAddToList = (list, message) => {
        const newList = [...list, message]
        setMessageList(newList)
    }

    const handleSend = async () => {
        // if (fieldValues.user !== '' && fieldValues.message !== '') {
        //     socket.current.emit('send message', { ...fieldValues, socket_id: socketId })
        // }
        const result = await axios({
            url: 'http://localhost:4040/fileupload',
            method: 'post',
            data: { file: 'testing 123' }
        })
    }

    const handleSetSocketID = (id) => {
        setSocketId(id)
    }

    const handleFileChange = (fileInfo) => {
        const { status } = fileInfo.file;
        if (status !== 'uploading') {
            console.log(fileInfo.file, fileInfo.fileList);
            setFileInfo(fileInfo.file)
        }
        if (status === 'done') {
            message.success(`${fileInfo.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${fileInfo.file.name} file upload failed.`);
        }
    }

    return {
        fileInfo,
        fieldValues,
        messageList,
        handleInputChange,
        handleAddToList,
        handleSend,
        handleFileChange
    }
}
