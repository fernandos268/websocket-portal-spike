import React from 'react'
import reverse from 'lodash/reverse'
import { Grid, Cell, Card as MDCard } from 'react-md'
import { Card, Icon, List, Label, Item, Image, Placeholder } from 'semantic-ui-react'

const ListMapper = (list) => {
    return list.map((item, index) => (
        <Item key={`${item.socket_id}-${index}`}>
            <Item.Content>
                <Item.Header>
                    <Image src={`https://robohash.org/${item.socket_id}`} avatar bordered />
                    <span>{item.user}</span>
                </Item.Header>
                <Item.Description>
                    <Label circular color='blue' style={{ marginLeft: '40px' }}>
                        {item.message}
                    </Label>
                </Item.Description>
                {
                    item.files.length > 0 &&
                    item.files.map(file => (
                        <Item.Extra key={file.file_uid}>
                            <Image src={file.file_url} size='small' bordered/>
                        </Item.Extra>
                    ))
                }
            </Item.Content>
        </Item>
    ))
}

export default ({ messageList = [] }) => {
    return (
        <Item.Group style={{ height: '79vh', maxHeight: '79vh', overflowY: 'auto' }}>
            {ListMapper(reverse([...messageList]))}
        </Item.Group>
    )
}