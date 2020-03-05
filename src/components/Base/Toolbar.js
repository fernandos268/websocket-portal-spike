import React, { useState } from 'react'
import debounce from 'lodash/debounce'
import {
    Popup,
    Button,
    Input,
    Grid,
    Icon
} from 'semantic-ui-react'

import SearchBox from './SearchBox'

export default ({ setFilterParams, setIsFormOpen }) => {

    const [number, setNumber] = useState(10)

    const handleInputChange = (value) => {
        if (!isNaN(value) && value) {
            setNumber(parseInt(value))
        }
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={6}>
                    <SearchBox />
                </Grid.Column>
                <Grid.Column width={2}>
                    <Input
                        floated='right'
                        onChange={e => handleInputChange(e.target.value)}
                        action={
                            <Popup
                                position='top right'
                                content='Generate'
                                floated='right'
                                trigger={
                                    <Button
                                        icon='sync alternate'
                                        color='blue'
                                        inverted
                                        onClick={() => setFilterParams({ limit: number, page: 1 })}
                                    />
                                }
                            />
                        }
                        placeholder='Number of Items'
                        list='count'
                    />
                    <datalist id='count'>
                        <option value='10' />
                        <option value='50' />
                        <option value='100' />
                        <option value='500' />
                        <option value='1000' />
                    </datalist>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button icon labelPosition='left' color='green' onClick={() => setIsFormOpen(true)} >
                        <Icon name='plus' />
                        New
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
