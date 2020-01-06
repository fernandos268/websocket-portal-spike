import React from 'react'

import {
    Grid,
    Segment
} from 'semantic-ui-react'

import {
    Alert,
    Card,
    message,
    Row,
    Spin
} from 'antd'

import Header from './Header'
import Form from './Form'

import useFieldValues from '../Hooks/useFieldValues'
import eventHandlers from './eventHandlers'

const initialState = {
    email: '',
    password: ''
}

export default () => {
    const [fieldValues, handleInputChange] = useFieldValues(initialState)
    const { handleSubmit, handleCreateMessage } = eventHandlers()

    return (
        <Grid
            verticalAlign="middle"
            padded
            centered
            style={{ height: '100vh' }}
        >
            <Grid.Column width={5}>
                <Segment basic padded>
                    <Card
                        title={<Header />}
                        style={{ boxShadow: '0 8px 32px #aaa' }}
                        actions={[
                            <Row type="flex" justify="center">
                                <a
                                    style={{ size: '24' }}
                                    name="signin"
                                    onClick={() => { }}
                                >
                                    Sign up here
                                </a>
                            </Row>,
                            <Row type="flex" justify="center">
                                <a
                                    style={{ size: '24' }}
                                    name="signin"
                                    onClick={handleCreateMessage}
                                >
                                    Forgot Password?
                            </a>
                            </Row>
                        ]}
                    >
                        <Spin tip="Signing in..." spinning={false}>
                            <Form
                                fieldValues={fieldValues}
                                handleInputChange={handleInputChange}
                                handleSubmit={handleSubmit}
                            />
                        </Spin>
                    </Card>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}
