import { useState, useRef, useEffect, useMemo } from 'react';
import socketIO from 'socket.io-client'
import socketIOStream from 'socket.io-stream'
import validator from 'validator'
import uuid from 'uuidv4';
import { message } from 'antd'

import { useMutation, useSubscription, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const urlCreator = window.URL || window.webkitURL

const NEW_MESSAGE_SUBSCRIPTION = gql`
subscription newMessages {
    newMessages {
        id
        sender
        recipient
        subject
        body
    }
}
`

const DELETE_MESSAGE_SUBSCRIPTION = gql`
subscription deletedMessage {
    deletedMessage {
        id
        sender
        recipient
        subject
        body
    }
}
`

export default (user) => {

    const [newMail, setNewEmail] = useState(null)
    const [deletedMail, setDeletedMail] = useState(null)

    const {
        data: sub_data,
        error: sub_error
    } = useSubscription(NEW_MESSAGE_SUBSCRIPTION)

    const {
        data: del_data,
        error: del_error
    } = useSubscription(DELETE_MESSAGE_SUBSCRIPTION)

    useEffect(() => {
        if (sub_data) {
            setNewEmail(sub_data.newMessages)
        }
    }, [sub_data])


    useEffect(() => {
        if (del_data) {
            setDeletedMail(del_data.deletedMessage)
        }
    }, [del_data])

    const handleQueryMails = () => {

    }

    const handleDeleteMail = (id) => {

    }

    return {
        newMail,
        deletedMail,
        handleQueryMails,
        handleDeleteMail
    }
}
