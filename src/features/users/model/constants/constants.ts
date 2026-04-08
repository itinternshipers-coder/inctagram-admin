import type { PaginationState } from '../types/types'

export const INITIAL_PAGE_STATE: PaginationState = {
  currentPage: 1,
  pageSize: 10,
}

export const USER_DETAILS_TABS = [
  { key: 'uploaded', label: 'Uploaded photos' },
  { key: 'payments', label: 'Payments' },
  { key: 'followers', label: 'Followers' },
  { key: 'following', label: 'Following' },
] as const
