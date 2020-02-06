// import AuthRoute from '../Base/AuthRoute'
import ProtectedRoutes from '../Base/ProtectedRoutes'
// import Message from '../Message'
import Mailbox from '../Mailbox'

import Signin from '../Signin'
import Signup from '../Signup'

const protected_routes = [
    {
        path: '/',
        exact: true,
        component: Mailbox
    },
    {
        path: '/portal/message',
        exact: true,
        component: Mailbox
    }
]

export default [
    {
        path: '/signin',
        component: Signin,
        exact: true
    },
    {
        path: '/signup',
        component: Signup,
        exact: true
    },
    {
        component: ProtectedRoutes,
        routes: protected_routes,
        // exact: true
    }
]
