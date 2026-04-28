import { useState } from 'react'

import { useUserFollowers } from '@/features/users/api/use-user-followers'
import { useUserFollowing } from '@/features/users/api/use-user-following'
import { useUserPhotos } from '@/features/users/api/use-user-photos'
import { useUserPayments } from '@/features/users/api/use-user-payments'
import { INITIAL_PAGE_STATE, USER_DETAILS_TABS } from '@/features/users/model/constants/constants'
import type { User } from '@/features/users/model/types/types'
import { PaymentsTab } from '../tabs/PaymentsTab'
import { SubscriptionsTab } from '../tabs/SubscriptionsTab'
import { UploadedPhotosTab } from '../tabs/UploadedPhotosTab'

type Params = {
  user: User | null
}

function buildProfileHref(userId: string) {
  const normalizedPath = `/profile/${encodeURIComponent(userId)}`
  const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL ?? ''

  if (!baseApiUrl) {
    return normalizedPath
  }

  try {
    const apiUrl = new URL(baseApiUrl)
    const appHost = apiUrl.host.replace(/^gateway\./, '')
    const appOrigin = `${apiUrl.protocol}//${appHost}`

    return `${appOrigin}${normalizedPath}`
  } catch {
    return normalizedPath
  }
}

export function useUserDetailsViewModel({ user }: Params) {
  const [paymentsPageState, setPaymentsPageState] = useState(INITIAL_PAGE_STATE)
  const [followersPageState, setFollowersPageState] = useState(INITIAL_PAGE_STATE)
  const [followingPageState, setFollowingPageState] = useState(INITIAL_PAGE_STATE)

  const {
    rows: paymentRows,
    totalPages: paymentTotalPages,
    loading: paymentsLoading,
    error: paymentsError,
  } = useUserPayments({
    userId: user?.id ?? '',
    page: paymentsPageState.currentPage,
    pageSize: paymentsPageState.pageSize,
  })
  const {
    photoUrls,
    loading: photosLoading,
    error: photosError,
  } = useUserPhotos({
    username: user?.username ?? '',
  })
  const {
    rows: followerRows,
    totalCount: followerTotalCount,
    loading: followersLoading,
    error: followersError,
  } = useUserFollowers({
    userId: user?.id ?? '',
    page: followersPageState.currentPage,
    pageSize: followersPageState.pageSize,
  })
  const {
    rows: followingRows,
    totalCount: followingTotalCount,
    loading: followingLoading,
    error: followingError,
  } = useUserFollowing({
    userId: user?.id ?? '',
    page: followingPageState.currentPage,
    pageSize: followingPageState.pageSize,
  })

  const tabs = [
    {
      label: USER_DETAILS_TABS[0].label,
      content: <UploadedPhotosTab loading={photosLoading} error={photosError} photoUrls={photoUrls} />,
    },
    {
      label: USER_DETAILS_TABS[1].label,
      content: (
        <PaymentsTab
          loading={paymentsLoading}
          error={paymentsError}
          rows={paymentRows}
          pageState={paymentsPageState}
          totalPages={paymentTotalPages}
          onPageChange={(page) => setPaymentsPageState((prev) => ({ ...prev, currentPage: page }))}
          onPageSizeChange={(size) => setPaymentsPageState({ currentPage: 1, pageSize: size })}
        />
      ),
    },
    {
      label: USER_DETAILS_TABS[2].label,
      content: (
        <SubscriptionsTab
          sectionName="Followers"
          emptyText="No followers"
          loading={followersLoading}
          error={followersError}
          rows={followerRows}
          pageState={followersPageState}
          totalCount={followerTotalCount}
          onPageChange={(page) => setFollowersPageState((prev) => ({ ...prev, currentPage: page }))}
          onPageSizeChange={(size) => setFollowersPageState({ currentPage: 1, pageSize: size })}
        />
      ),
    },
    {
      label: USER_DETAILS_TABS[3].label,
      content: (
        <SubscriptionsTab
          sectionName="Following"
          emptyText="No following"
          loading={followingLoading}
          error={followingError}
          rows={followingRows}
          pageState={followingPageState}
          totalCount={followingTotalCount}
          onPageChange={(page) => setFollowingPageState((prev) => ({ ...prev, currentPage: page }))}
          onPageSizeChange={(size) => setFollowingPageState({ currentPage: 1, pageSize: size })}
        />
      ),
    },
  ]

  return {
    avatarFallback: user?.username.charAt(0).toUpperCase() ?? '',
    profileLinkHref: user ? buildProfileHref(user.id) : '#',
    tabs,
  }
}
