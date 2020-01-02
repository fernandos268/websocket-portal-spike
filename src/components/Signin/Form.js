import React from 'react'

import {
    Form,
    Icon,
    Input,
    Button
} from 'antd'

export default props => {

    const {
        fieldValues,
        handleInputChange,
        handleSubmit
    } = props

    return (
        <Form onSubmit={event => handleSubmit(event, fieldValues)}>
            <Form.Item>
                <Input
                    size="large"
                    prefix={
                        <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Email Address"
                    name="email"
                    value={fieldValues.email}
                    onChange={event => handleInputChange(event.target.value, 'email')}
                />
            </Form.Item>
            <Form.Item>
                <Input.Password
                    size="large"
                    prefix={
                        <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={fieldValues.password}
                    onChange={event => handleInputChange(event.target.value, 'password')}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    block
                    shape="round"
                    type="primary"
                    htmlType="submit"
                    size="large"
                >
                    Signin
                </Button>
            </Form.Item>
        </Form>
    )
}
