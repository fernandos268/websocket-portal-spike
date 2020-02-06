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

import { withRouter } from 'react-router-dom'

export default withRouter(() => {
    const [fieldValues, handleInputChange] = useFieldValues(initialState)
    const { handleSubmit, handleCreateMessage } = eventHandlers()

    const isAuthenticated = false
    if (isAuthenticated) {
        return <Redirect to='/portal/message' />
    }

    return (
        <Grid
            verticalAlign="middle"
            padded
            centered
            style={{ height: '100vh' }}
        >
            <Grid.Column width={5}>
                <Segment basic padded placeholder>
                    <Header icon>
                        <Icon name='bug' />
                        Go home! your'e drunk.
                    </Header>
                </Segment>
            </Grid.Column>
        </Grid>
    )
})
