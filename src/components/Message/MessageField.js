import React from 'react'
import {
    Form,
    Input,
    TextArea,
    Button,
    Card,
    Icon
} from 'semantic-ui-react'

const MessageField = (props) => {
    const {
        fieldValues,
        handleInputChange,
        handleSend
    } = props

    return (
        <Form size='small' style={{ width: '100%', height: '20%', maxHeight: '20%' }} onSubmit={handleSend}>
            <Form.Group widths='equal'>
                <Form.Field>
                    <Input
                        icon='user circle'
                        iconPosition='left'
                        value={fieldValues.user}
                        onChange={e => handleInputChange(e.target.value, 'user')}
                        placeholder='Enter your name here.'
                    />
                </Form.Field>
            </Form.Group>
            <Form.Field>
                <Input type='text' placeholder='Enter message here...' action>
                    <input
                        value={fieldValues.message}
                        onChange={e => handleInputChange(e.target.value, 'message')}
                    />
                    <Button color='blue' type='submit' >
                        <Icon name='paper plane' /> Send
                     </Button>
                </Input>
            </Form.Field>
        </Form>
    )
}

export default MessageField
