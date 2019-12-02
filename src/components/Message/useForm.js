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
    const [fileInfo, setFileInfo] = useState({
        data: '',
        file: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [fileList, setFileList] = useState([])

    useEffect(() => {
        socket.current = socketIO('http://localhost:4040')
        socket.current.on('connected', socket_id => handleSetSocketID(socket_id))
        socket.current.on('new message', data => {
            setMessageList(list => [...list, data])
        })
    }, [])

    useEffect(() => {
        socketIOStream(socket.current).on('file-add-stream-success', function (data) {
            console.info('file uploaded to server')
            console.log(data)
        })
    }, []);

    const handleInputChange = (value, key) => {
        const newFieldValues = { ...fieldValues, [key]: value }
        setFieldValues(newFieldValues)
    }

    const handleAddToList = (list, message) => {
        const newList = [...list, message]
        setMessageList(newList)
    }

    const handleFileChange = (data, file) => {
        console.log("TCL: handleFileChange -> data, file", { data, file })
        setFileInfo({ data, file })
    }

    const handleSend = () => {
        // if (fieldValues.user !== '' && fieldValues.message !== '') {
        // socket.current.emit('send message', { ...fieldValues, socket_id: socketId })
        // }

        // if (fileInfo) {
        // const result = await axios({
        // url: 'http://localhost:4040/fileupload',
        // method: 'post',
        // data: { file: fileInfo }
        // })
        // console.log('AXIOS RESPONSE', result);
        // }

        const {
            data,
            file
        } = fileInfo

        if (!data && !file) {
            return message.error('NO FILE TO UPLOAD')
        }

        // socketIOStream.forceBase64 = true
        const filename = data.name
        const filesize = data.size
        const enc = 'multipart/form-data'
        const stream = socketIOStream.createStream()
        socketIOStream(socket.current).emit('file upload', stream, {
            data: fileInfo,
            size: file,
            fileName: filename,
            enc: enc
        })
        const blobstream = socketIOStream.createBlobReadStream(data);
        console.log("TCL: handleSend -> blobstream", blobstream)
        blobstream.pipe(stream);


        // ---------------------------------------------------------------
        // const stream = socketIOStream.createStream()
        // socketIOStream.createBlobReadStream(data.files[0].buffer).pipe(stream)
        // const blobStream = socketIOStream.createBlobReadStream(data.files[0].buffer.buffer)
        // var size = 0
        // blobStream.on('data', function (chunk) {
        //     size += chunk.length;
        //     console.log(Math.floor(size / data.size * 100) + '%')
        // })

        // blobStream.pipe(stream)
        // socketIOStream(socket.current).emit('file-add-stream', {name: 'images.jpeg'})
        // socketIOStream(socket.current).on('file-upload-stream-success', function (data) {
        //     console.info('file uploaded to server')
        //     console.log(data)
        // })
    }

    const handleSetSocketID = (id) => {
        setSocketId(id)
    }

    return {
        fileList,
        isLoading,
        fileInfo,
        fieldValues,
        messageList,
        handleInputChange,
        handleAddToList,
        handleSend,
        handleFileChange
    }
}
