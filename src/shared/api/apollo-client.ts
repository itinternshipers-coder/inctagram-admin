import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

const httpLink = createHttpLink({
  uri: '/api/graphql',
})

function createApolloLink() {
  if (typeof window === 'undefined') {
    return httpLink
  }

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${protocol}//${window.location.host}/api/graphql`,
    })
  )

  return split(
    ({ query }) => {
      const definition = getMainDefinition(query)

      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    httpLink
  )
}

export const apolloClient = new ApolloClient({
  link: createApolloLink(),
  cache: new InMemoryCache(),
})
