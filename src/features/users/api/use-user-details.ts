import { useQuery } from '@apollo/client/react'

import { GET_USER } from './users-queries'
import type { User } from '../model/types'
import type { UserDetail } from '../model/types'

type UseUserDetailsParams = {
  userId: string
}

function mapUserDetailToUser(user: UserDetail): User {
  return {
    id: user.id,
    username: user.username,
    profileLink: user.profileLink,
    email: user.email,
    isBanned: user.isBanned,
    banReason: user.banReason,
    bannedAt: user.bannedAt,
    dataAdded: user.createdAt,
    avatarUrl: user.avatarSmallUrl ?? user.avatarUrl,
  }
}

export function useUserDetails({ userId }: UseUserDetailsParams) {
  const { data, loading, error } = useQuery<{ user: UserDetail }>(GET_USER, {
    variables: { id: userId },
    skip: !userId,
  })

  return {
    user: data?.user ? mapUserDetailToUser(data.user) : null,
    loading,
    error,
  }
}
