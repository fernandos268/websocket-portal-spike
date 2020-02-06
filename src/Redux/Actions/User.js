import Types from '../Types'

const {
    REQUESTED,
    SET_AUTH_TOKEN,
    SET_USER
} = Types

export default{
    SetUser(data) {
        return {
            type: SET_USER,
            payload: data
        }
    }
}
