import Types from '../Types'

const {
    REQUESTED,
    SET_AUTH_TOKEN
} = Types

export default{
    SetAuthToken(data) {
        console.log('ACTION --> ', data)
        return {
            type: `${SET_AUTH_TOKEN}${REQUESTED}`,
            payload: data
        }
    }
}
