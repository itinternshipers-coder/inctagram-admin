import { useQuery } from '@apollo/client/react'

import { GET_USER_FOLLOWERS } from './users-queries'
import type { FollowersListOutput, UserFollowersInput, UserSubscriptionRow } from '../model/types/types'

type UseUserFollowersParams = {
  userId: string
  page: number
  pageSize: number
}

function mapFollowerToRow(follower: { id: string; username: string; createdAt: string }): UserSubscriptionRow {
  const date = new Date(follower.createdAt)
  const since = Number.isNaN(date.getTime())
    ? follower.createdAt
    : date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })

  return {
    id: follower.id,
    username: follower.username,
    profileLink: `/profile/${follower.username}`,
    since,
  }
}

export function useUserFollowers({ userId, page, pageSize }: UseUserFollowersParams) {
  const input: UserFollowersInput = {
    userId,
    page,
    pageSize,
  }

  const { data, loading, error } = useQuery<{ userFollowers: FollowersListOutput }>(GET_USER_FOLLOWERS, {
    variables: { input },
    skip: !userId,
  })

  return {
    rows: (data?.userFollowers.items ?? []).map(mapFollowerToRow),
    page: data?.userFollowers.page ?? page,
    pageSize: data?.userFollowers.pageSize ?? pageSize,
    totalCount: data?.userFollowers.totalCount ?? 0,
    totalPages: data?.userFollowers.totalPages ?? 1,
    loading,
    error,
  }
}
