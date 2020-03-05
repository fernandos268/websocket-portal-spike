import React from 'react'
import { Button, Dimmer, Icon, Header, Image, Popup, Modal, Form, Input, Grid } from 'semantic-ui-react'

export default props => {
    const {
        isFormOpen,
        setIsFormOpen
    } = props

    return (
        <Modal
            size='mini'
            centered
            open={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            closeIcon
        >
            <Modal.Header>New Photo</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Type</label>
                        <input placeholder='Type' />
                    </Form.Field>
                    <Form.Field>
                        <label>Cient ID</label>
                        <input placeholder='Cient ID' />
                    </Form.Field>
                    <Form.Field>
                        <label>Project ID</label>
                        <input placeholder='Project ID' />
                    </Form.Field>
                    <Form.Field>
                        <label>User ID</label>
                        <input placeholder='User ID' />
                    </Form.Field>
                    <Form.Field>
                        <label>Session ID</label>
                        <input placeholder='Session ID' />
                    </Form.Field>
                    <Form.Field>
                        <label>Visit ID</label>
                        <input placeholder='Visit ID' />
                    </Form.Field>
                    <Form.Field>
                        <label>Group ID</label>
                        <input placeholder='Group ID' />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button negative basic onClick={() => setIsFormOpen(false)}>Cancel</Button>
                <Button
                    positive
                    basic
                    icon='checkmark'
                    labelPosition='right'
                    content='Submit'
                />
            </Modal.Actions>
        </Modal>
    )
}
