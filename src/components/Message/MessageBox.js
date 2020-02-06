import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import Selectors from '../../Redux/Selectors'
import { withRouter } from 'react-router-dom'
import { Grid, Cell } from 'react-md'
import { Card, Icon, Segment, Image, Header } from 'semantic-ui-react'

import Messages from './Messages'
import MessageField from './MessageField'
import MessageFileInput from './MessageFileInput'

import useHooks from './useHooks'

const { UserSelector } = Selectors

const MessageBox = withRouter(props => {
    const { user, newMail } = props

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
    } = useHooks(user, newMail)

    return (
        <Card fluid raised>
            <Card.Content header={<Header as='h4' icon='paper plane outline' content='Form' color='teal' />} />
            <Card.Content description={
                <Segment raised basic>
                    <Segment
                        vertical
                    >
                        <MessageField
                            fieldValues={fieldValues}
                            handleInputChange={handleInputChange}
                            handleSend={() => handleSend()}
                            isLoading={isLoading}
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
                </Segment>
            } />
        </Card>
    )
})

export default connect(UserSelector)(MessageBox)
