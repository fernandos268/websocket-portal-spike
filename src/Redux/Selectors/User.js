import { createSelector } from 'reselect'

export default createSelector(
    state => state.User,
    (User) => {
        return {
            user: User.data,
        }
    }
)
