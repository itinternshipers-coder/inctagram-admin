import 'server-only'

import { GRAPHQL_API_URL } from '@/shared/auth/constants'

type GraphQLError = {
  message: string
}

type GraphQLResponse<TData> = {
  data?: TData
  errors?: GraphQLError[]
}

type ExecuteGraphQLParams<TVariables> = {
  query: string
  variables?: TVariables
  token?: string | null
}

export async function executeGraphQL<TData, TVariables = Record<string, unknown>>({
  query,
  variables,
  token,
}: ExecuteGraphQLParams<TVariables>) {
  const response = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: 'no-store',
  })

  const payload = (await response.json()) as GraphQLResponse<TData>

  return { response, payload }
}
