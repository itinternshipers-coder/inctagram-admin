import * as Types from '../../../shared/graphql/__generated__/graphql'

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type GetUsersQueryVariables = Types.Exact<{
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  search?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.Scalars['String']['input']>
  filterBanned?: Types.InputMaybe<Types.Scalars['String']['input']>
}>

export type GetUsersQuery = {
  __typename?: 'Query'
  users: {
    __typename?: 'UsersListOutput'
    page: number
    pageSize: number
    totalCount: number
    totalPages: number
    items: Array<{
      __typename?: 'UserOutput'
      id: string
      username: string
      profileLink: string
      email: string
      isBanned: boolean
      banReason?: string | null
      bannedAt?: string | null
      dataAdded: string
      avatarUrl?: string | null
    }>
  }
}

export const GetUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUsers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'search' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sortBy' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sortDirection' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filterBanned' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'page' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'pageSize' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'search' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'search' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'sortBy' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'sortBy' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'sortDirection' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'sortDirection' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'filterBanned' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'filterBanned' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'profileLink' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isBanned' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'banReason' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'bannedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dataAdded' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'avatarUrl' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pageSize' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>
