import React from 'react'

import { Grid, Cell } from 'react-md'
import { Card, Icon, Segment, Image } from 'semantic-ui-react'

import Messages from './components/Message/Messages'
import MessageField from './components/Message/MessageField'
import MessageFileInput from './components/Message/MessageFileInput'

import useForm from './components/Message/useForm'

export default () => {
    const {
        streamedFile,
        fileList,
        isLoading,
        fileInfo,
        fieldValues,
        messageList,
        uploadProgress,
        handleInputChange,
        handleSend,
        handleFileChange,
        handleRemoveFile
    } = useForm()

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
                            uploadProgress={uploadProgress}
                        />
                    </Segment>
                    <Segment>
                        <Image src={streamedFile} size='small' />
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
