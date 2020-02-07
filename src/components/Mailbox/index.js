import React, { useEffect } from 'react'

import { connect } from 'react-redux'

import {
    Grid as MD_Grid,
    Cell
} from 'react-md'

import {
    Card,
    Grid,
} from 'semantic-ui-react'

import Header from './Header'

import Inbox from './Inbox'
import SentBox from './SentBox'
import MessageBox from '../Message/MessageBox'

import useHooks from './useHooks'

import Selectors from '../../Redux/Selectors'

const { UserSelector } = Selectors

const Mailbox = props => {
    const { user } = props

    const {
        newMail,
        deletedMail
    } = useHooks(user)

    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
    console.log({ newMail })

    return (
        <MD_Grid
            className='md-paper'
            style={{ alignItems: "center", display: "flex", justifyContent: "center", height: '100vh' }}
        >
            <Cell align='top' size={12} style={{ height: '55vh' }} >
                <Card fluid raised>
                    <Card.Content>
                        <Header user={user} color='teal' />
                    </Card.Content>
                    <Card.Content>
                        <Grid columns={2}>
                            <Grid.Row>
                                <Grid.Column>
                                    <MessageBox newMail={newMail} />
                                </Grid.Column>
                                <Grid.Column>
                                    <Grid columns={1}>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Inbox
                                                    newMail={newMail}
                                                    deletedMail={deletedMail}
                                                    user={user}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <SentBox
                                                    newMail={newMail}
                                                    deletedMail={deletedMail}
                                                    user={user}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card>
            </Cell>
        </MD_Grid>
    )
}

export default connect(UserSelector)(Mailbox)
