import { useQuery } from '@apollo/client/react'

import { GET_USER_FOLLOWING } from './users-queries'
import type { FollowersListOutput, UserFollowersInput, UserSubscriptionRow } from '../model/types/types'

type UseUserFollowingParams = {
  userId: string
  page: number
  pageSize: number
}

function mapFollowingToRow(following: { id: string; username: string; createdAt: string }): UserSubscriptionRow {
  const date = new Date(following.createdAt)
  const since = Number.isNaN(date.getTime())
    ? following.createdAt
    : date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })

  return {
    id: following.id,
    username: following.username,
    profileLink: `/profile/${following.username}`,
    since,
  }
}

export function useUserFollowing({ userId, page, pageSize }: UseUserFollowingParams) {
  const input: UserFollowersInput = {
    userId,
    page,
    pageSize,
  }

  const { data, loading, error } = useQuery<{ userFollowing: FollowersListOutput }>(GET_USER_FOLLOWING, {
    variables: { input },
    skip: !userId,
  })

  return {
    rows: (data?.userFollowing.items ?? []).map(mapFollowingToRow),
    page: data?.userFollowing.page ?? page,
    pageSize: data?.userFollowing.pageSize ?? pageSize,
    totalCount: data?.userFollowing.totalCount ?? 0,
    totalPages: data?.userFollowing.totalPages ?? 1,
    loading,
    error,
  }
}
