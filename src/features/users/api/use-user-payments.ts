import { useQuery } from '@apollo/client/react'

import { GET_USER_PAYMENTS } from './users-queries'
import type { UserPaymentsInput, UserPaymentsListOutput } from '../model/types/types'

type UseUserPaymentsParams = {
  userId: string
  page: number
  pageSize: number
}

type UserPaymentRow = {
  id: string
  paymentDate: string
  endDate: string
  amount: string
  subscriptionType: string
  paymentType: string
}

function mapPaymentToRow(payment: {
  id: string
  amount: number
  date: string
  paymentMethod: string
  subscription: string
}): UserPaymentRow {
  const date = new Date(payment.date)
  const formattedDate = Number.isNaN(date.getTime())
    ? payment.date
    : date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })

  return {
    id: payment.id,
    paymentDate: formattedDate,
    endDate: '-',
    amount: `$${payment.amount}`,
    subscriptionType: payment.subscription,
    paymentType: payment.paymentMethod,
  }
}

export function useUserPayments({ userId, page, pageSize }: UseUserPaymentsParams) {
  const input: UserPaymentsInput = {
    userId,
    page,
    pageSize,
  }

  const { data, loading, error } = useQuery<{ userPayments: UserPaymentsListOutput }>(GET_USER_PAYMENTS, {
    variables: { input },
    skip: !userId,
  })

  return {
    rows: (data?.userPayments.items ?? []).map(mapPaymentToRow),
    page: data?.userPayments.page ?? page,
    pageSize: data?.userPayments.pageSize ?? pageSize,
    totalCount: data?.userPayments.totalCount ?? 0,
    totalPages: data?.userPayments.totalPages ?? 1,
    loading,
    error,
  }
}
