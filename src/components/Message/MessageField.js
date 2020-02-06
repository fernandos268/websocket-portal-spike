import React from 'react'
import {
    Form,
    Input,
    TextArea,
    Button,
    Card,
    Icon
} from 'semantic-ui-react'

export default (props) => {
    const {
        isLoading,
        fieldValues,
        handleInputChange,
        handleSend,
    } = props

    return (
        <Form size='small' style={{ width: '100%', height: '20%', maxHeight: '20%' }} onSubmit={handleSend}>
            <Form.Field>
                <label>Recipient:</label>
                <Input
                    icon='user circle'
                    iconPosition='left'
                    value={fieldValues.user}
                    onChange={e => handleInputChange(e.target.value, 'recipient')}
                    placeholder='Recipient email: <recipient@email.com>'
                />
            </Form.Field>
            <Form.Field>
                <label>Subject:</label>
                <Input
                    icon='user circle'
                    iconPosition='left'
                    value={fieldValues.user}
                    onChange={e => handleInputChange(e.target.value, 'subject')}
                    placeholder='Enter name of subject here...'
                />
            </Form.Field>
            <Form.Field>
                <label>Body: </label>
                <TextArea
                    rows={8}
                    placeholder='Enter body of the message here ...'
                    value={fieldValues.body}
                    onChange={e => handleInputChange(e.target.value, 'body')}
                />
            </Form.Field>
            <Form.Field>
                <Button color='blue' type='submit' disabled={isLoading}>
                    <Icon name='paper plane' /> Send
                </Button>
            </Form.Field>
        </Form>
    )
}
