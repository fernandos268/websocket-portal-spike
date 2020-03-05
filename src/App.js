import React, { useState } from 'react'

import { Grid, Cell } from 'react-md'
import {
    Segment,
    Input,
    Popup,
    Button,
    Grid as SUI_Grid
} from 'semantic-ui-react'


import Photos from './components/Photos'
import AppHeader from './components/Base/AppHeader'
import Toolbar from './components/Base/Toolbar'
import Form from './components/Photos/Form'

const default_params = {
    limit: 10,
    page: 1
}

const App = () => {

    const [filterParams, setFilterParams] = useState(default_params)
    const [isFormOpen, setIsFormOpen] = useState(false)

    return (
        <Grid
            className='md-paper'
            style={{ alignItems: "center", display: "flex", justifyContent: "center", height: '100vh' }}
        >
            <Cell align='top' size={12} style={{ height: '100vh' }} >
                <Segment.Group raised style={{ height: '95vh' }}>
                    <Segment>
                        <AppHeader />
                    </Segment>
                    <Segment>
                        <Segment basic>
                            <Toolbar setFilterParams={setFilterParams} setIsFormOpen={setIsFormOpen} />
                        </Segment>
                        <Segment basic style={{ height: '75vh', overflow: 'hidden' }}>
                            <Photos filterParams={filterParams} />
                        </Segment>
                    </Segment>
                </Segment.Group>
                <Form isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen}/>
            </Cell>
        </Grid>
    )
}

export default App
