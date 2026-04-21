import { useQuery } from '@apollo/client/react'
import { GET_USERS } from './users-queries'
import { UsersListInput, UsersListOutput, UserFilter, SortDirection } from '../model/types/types'

type UseUsersParams = {
  page: number
  pageSize: number
  search: string
  filter: UserFilter
  sortDirection: SortDirection
}

export function useUsers({ page, pageSize, search, filter, sortDirection }: UseUsersParams) {
  const input: UsersListInput = {
    page,
    pageSize,
    ...(search && { search }),
    ...(sortDirection && { sortBy: 'profileLink', sortDirection }),
    ...(filter === 'blocked' && { filterBanned: 'banned' }),
    ...(filter === 'not-blocked' && { filterBanned: 'unbanned' }),
  }

  const { data, loading, error } = useQuery<{ users: UsersListOutput }>(GET_USERS, {
    variables: { input },
  })

  return {
    users: data?.users.items ?? [],
    page: data?.users.page ?? 1,
    pageSize: data?.users.pageSize ?? pageSize,
    totalCount: data?.users.totalCount ?? 0,
    totalPages: data?.users.totalPages ?? 1,
    loading,
    error,
  }
}
