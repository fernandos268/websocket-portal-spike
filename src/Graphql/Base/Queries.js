import gql from 'graphql-tag'
import { operationName } from '@apollo/react-common'

export default params => {
    const {
        Entity,
        fields = []
    } = params

    // JOIN FIELDS ARRAY IN TO MULTILINE STRING
    const return_fields = fields.join('\n')

    // FRAGMENT TO DYNAMICALLY RETURN REQUESTED FIELDS
    const FRAGMENT = gql`
        fragment Fields on ${Entity} {
            ${return_fields}
        }
    `

    // GRID QUERY WITHOUT PARAMS
    const GRID = gql`
        query ${Entity} {
            ${Entity} {
                ...Fields
            }
        }
        ${FRAGMENT}
    `

    // QUERY SINGLE ITEM USING ID
    const NODE_DETAILS = gql`
        query ${Entity}($id: ID!) {
            ${Entity}(id: $id) {
                ...Fields
            }
        }
        ${FRAGMENT}
    `

    return {
        GRID,
        NODE_DETAILS
    }
}
