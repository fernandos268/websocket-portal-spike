import React from 'react'
import ReactDOM from 'react-dom'

import { SubscriptionClient } from 'subscriptions-transport-ws';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import { concat, from, ApolloLink } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { setContext } from 'apollo-link-context'
import { CookiesProvider } from 'react-cookie'
import App from './App'

import { Provider } from 'react-redux'
import store from './Redux/store'

import socketIO from 'socket.io-client'
import socketIOStream from 'socket.io-stream'

import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'

import '../src/styles.scss'
import 'semantic-ui-css/semantic.min.css'
import 'antd/dist/antd.css'

// import Message from './components/Message'
// import Mailbox from './components/Mailbox'

// import AuthRoute from './components/Base/AuthRoute'
// import Signin from './components/Signin'
// import ProtectedRoutes from './components/Base/ProtectedRoutes'

import Routes from './components/Base/Routes'
import PageNotFound from './components/Base/PageNotFound'

import { renderRoutes } from 'react-router-config';
// import { Route } from 'react-router';

const httpLink = createHttpLink({
    uri: 'http://localhost:5050/graphql',
    credentials: 'include'
})

// const wsLink = new WebSocketLink({
//     uri: 'ws://localhost:5050/graphql',
//     credentials: 'include',
//     fetchOptions: { credentials: 'include' },
//     options: {
//         reconnect: true,
//         connectionParams: {
//             // auth: 'TOTO BENE --> Connection Params'
//         },
//         lazy: true
//     }
// })

const subscriptionMiddleware = {
    applyMiddleware: function (options, next) {
        console.log('subscriptionMiddleware', { options, next })
        options.auth = 'TOTO BENE --> Context in middleware'
        next()
    }
}

const subscriptionClient = new SubscriptionClient(
    'ws:localhost:5050/graphql',
    {
        reconnect: true
    }
)

const wsLink = new WebSocketLink(subscriptionClient)

wsLink.subscriptionClient.use([subscriptionMiddleware]);

const uploadLink = new createUploadLink({ uri: `http://localhost:5050/graphql` })

const link = from([
    // httpLink,
    wsLink,
    uploadLink
])

// const link = concat(
//     wsLink,
//     uploadLink
// )

const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    fetchOptions: {
        credentials: 'include'
    },
    credentials: 'include'
})

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    {renderRoutes(Routes)}
                    <Route render={() => <PageNotFound />} />
                </Switch>
            </BrowserRouter>
        </Provider>
    </ApolloProvider>
    , document.getElementById('root')
)


// ReactDOM.render(
//     <ApolloProvider client={apolloClient}>
//         <Mailbox />
//     </ApolloProvider>
//     , document.getElementById('root')
// )
