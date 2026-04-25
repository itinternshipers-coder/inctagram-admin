import type { SortDirection } from '@/features/users/model/types/types'

export type Payment = {
  id: string
  amount: number
  date: string
  paymentMethod: string
  subscription: string
  userId: string
  username: string
  avatarUrl: string | null
}

export type PaymentsListInput = {
  page?: number
  pageSize?: number
  search?: string
  sortBy?: string
  sortDirection?: string
}

export type PaymentsListOutput = {
  items: Payment[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export type PaymentSortField = 'username' | 'date' | 'amount' | 'paymentMethod'

export type PaymentSortState = {
  field: PaymentSortField
  direction: SortDirection
}
