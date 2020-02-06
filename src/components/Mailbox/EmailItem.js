import React, { useState } from 'react'
import { Accordion, Icon, Image, Item } from 'semantic-ui-react'

export default props => {
    const {
        id,
        sender,
        recipient,
        subject,
        body,
        sent_date
    } = props

    return (
        <Accordion
            defaultActiveIndex={[0, 2]}
            exclusive={false}
            fluid
            key={id}
        >
            <Accordion.Title>
                <Icon name='dropdown' />
                {subject}
            </Accordion.Title>
            <Accordion.Content>
                <Item>
                    <Item.Content>
                        <Item.Header>{subject}</Item.Header>
                        <Item.Meta>{`From: ${sender}`}</Item.Meta>
                        <Item.Meta>{`To: ${recipient}`}</Item.Meta>
                        <Item.Description>{body}</Item.Description>
                        <Item.Extra>{sent_date}</Item.Extra>
                    </Item.Content>
                </Item>
            </Accordion.Content>
        </Accordion>
    )
}
