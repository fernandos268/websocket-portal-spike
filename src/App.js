import React from 'react'

import { Grid, Cell } from 'react-md'
import { Card, Icon, Segment, Image } from 'semantic-ui-react'

import Messages from './components/Message/Messages'
import MessageField from './components/Message/MessageField'
import MessageFileInput from './components/Message/MessageFileInput'

import useHooks from './components/Message/useHooks'

export default () => {
    const {
        fileList,
        isLoading,
        fileInfo,
        fieldValues,
        messageList,
        uploadProgressList,
        handleInputChange,
        handleSend,
        handleFileChange,
        handleRemoveFile
    } = useHooks()

    return (
        <Grid
            className='md-paper'
            style={{ alignItems: "center", display: "flex", justifyContent: "center", height: '100vh' }}
        >
            <Cell align='top' size={6} style={{ height: '55vh' }} >
                <Segment color='blue' raised>
                    <Segment
                        vertical
                        placeholder
                        style={{ height: '55vh', overflowY: 'hidden' }}
                    >
                        <Messages
                            messageList={messageList}
                        />
                    </Segment>
                    <Segment
                        vertical
                    >
                        <MessageFileInput
                            fileList={fileList}
                            fileInfo={fileInfo}
                            handleFileChange={handleFileChange}
                            handleRemoveFile={handleRemoveFile}
                            uploadProgress={uploadProgressList}
                        />
                    </Segment>
                    <Segment
                        vertical
                    >
                        <MessageField
                            fieldValues={fieldValues}
                            handleInputChange={handleInputChange}
                            handleSend={handleSend}
                            isLoading={isLoading}
                        />
                    </Segment>
                </Segment>
            </Cell>
        </Grid>
    )
}
