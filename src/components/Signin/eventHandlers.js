import ConstructQuery from '../Graphql/Base/Queries'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks';


const SIGNIN = gql`
    mutation signin($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id,
            email,
            firstName,
            lastName
        }
    }
`
const VIEW_PROFILE = gql`
    query {
        me{
            id
            email
            firstName
            lastName
        }
    }
`

const CREATE_MESSAGE_FRAGMENT = gql`
    fragment MesssageFields on Message {
        id
        text
        isFavorite
    }
`

const CREATE_MESSAGE = gql`
    mutation createMessage($input: CreateMessageInput!) {
        createMessage(input: $input) {
            ...MesssageFields
        }
    }
    ${CREATE_MESSAGE_FRAGMENT}
`


export default () => {
    const [signin, { data, loading, error }] = useMutation(SIGNIN)

    const [createMessage, { data: cm_data, loading: cm_loading, error: cm_error }] = useMutation(CREATE_MESSAGE)
    console.log('signin', { data, loading, error })
    console.log('CREATE MESSAGE', { cm_data, cm_loading, cm_error })

    const handleSubmit = (event, fieldValues) => {
        event.preventDefault()
        signin({
            variables: {
                ...fieldValues
            }
        })

    }

    const handleCreateMessage = () => {
        const text = 'Cheers to da wans dawida'
        createMessage({
            variables: {
                input: {
                    text
                }
            }
        })
    }

    return {
        handleSubmit,
        handleCreateMessage
    }
}
