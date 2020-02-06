import React from 'react'

import {
    Card,
    Icon,
    Segment,
    Header,
    Button,
    Comment,
    Image
} from 'semantic-ui-react'


export default props => {
    const { user = {} } = props

    return (
        <Card.Header>
            <Segment clearing basic>
                <Header as='h2' floated='left' color='teal'>
                    <Icon name='rocket' />
                    <Header.Content>
                        Mail-U-Go
                    <Header.Subheader>
                            Manage your emails
                    </Header.Subheader>
                    </Header.Content>
                </Header>

                <Header as='h4' floated='right'>
                    <Image circular bordered src={`https://robohash.org/${user.user.id}`} /> {`${user.user.firstName} ${user.user.lastName}`}
                </Header>

            </Segment>
        </Card.Header>
    )
}
