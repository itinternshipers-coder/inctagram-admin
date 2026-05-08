import { gql } from '@apollo/client'

export const POST_CREATED_SUBSCRIPTION = gql`
  subscription PostCreated {
    postCreated {
      id
      username
      description
      createdAt
      avatarUrl
      photos {
        id
        url
        order
      }
    }
  }
`
