import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
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
import { withRouter } from 'react-router-dom'



import { connect } from 'react-redux'
import Selectors from '../../Redux/Selectors'

import Header from './Header'
import Form from './Form'

import useFieldValues from '../Hooks/useFieldValues'
import eventHandlers from './eventHandlers'

const { UserSelector } = Selectors

const initialState = {
    email: '',
    password: ''
}

const Signin = withRouter(props => {
    const { history, user } = props
    const [fieldValues, handleInputChange] = useFieldValues(initialState)

    const {
        dispatch
    } = props

    const {
        handleSubmit,
        handleRedirectToSignup,
        handleSetCookie,
        handleGetCookie
    } = eventHandlers({ dispatch })

    useEffect(() => {
        const cookie = handleGetCookie()
        if (user && user.user) {
            handleSetCookie(history)
            // return history.replace('/portal/message')
        }
    }, [user])


    // useEffect(() => {
    //     if (handleGetCookie()) {
    //         history.replace('/portal/message')
    //         console.log('handleGetCookie()', user, handleGetCookie())
    //     }
    // }, [])


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
                                    onClick={() => handleRedirectToSignup(props.history)}
                                >
                                    Sign up here
                                </a>
                            </Row>,
                            <Row type="flex" justify="center">
                                <a
                                    style={{ size: '24' }}
                                    name="signin"
                                    onClick={handleSubmit}
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
})

export default connect(UserSelector)(Signin)
