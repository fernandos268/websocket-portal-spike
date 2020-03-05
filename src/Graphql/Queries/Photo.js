import gql from 'graphql-tag'

export default {
    PHOTOS: gql`
        query photos($params: GetListInput!){
            photos(params: $params){
                id
                visit_type
                file_path
                created_date
                is_closed
                thumbnail_path
                inconsistency
                project {
                    name
                }
            }
        }
    `
}
