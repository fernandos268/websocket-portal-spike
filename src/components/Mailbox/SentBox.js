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

    console.log('#######################################################################33')
    console.log({ newMail })

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

    useEffect(() => {
        console.log('SENTBOX => useEffect 2 --> ', newMail)
        const isSenderMail = newMail && newMail.sender === user.user.email

        const isExist = sentMails.find(e => e.id === newMail.id)
        if (isSenderMail) {
            setSentMails(list => [...list, newMail])
        }

    }, [newMail])


    useEffect(() => {
        console.log('SENTBOX MAILS LIST RESULT', data)
        if (data) {
            setSentMails([...data.GetMails])
        }
    }, [data])


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
