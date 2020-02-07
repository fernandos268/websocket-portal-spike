// import ConstructQuery from '../../Graphql/Base/Queries'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks';


export default params => {
    const {
        history
    } = params


    const handleSubmit = (event, fieldValues) => {
        event.preventDefault()
    }


    const handleInputChange = () => {

    }

    const handleCancel = (history) => {
        history.replace('/signin')
    }

    return {
        handleCancel,
        handleSubmit,
        handleInputChange
    }
}
