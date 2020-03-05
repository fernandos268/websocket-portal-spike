import React from 'react'

import {
    Icon,
    Header,
    Grid
} from 'semantic-ui-react'


export default () => {
    return (
        <Header as='h1' color='blue'>
            <Icon name='image' />
            <Header.Content>
                LJP - Photos
            <Header.Subheader>
                    Caching Demo Spike
            </Header.Subheader>
            </Header.Content>
        </Header>
    )
}
