import React, { useState, useEffect } from 'react'
import {
    Button,
    Image,
    List,
    Popup,
    Card,
    Header,
    Item,
    Comment,
    Segment
} from 'semantic-ui-react'

import reverse from 'lodash/reverse'
import { useMutation, useSubscription, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_MAILS = gql`
    query GetMails ($input: QueryMailsInput!) {
        GetMails (input: $input) {
            id
            sender
            senderId
            recipient
            subject
            body
            sent_date
        }
    }
`

export default props => {
    const { user, newMail } = props

    const [inboxMails, setInboxMails] = useState([])

    const { loading, error, data } = useQuery(GET_MAILS, {
        variables: {
            input: {
                entity: 'Message',
                request_origin: user.user.id,
                topic: 'request-inbox',
                filter_fields: ['recipient'],
                filter_values: [user.user.email]
            }
        }
    })

    useEffect(() => {
        const isRecipientMail = newMail && newMail.recipient === user.user.email

        if (newMail && isRecipientMail) {
            setInboxMails(list => [...list, newMail])
        }
    }, [newMail])


    useEffect(() => {
        console.log('INBOX MAILS LIST RESULT', data)
        if (data) {
            setInboxMails([...data.GetMails])
        }

    }, [data])

    return (
        <Card fluid raised color='green'>
            <Card.Content header={<Header as='h4' icon='inbox' content='Inbox' color='teal' />} />
            <Card.Content description={
                <Item.Group divided>
                    {
                        reverse(inboxMails.map(e => (
                            <Item key={e.id} >
                                <Item.Image size='mini' src={`https://robohash.org/${e.recipient}`} />

                                <Item.Content>
                                    <Item.Header as='a'>{e.subject}</Item.Header>
                                    <Item.Meta>{`Date: ${e.sent_date}`}</Item.Meta>
                                    <Item.Meta>{`From: ${e.sender}`}</Item.Meta>
                                    <Item.Description>{e.body}</Item.Description>
                                    <Item.Extra>
                                        <Segment basic floated='right'>
                                            <Popup
                                                position='top right'
                                                content='Delete'
                                                trigger={<Button icon='trash' circular color='red' inverted />}
                                            />
                                        </Segment>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        )))
                    }
                </Item.Group>
            } />
        </Card>
    )
}
