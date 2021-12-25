import React from 'react'
import {
  Apollo,
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  createHttpLink,
  split,
  defaultDataIdFromObject,
  fromPromise,
} from '@apollo/client'
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink } from '@apollo/client/core';


let httpLink = createUploadLink
({
   uri: 'http://localhost:3030/graphql',
})

const authLink = setContext((_, { headers }) => {
  // // get the authentication token from local storage if it exist
  const token = JSON.parse(localStorage.getItem('token')) || '';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})


httpLink = authLink.concat(httpLink)

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:8000/graphql`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')) || ''}`,
//     },
//   },
// })

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query)
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     )
//   },
//   wsLink,
//   httpLink
// )

const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition'
      )
    },
    httpLink,
  )

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

export default function ApolloProvider(props) {
  return <Provider client={client} {...props} />
}