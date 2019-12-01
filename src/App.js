import React from 'react'

import { Grid, Cell, Card as MDCard } from 'react-md'
import { Card, Icon, Segment } from 'semantic-ui-react'

import Messages from './components/Message/Messages'
import MessageField from './components/Message/MessageField'

import useForm from './components/Message/useForm'

export default () => {
    const {
        fieldValues,
        messageList,
        handleInputChange,
        handleSend,
    } = useForm()

    return (
        <Grid
            className='md-paper'
            style={{ alignItems: "center", display: "flex", justifyContent: "center", height: '100vh' }}
        >
            <Cell align='top' size={6} style={{ height: '75vh' }} >
                <Segment
                    placeholder
                    fluid
                    style={{ height: '75vh', overflowY: 'hidden' }}
                    raised
                    color='blue'
                    attached='top'
                >
                    <Messages
                        messageList={messageList}
                    />
                </Segment>
                <Segment
                    fluid
                    attached='bottom'
                >
                    <MessageField
                        fieldValues={fieldValues}
                        handleInputChange={handleInputChange}
                        handleSend={handleSend}
                    />
                </Segment>
            </Cell>
        </Grid>
    )
}
