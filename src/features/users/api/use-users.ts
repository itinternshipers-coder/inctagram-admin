import { useQuery } from '@apollo/client/react'
import { UserFilter, SortDirection, User } from '../model/types/types'
import { GetUsersDocument } from '@/views/UsersList/api/userList.generated'

type UseUsersParams = {
  page: number
  pageSize: number
  search: string
  filter: UserFilter
  sortDirection: SortDirection
}

type UseUsersResult = {
  users: User[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  loading: boolean
  error: unknown
}

function applyBannedFilter(users: User[], filter: UserFilter) {
  if (filter === 'blocked') {
    return users.filter((user) => user.isBanned)
  }

  if (filter === 'not-blocked') {
    return users.filter((user) => !user.isBanned)
  }

  return users
}

export function useUsers({ page, pageSize, search, filter, sortDirection }: UseUsersParams): UseUsersResult {
  const { data, loading, error } = useQuery(GetUsersDocument, {
    variables: {
      page,
      pageSize,
      search: search || undefined,
      sortBy: sortDirection ? 'profileLink' : undefined,
      sortDirection: sortDirection || undefined,
      filterBanned: filter === 'blocked' ? 'banned' : filter === 'not-blocked' ? 'unbanned' : undefined,
    },
    notifyOnNetworkStatusChange: true,
  })

  const users = applyBannedFilter(
    data?.users.items.map((user) => ({
      id: user.id,
      username: user.username,
      profileLink: user.profileLink,
      email: user.email,
      isBanned: user.isBanned,
      banReason: user.banReason ?? null,
      bannedAt: user.bannedAt ?? null,
      dataAdded: user.dataAdded,
      avatarUrl: user.avatarUrl ?? null,
    })) ?? [],
    filter
  )

  return {
    users,
    page: data?.users.page ?? 1,
    pageSize: data?.users.pageSize ?? pageSize,
    totalCount: data?.users.totalCount ?? 0,
    totalPages: data?.users.totalPages ?? 1,
    loading,
    error,
  }
}
