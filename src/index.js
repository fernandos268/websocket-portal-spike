import React from 'react'
import ReactDOM from 'react-dom'

import { SubscriptionClient } from 'subscriptions-transport-ws';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloLink, split } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'

import { createUploadLink } from 'apollo-upload-client'

import App from './App'

import '../src/styles.scss'
import 'semantic-ui-css/semantic.min.css'
import 'antd/dist/antd.css'

// const httpLink = new HttpLink({
//     uri: 'http://localhost:5050/graphql',
// });

// const wsLink = new WebSocketLink({
//     uri: `ws://localhost:5050/graphql`,
//     options: {
//         reconnect: true,
//     },
// });

// const terminatingLink = split(
//     ({ query }) => {
//         const { kind, operation } = getMainDefinition(query);
//         return (
//             kind === 'OperationDefinition' && operation === 'subscription'
//         );
//     },
//     wsLink,
//     httpLink,
// );

// const link = ApolloLink.from([terminatingLink]);

// const cache = new InMemoryCache();

// const apolloClient = new ApolloClient({
//     link,
//     cache,
// });

// SEND CLIENT REQUESTS OVER WEBSOCKET PROTOCOL
const WSClient = new SubscriptionClient(`ws://localhost:5050/graphql`, {
    reconnect: true,
    connectionParams: {
        // Connection parameters to pass some validations 
        // on server side during first handshake
    }
});

const apolloClient = new ApolloClient({
    link: WSClient,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <App />
    </ApolloProvider>
    , document.getElementById('root'))
