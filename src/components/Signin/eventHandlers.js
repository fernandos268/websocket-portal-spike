// import ConstructQuery from '../../Graphql/Base/Queries'
import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks';

import Actions from '../../Redux/Actions'
const {
    SetAuthToken,
    SetUser
} = Actions


const SIGNIN = gql`
    mutation signin($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            isSuccess
            token
            user {
                id
                email
                firstName
                lastName
            }
        }
    }
`

export default props => {
    const { dispatch } = props

    const [signin, { data, loading, error }] = useMutation(SIGNIN)

    useEffect(() => {
        const { isSuccess, token, user } = data ? data.signin ? data.signin : {} : {}

        if (isSuccess) {
            // dispatch(SetAuthToken({ token, user }))
            dispatch(SetUser({ user }))
        }
    }, [data])


    const handleSubmit = (event, fieldValues) => {
        event.preventDefault()
        signin({
            variables: {
                ...fieldValues
            }
        })

    }

    const handleRedirectToSignup = (history) => {
        history.push('/signup')
    }

    const handleSetCookie = async (history) => {
        const { token } = data ? data.signin ? data.signin : {} : {}
        await Cookies.set('emp-pres', token, { expires: 7 })
        history.replace('/portal/message')
    }

    const handleGetCookie = () => {
        const cookie =  Cookies.get('emp-pres')
        return cookie
    }

    return {
        handleSubmit,
        handleRedirectToSignup,
        handleSetCookie,
        handleGetCookie
    }
}
