import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query GetUsers($input: UsersListInput) {
    users(input: $input) {
      items {
        id
        username
        profileLink
        email
        isBanned
        banReason
        bannedAt
        dataAdded
        avatarUrl
      }
      page
      pageSize
      totalCount
      totalPages
    }
  }
`

export const GET_USER = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      username
      profileLink
      email
      isBanned
      banReason
      bannedAt
      createdAt
      avatarUrl
      avatarSmallUrl
    }
  }
`

export const GET_USER_PAYMENTS = gql`
  query GetUserPayments($input: UserPaymentsInput!) {
    userPayments(input: $input) {
      items {
        id
        amount
        date
        paymentMethod
        subscription
        userId
        username
        avatarUrl
      }
      page
      pageSize
      totalCount
      totalPages
    }
  }
`

export const GET_USER_FOLLOWERS = gql`
  query GetUserFollowers($input: UserFollowersInput!) {
    userFollowers(input: $input) {
      items {
        id
        username
        createdAt
        avatarUrl
      }
      page
      pageSize
      totalCount
      totalPages
    }
  }
`

export const GET_USER_FOLLOWING = gql`
  query GetUserFollowing($input: UserFollowersInput!) {
    userFollowing(input: $input) {
      items {
        id
        username
        createdAt
        avatarUrl
      }
      page
      pageSize
      totalCount
      totalPages
    }
  }
`

export const GET_POSTS = gql`
  query GetPosts($input: PostsListInput) {
    posts(input: $input) {
      items {
        id
        username
        photos {
          id
          url
          order
        }
      }
      hasMore
      nextCursor
    }
  }
`
