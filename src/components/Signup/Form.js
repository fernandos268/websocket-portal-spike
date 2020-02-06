import React, { Fragment, useState } from 'react'

import {
    Form,
    Icon,
    Input,
    Button,
    Upload
} from 'antd'

import {
    Dimmer,
    Button as SUIButton,
    Header,
    Image,
    Grid
} from 'semantic-ui-react'

import useFieldValues from '../Hooks/useFieldValues'
import useErrorText from '../Hooks/useErrorText'
import useFieldStatus from '../Hooks/useFieldStatus'

import eventHandlers from './eventHandlers'

const { Dragger } = Upload

const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    photo: []
}

const urlCreator = window.URL || window.webkitURL


export default () => {
    const [errorText, handleErrorText] = useErrorText(initialState)
    const [fieldStatus, handleFieldStatus] = useFieldStatus(initialState)
    const [fieldValues, handleInputChange] = useFieldValues(initialState)

    const [isDimmed, setIsDimmed] = useState(false)

    const { handleSubmit } = eventHandlers()

    const handleFileChange = (data) => {
        const newFile = [{
            ...data,
            status: 'done',
            name: data.name,
            url: urlCreator.createObjectURL(data)
        }]

        handleInputChange(newFile, 'photo')

        return false
    }

    const handleRemoveFile = () => {
        handleInputChange([], 'photo')
    }

    const draggerProps = {
        fileList: fieldValues.photo,
        listType: "picture-card",
        showUploadList: false,
        accept: '.png, .jpg, .jpeg',
        customRequest: () => false,
        onRemove: handleRemoveFile,
        onPreview: () => { },
        beforeUpload: (file) => handleFileChange(file),
        onDownload: () => console.log('ON DOWNLOAD')
    }

    const uploadButton = (
        <div>
            <Icon type='plus' />
            <div className="ant-upload-text">Upload</div>
        </div>
    )

    return (
        <Form onSubmit={event => handleSubmit(event, fieldValues)}>
            <Form.Item
                help={errorText.first_name}
                validateStatus={fieldStatus.first_name}
                label="Photo"
            >
                <Grid
                    verticalAlign="middle"
                    padded
                    centered
                    style={{ height: '100%' }}
                >
                    <Grid.Column width={8}>
                        <Fragment>
                            {
                                // fieldValues.photo.length === 0 &&
                                // <Dragger {...draggerProps} listType="picture-card">
                                //     <p className="ant-upload-drag-icon">
                                //         <Icon type="inbox" />
                                //     </p>
                                //     <p className="ant-upload-text">Click or drag file to attach here</p>
                                // </Dragger>

                                fieldValues.photo.length === 0 &&
                                <Upload {...draggerProps} >
                                    {uploadButton}
                                </Upload>
                            }

                            {
                                fieldValues.photo.length !== 0 &&
                                fieldValues.photo.map(file => (
                                    <Dimmer.Dimmable
                                        key={file.uid}
                                        as={Image}
                                        // fluid
                                        // circular
                                        size='small'
                                        bordered
                                        dimmed={isDimmed}
                                        dimmer={{
                                            active: isDimmed,
                                            content: (
                                                <div>
                                                    <Header as='h4' inverted>
                                                        {file.name}
                                                    </Header>
                                                    <SUIButton circular color='red' icon='trash alternate' onClick={handleRemoveFile} />
                                                </div>
                                            )
                                        }}
                                        onMouseEnter={() => setIsDimmed(true)}
                                        onMouseLeave={() => setIsDimmed(false)}
                                        src={file.url}
                                    />
                                ))

                            }
                        </Fragment>
                    </Grid.Column>
                </Grid>
            </Form.Item>
            <Form.Item
                help={errorText.first_name}
                validateStatus={fieldStatus.first_name}
                label="First Name"
            >
                <Input
                    size="large"
                    prefix={
                        <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="First Name"
                    value={fieldValues.first_name}
                    onChange={event => handleInputChange(event.target.value, 'first_name', handleErrorText, handleFieldStatus)}
                />
            </Form.Item>
            <Form.Item
                help={errorText.last_name}
                validateStatus={fieldStatus.last_name}
                label="Last Name"
            >
                <Input
                    size="large"
                    prefix={
                        <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Last Name"
                    value={fieldValues.last_name}
                    onChange={event => handleInputChange(event.target.value, 'last_name', handleErrorText, handleFieldStatus)}
                />
            </Form.Item>
            <Form.Item
                help={errorText.email}
                validateStatus={fieldStatus.email}
                label="Email"
            >
                <Input
                    size="large"
                    prefix={
                        <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Email Address"
                    value={fieldValues.email}
                    onChange={event => handleInputChange(event.target.value, 'email', handleErrorText, handleFieldStatus)}
                />
            </Form.Item>
            <Form.Item
                help={errorText.password}
                validateStatus={fieldStatus.password}
                label="Password"
            >
                <Input.Password
                    size="large"
                    prefix={
                        <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="Password"
                    value={fieldValues.password}
                    onChange={event => handleInputChange(event.target.value, 'password', handleErrorText, handleFieldStatus)}
                />
            </Form.Item>
            <Form.Item
                help={errorText.confirm_password}
                validateStatus={fieldStatus.confirm_password}
                label="Confirm Password"
            >
                <Input.Password
                    size="large"
                    prefix={
                        <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="Re-enter your Password"
                    value={fieldValues.confirm_password}
                    onChange={event => handleInputChange(event.target.value, 'confirm_password', handleErrorText, handleFieldStatus)}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    block
                    shape="round"
                    type="primary"
                    htmlType="submit"
                    size="large"
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
