import React from 'react'
import { Header, Icon } from 'semantic-ui-react'
import { Row } from 'antd'

export default () => {
    return (
        <Row type="flex" justify="center">
            <Header as="h4" icon textAlign="center" color="grey">
                <Icon name="user" circular />
                <Header.Content>Sign in</Header.Content>
            </Header>
        </Row>
    )
}
