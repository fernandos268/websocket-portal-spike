import React from 'react'

import { withRouter } from 'react-router-dom'

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

import { Redirect } from 'react-router'

import Header from './Header'
import Form from './Form'

import useFieldValues from '../Hooks/useFieldValues'
import eventHandlers from './eventHandlers'

const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
}

const initialErrorText = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
}


export default withRouter(props => {
    const {
        history
    } = props
    console.log('SIGNUP -> props', eventHandlers({ history }))

    const {
        handleCancel
    } = eventHandlers()

    // const isAuthenticated = false
    // if (isAuthenticated) {
    //     return <Redirect to='/portal/message' />
    // }

    return (
        <Grid
            verticalAlign="middle"
            padded
            centered
            style={{ height: '100%' }}
        >
            <Grid.Column width={6}>
                <Segment basic padded>
                    <Card
                        title={<Header />}
                        style={{ boxShadow: '0 8px 32px #aaa' }}
                        actions={[
                            <Row type="flex" justify="center">
                                <a
                                    style={{ size: '24' }}
                                    name="signin"
                                    onClick={() => handleCancel(history)}
                                >
                                    Cancel
                                </a>
                            </Row>
                        ]}
                    >
                        <Spin tip="Signing in..." spinning={false}>
                            <Form />
                        </Spin>
                    </Card>
                </Segment>
            </Grid.Column>
        </Grid>
    )
})
