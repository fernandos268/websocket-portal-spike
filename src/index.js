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
import { withClientState } from 'apollo-link-state'
import { setContext } from 'apollo-link-context'
import { CookiesProvider } from 'react-cookie'
import App from './App'

import { Provider } from 'react-redux'

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

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
    // credentials: 'include'
})

const subscriptionMiddleware = {
    applyMiddleware: function (options, next) {
        console.log('subscriptionMiddleware', { options, next })
        options.auth = 'TOTO BENE --> Context in middleware'
        next()
    }
}

const subscriptionClient = new SubscriptionClient(
    'ws:localhost:5000/graphql',
    {
        reconnect: true
    }
)

const wsLink = new WebSocketLink(subscriptionClient)

wsLink.subscriptionClient.use([subscriptionMiddleware]);

const uploadLink = new createUploadLink({ uri: `http://localhost:5000/graphql` })

// const stateLink = withClientState({
//     cache,
//     resolvers: {
//         Mutation: {
//             updateNetworkStatus: (_, { isConnected }, { cache }) => {
//                 const data = {
//                     networkStatus: {
//                         __typename: 'NetworkStatus',
//                         isConnected
//                     },
//                 };
//                 cache.writeData({ data });
//                 return null;
//             },
//         },
//     },
//     defaults: {
//         networkStatus: {
//             __typename: 'NetworkStatus',
//             isConnected: true,
//         },
//     },
// })

const link = from([
    httpLink,
    // stateLink,
    // wsLink,
    uploadLink
])

const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    // fetchOptions: {
    //     credentials: 'include'
    // },
    // credentials: 'include'
})

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <App />
    </ApolloProvider>
    , document.getElementById('root')
)
