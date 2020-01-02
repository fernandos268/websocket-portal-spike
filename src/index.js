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

import App from './App'
import Signin from './components/Signin' 

import socketIO from 'socket.io-client'
import socketIOStream from 'socket.io-stream'

import '../src/styles.scss'
import 'semantic-ui-css/semantic.min.css'
import 'antd/dist/antd.css'

const httpLink = createHttpLink({ uri: 'http://localhost:5050/graphql' })

const wsLink = new WebSocketLink({
    uri: `ws://localhost:5050/graphql`,
    options: {
        reconnect: true,
        connectionParams: {
            auth: 'TOTO BENE --> Connection Params'
        },
        // lazy: true
    }
})

const subscriptionMiddleware = {
    applyMiddleware: function (options, next) {
        options.auth = 'TOTO BENE --> Context in middleware'
        next()
    }
}

wsLink.subscriptionClient.use([subscriptionMiddleware]);

const uploadLink = new createUploadLink({ uri: `http://localhost:5050/graphql` })

const link = from([
    wsLink,
    uploadLink
])

// const link = concat(
//     wsLink,
//     uploadLink
// )

const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <Signin />
    </ApolloProvider>
    , document.getElementById('root'))
