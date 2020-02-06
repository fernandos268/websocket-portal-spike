const initialState = {
    token: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET_AUTH_TOKEN':
            return { ...state, payload }
        default:
            return state
    }
}
