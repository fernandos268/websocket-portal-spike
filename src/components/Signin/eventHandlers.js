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


export default () => {
    const [signin, { data, loading, error }] = useMutation(SIGNIN)
    const [viewProfile, { data : vp_data, loading : vp_loading,error: error_error }] = useMutation(VIEW_PROFILE)
    console.log('viewProfile', { vp_data, vp_loading, error_error })

    const handleSubmit = (event, fieldValues) => {
        event.preventDefault()
        // ConstructQuery({
        //     query_name: 'allMessages',
        //     fields: ['id','text','isFavorite']
        // })

        console.log('handleSubmit', fieldValues)
        signin({
            variables: {
                ...fieldValues
            }
        })

    }

    const handleVewProfile = () => {
        viewProfile()
    }

    return {
        handleSubmit,
        handleVewProfile
    }
}
