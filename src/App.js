import React from 'react'

import { Grid, Cell, Card as MDCard } from 'react-md'
import { Card, Icon, Segment } from 'semantic-ui-react'

import Messages from './components/Message/Messages'
import MessageField from './components/Message/MessageField'
import MessageFileInput from './components/Message/MessageFileInput'

import useForm from './components/Message/useForm'

export default () => {
    const {
        fileList,
        isLoading,
        fileInfo,
        fieldValues,
        messageList,
        handleInputChange,
        handleSend,
        handleFileChange
    } = useForm()

    return (
        <Grid
            className='md-paper'
            style={{ alignItems: "center", display: "flex", justifyContent: "center", height: '100vh' }}
        >
            <Cell align='top' size={6} style={{ height: '55vh' }} >
                <Segment
                    placeholder
                    style={{ height: '55vh', overflowY: 'hidden' }}
                    raised
                    color='blue'
                    attached='top'
                >
                    <Messages
                        messageList={messageList}
                    />
                </Segment>
                <Segment
                    attached
                >
                    <MessageFileInput
                        fileList={fileList}
                        fileInfo={fileInfo}
                        handleFileChange={handleFileChange}
                    />
                </Segment>
                <Segment
                    attached='bottom'
                >
                    <MessageField
                        fieldValues={fieldValues}
                        handleInputChange={handleInputChange}
                        handleSend={handleSend}
                        isLoading={isLoading}
                    />
                </Segment>
            </Cell>
        </Grid>
    )
}
