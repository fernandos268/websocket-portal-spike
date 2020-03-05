import React from 'react'
import debounce from 'lodash/debounce'
import {
    Card,
    Icon,
    Segment,
    Image,
    Header,
    Search,
    Grid
} from 'semantic-ui-react'

export default () => {

    return (
        <Search
            fluid
            input={{ fluid: true, placeholder: 'Search' }}
            loading={false}
            onResultSelect={() => { }}
            onSearchChange={debounce(() => { }, 500, {
                leading: true,
            })}
        />
    )
}
