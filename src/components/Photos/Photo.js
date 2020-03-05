import React, { PureComponent, useState, useEffect, Fragment, useRef } from 'react'
import { Button, Card, Image, Header, Popup, Segment, Dimmer, Icon, Placeholder, Loader } from 'semantic-ui-react'
import { Popover } from 'antd'
import AutoSizer from 'react-virtualized-auto-sizer'
import ContainerDimensions from 'react-container-dimensions'
import { LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component'

import Details from './Details'

// const src = 'src/Assets/image-placeholder.png'


const generateSrc = id => `https://ljpv2-upload.dnamicro.net/file?entity=photo&id=${id}&force=true`

const truncateString = (str, num) => {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...'
}

export default trackWindowScroll(props => {
    const { data, width, height } = props
    const {
        id,
        is_closed,
        visit_type,
        created_date,
        inconsistency,
        project: { name },
    } = data

    const [isDimmed, setIsDimmed] = useState(false)
    const [isModalOpen, toggleModal] = useState(false)

    const closeModal = (isOpen) => toggleModal(isOpen)

    return (
        <Dimmer.Dimmable
            as={Image}
            src={generateSrc(id)}
            dimmed={isDimmed}
            dimmer={{
                active: isDimmed,
                content: (
                    <div>
                        <Header as='h4' inverted>
                            {'Sample Image'}
                        </Header>
                        <Popup
                            position='top right'
                            content='Delete'
                            floated='right'
                            trigger={
                                <Button
                                    icon='trash alternate'
                                    color='red'
                                    inverted
                                    circular
                                    onClick={() => { }}
                                />
                            }
                        />
                        &nbsp;&nbsp;
                        <Popup
                            position='top right'
                            content='Edit'
                            floated='right'
                            trigger={
                                <Button
                                    icon='pencil alternate'
                                    color='blue'
                                    inverted
                                    circular
                                    onClick={() => { }}
                                />
                            }
                        />
                        &nbsp;&nbsp;
                        <Popup
                            position='top right'
                            content='Expand'
                            floated='right'
                            trigger={
                                <Fragment>
                                    <Button
                                        icon='external alternate'
                                        color='green'
                                        inverted
                                        circular
                                        onClick={() => closeModal(true)}
                                    />
                                    <Details isModalOpen={isModalOpen} />
                                </Fragment>
                            }
                        />
                    </div>
                )
            }}
            onMouseEnter={() => setIsDimmed(true)}
            onMouseLeave={() => setIsDimmed(false)}
        />
    )
})
