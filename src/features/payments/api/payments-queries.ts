import { gql } from '@apollo/client'

export const GET_PAYMENTS = gql`
  query GetPayments($input: PaymentsListInput) {
    payments(input: $input) {
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
