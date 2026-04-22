import { useQuery } from '@apollo/client/react'

import { GET_PAYMENTS } from './payments-queries'
import type { PaymentsListInput, PaymentsListOutput, PaymentSortState } from '../model/types/types'

type UsePaymentsParams = {
  page: number
  pageSize: number
  search: string
  sort: PaymentSortState | null
}

export function usePayments({ page, pageSize, search, sort }: UsePaymentsParams) {
  const input: PaymentsListInput = {
    page,
    pageSize,
    ...(search && { search }),
    ...(sort?.direction && { sortBy: sort.field, sortDirection: sort.direction }),
  }

  const { data, loading, error } = useQuery<{ payments: PaymentsListOutput }>(GET_PAYMENTS, {
    variables: { input },
  })

  return {
    payments: data?.payments.items ?? [],
    totalCount: data?.payments.totalCount ?? 0,
    totalPages: data?.payments.totalPages ?? 1,
    loading,
    error,
  }
}
