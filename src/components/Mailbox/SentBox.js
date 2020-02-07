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
import { useMutation, useSubscription, useQuery, useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { withApollo } from 'react-apollo'

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

const DELETE_MAIL = gql`
    mutation deleteMessage($id: String!) {
        deleteMessage(id: $id) {
            status
            action
            entity
        }
    }
`

export default props => {
    console.log('SentBox --> props: ', props);
    const { user, newMail, deletedMail } = props

    const [sentMails, setSentMails] = useState([])

    const { loading, error, data } = useQuery(GET_MAILS, {
        variables: {
            input: {
                entity: 'Message',
                request_origin: user.user.id,
                topic: 'request-sent-items',
                filter_fields: ['sender'],
                filter_values: [user.user.email]
            }
        }
    })

    const [runQuery, { loading: runQuery_loading, error: runQuery_error, data: runQuery_data }] = useLazyQuery(GET_MAILS)

    const [deleteMessage, { data: del_data, loading: del_loading, error: del_error }] = useMutation(DELETE_MAIL)

    useEffect(() => {
        const isSenderMail = newMail && newMail.sender === user.user.email
        if (isSenderMail) {
            setSentMails(list => [...list, newMail])
        }

    }, [newMail])

    useEffect(() => {
        if (deletedMail) {
            console.log('RE TRIGGER THE QUERY', deletedMail)
            runQuery({
                variables: {
                    input: {
                        entity: 'Message',
                        request_origin: user.user.id,
                        topic: 'request-sent-items',
                        filter_fields: ['sender'],
                        filter_values: [user.user.email]
                    }
                }
            })
        }
    }, [deletedMail])

    useEffect(() => {
        if (data) {
            console.log('SENTBOX MAILS LIST RESULT ==> data', data)
            setSentMails([...data.GetMails])
        }
    }, [data])

    useEffect(() => {
        if (runQuery_data) {
            console.log('SENTBOX MAILS LIST RESULT ==> runQuery_data', data)
            setSentMails([...runQuery_data.GetMails])
        }
    }, [runQuery_data])

    return (
        <Card fluid raised color='brown'>
            <Card.Content header={<Header as='h4' icon='paper plane outline' content='Sent Items' color='teal' />} />
            <Card.Content description={
                <Item.Group divided>
                    {
                        reverse(sentMails.map(e => (
                            <Item key={e.id} >
                                <Item.Image size='mini' src={`https://robohash.org/${e.sender}`} />

                                <Item.Content>
                                    <Item.Header>{e.subject}</Item.Header>
                                    <Item.Meta>{`Date: ${e.sent_date}`}</Item.Meta>
                                    <Item.Meta>{`To: ${e.recipient}`}</Item.Meta>
                                    <Item.Description>{e.body}</Item.Description>
                                    <Item.Extra>
                                        <Segment basic floated='right'>
                                            <Popup
                                                position='top right'
                                                content='Delete'
                                                trigger={
                                                    <Button
                                                        icon='trash'
                                                        color='red'
                                                        inverted
                                                        circular
                                                        onClick={() => deleteMessage({
                                                            variables: {
                                                                id: e.id
                                                            }
                                                        })}
                                                    />
                                                }
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
