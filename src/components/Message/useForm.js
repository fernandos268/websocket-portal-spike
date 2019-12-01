import { useState, useRef, useEffect, useMemo } from 'react';
import socketIO from 'socket.io-client'
import uuid from 'uuidv4';

export default () => {
    let socket = useRef(null)
    const [socketId, setSocketId] = useState('')
    const [fieldValues, setFieldValues] = useState({
        user: '',
        message: ''
    })
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        socket.current = socketIO('http://localhost:4040')
        socket.current.on('connected', socket_id => handleSetSocketID(socket_id))
        socket.current.on('new message', data => {
            console.log("TCL: new message", data)
            setMessageList(list => [...list, data])
        })

    }, [])

    useEffect(() => {
        console.log('MESSAGE LIST CHANGED', messageList)
    }, [messageList])

    const handleInputChange = (value, key) => {
        const newFieldValues = { ...fieldValues, [key]: value }
        setFieldValues(newFieldValues)
    }

    const handleAddToList = (list, message) => {
        const newList = [...list, message]
        setMessageList(newList)
    }

    const handleSend = () => {
        if (fieldValues.user !== '' && fieldValues.message !== '') {
            socket.current.emit('send message', { ...fieldValues, socket_id: socketId })
        }
    }

    const handleSetSocketID = (id) => {
        setSocketId(id)
    }

    return {
        fieldValues,
        messageList,
        handleInputChange,
        handleAddToList,
        handleSend
    }
}
