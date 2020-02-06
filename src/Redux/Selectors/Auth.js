import { createSelector } from 'reselect'

export const AuthSelector = createSelector(
    state => state.Auth,
    (Auth) => {
        return {
            user: Auth.user,
            token: Auth.token
        }
    }
)
