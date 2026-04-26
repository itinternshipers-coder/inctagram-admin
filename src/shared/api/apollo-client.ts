import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

const httpLink = createHttpLink({
  uri: '/api/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: 'wss://gateway.traineegramm.ru/api/v1/graphql',
          connectionParams: () => {
            const token = localStorage.getItem('adminToken')

            return {
              authorization: token ? `Bearer ${token}` : '',
            }
          },
        })
      )
    : null

const link = wsLink
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query)

        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
      },
      wsLink,
      authLink.concat(httpLink)
    )
  : authLink.concat(httpLink)

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
