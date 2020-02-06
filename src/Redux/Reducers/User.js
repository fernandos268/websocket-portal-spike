const initialState = {
    data: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET_USER':
            return { ...state, data: { ...payload } }
        default:
            return state
    }
}
