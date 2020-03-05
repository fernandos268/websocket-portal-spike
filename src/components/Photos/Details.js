import React from 'react'
import { Button, Dimmer, Header, Image, Popup, Modal } from 'semantic-ui-react'

export default props => {
    const {
        is_closed,
        isModalOpen
    } = props
    return (
        <Modal size='fullscreen' centered open={isModalOpen} onClose={() => { }}>
            <Modal.Header>Delete Your Account</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete your account</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative>No</Button>
                <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content='Yes'
                />
            </Modal.Actions>
        </Modal>
    )
}
