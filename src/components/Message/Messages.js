import React from 'react'
import reverse from 'lodash/reverse'
import { Card, Feed, Icon, List, Label, Item, Image, Placeholder, Comment } from 'semantic-ui-react'

const ListMapper = (list) => {
    return list.map((item, index) => (
        <Comment key={`${item.socket_id}-${index}`}>
            <Comment.Avatar src={`https://robohash.org/${item.sender}`} />
            <Comment.Content>
                <Comment.Author>{item.sender}</Comment.Author>
                <Comment.Text>
                    {item.body}
                </Comment.Text>
                <Comment.Actions>
                    <Comment.Action>
                        <Icon name='eye' />
                        View
                    </Comment.Action>
                    <Comment.Action>
                        <Icon name='trash alternate' />
                        Delete
                    </Comment.Action>
                </Comment.Actions>
            </Comment.Content>
        </Comment>
    ))
}

export default ({ messageList = [] }) => {
    console.log('messageList: ', messageList);
    return (
        <Comment.Group style={{ height: '79vh', maxHeight: '79vh', overflowY: 'auto' }}>
            {ListMapper(reverse([...messageList]))}
        </Comment.Group>
    )
    // return (
    //     <Item.Group style={{ height: '79vh', maxHeight: '79vh', overflowY: 'auto' }}>
    //         {ListMapper(reverse([...messageList]))}
    //     </Item.Group>
    // )
}
