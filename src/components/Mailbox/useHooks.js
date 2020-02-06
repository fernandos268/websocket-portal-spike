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

export default (user) => {

    const [newMail, setNewEmail] = useState(null)

    useEffect(() => {
        console.log('newEmail --> useHooks -->', newMail)
    })

    const {
        data: sub_data,
        error: sub_error
    } = useSubscription(NEW_MESSAGE_SUBSCRIPTION)

    console.log('useSubscription(NEW_MESSAGE_SUBSCRIPTION) =>', sub_data);

    useEffect(() => {
        if (sub_data) {
            setNewEmail(sub_data.newMessages)
        }
    }, [sub_data])

    const handleQueryMails = () => {

    }

    return {
        newMail,
        handleQueryMails
    }
}
