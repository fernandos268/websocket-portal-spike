import React, { useState, useEffect } from 'react'

import { useQuery, useLazyQuery } from '@apollo/react-hooks'

import {
    Card,
    Image,
    Icon,
    Segment,
    Button,
    Popup,
    Grid,
    Dimmer,
    Loader
} from 'semantic-ui-react'

import List from './List'
import Masonry from './Masonry'

import queries from '../../Graphql/Queries'

const {
    PHOTOS
} = queries

// const default_params = {
//     limit: 10,
//     page: 1
// }

export default props => {
    const { filterParams } = props

    // const [params, setParams] = useState(filterParams)
    const [isDimmed, setIsDimmed] = useState(false)

    const [loadPhotos, { called, loading, data }] = useLazyQuery(
        PHOTOS,
        { variables: { params: filterParams } }
    )

    useEffect(() => {
        loadPhotos()
    }, [])

    // const { data, error, loading } = useQuery(PHOTOS, {
    //     variables: {
    //         params: filterParams
    //     }
    // })

    const photos = (data && data.photos) ? data.photos : []
    // console.log('photos: ', photos);

    return (
        <Segment basic style={{ height: '76vh', overflowY: 'hidden' }} >
            <Dimmer active={loading}>
                <Loader>Loading</Loader>
            </Dimmer>
            <List list={photos} />
        </Segment>
    )
}


// return (
//     <Segment basic style={{ height: '76vh', overflowY: 'hidden' }} >
//         <List list={photos} setParams={setParams} />
//     </Segment>
// )
