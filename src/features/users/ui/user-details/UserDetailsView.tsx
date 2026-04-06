'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import { useUserDetails } from '@/features/users/api/use-user-details'
import { useUserPhotos } from '@/features/users/api/use-user-photos'
import { useUserPayments } from '@/features/users/api/use-user-payments'
import {
  USER_DETAILS_FOLLOWERS,
  USER_DETAILS_FOLLOWING,
  USER_DETAILS_TABS,
} from '@/features/users/model/user-details-mock-data'
import { Pagination } from '@/features/users/ui/Pagination'
import Tabs from '@/shared/ui/Tabs/Tabs'
import { Typography } from '@/shared/ui/Typography/Typography'
import { UserSubscriptionsTable } from './userSubscriptionsTable/UserSubscriptionsTable'
import s from './UserDetailsView.module.scss'

type UserDetailsViewProps = {
  requestedUserId: string
}

type PageState = {
  currentPage: number
  pageSize: number
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function paginate<T>(items: T[], page: number, pageSize: number) {
  const startIndex = (page - 1) * pageSize

  return items.slice(startIndex, startIndex + pageSize)
}

export function UserDetailsView({ requestedUserId }: UserDetailsViewProps) {
  const [paymentsPageState, setPaymentsPageState] = useState<PageState>({ currentPage: 1, pageSize: 10 })
  const [followersPageState, setFollowersPageState] = useState<PageState>({ currentPage: 1, pageSize: 10 })
  const [followingPageState, setFollowingPageState] = useState<PageState>({ currentPage: 1, pageSize: 10 })
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useUserDetails({
    userId: requestedUserId,
  })

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
  const avatarFallback = user?.username.charAt(0).toUpperCase() ?? ''
  const profileLinkHref = user ? `https://inctagram.org/${user.profileLink}` : '#'

  const pagedFollowers = useMemo(
    () => paginate(USER_DETAILS_FOLLOWERS, followersPageState.currentPage, followersPageState.pageSize),
    [followersPageState.currentPage, followersPageState.pageSize]
  )

  const pagedFollowing = useMemo(
    () => paginate(USER_DETAILS_FOLLOWING, followingPageState.currentPage, followingPageState.pageSize),
    [followingPageState.currentPage, followingPageState.pageSize]
  )

  const tabs = [
    {
      label: USER_DETAILS_TABS[0].label,
      content: (
        <div className={s.photosGrid}>
          {photosLoading ? (
            <Typography variant="regular_text_14">Loading photos...</Typography>
          ) : photosError ? (
            <Typography variant="regular_text_14">Failed to load photos: {photosError.message}</Typography>
          ) : photoUrls.length === 0 ? (
            <Typography variant="regular_text_14">No uploaded photos</Typography>
          ) : (
            photoUrls.map((url, index) => (
              <article key={`${url}-${index}`} className={s.photoCard}>
                <img className={s.photoImage} src={url} alt={`Uploaded photo ${index + 1}`} loading="lazy" />
              </article>
            ))
          )}
        </div>
      ),
    },
    {
      label: USER_DETAILS_TABS[1].label,
      content: (
        <div className={s.tableSection}>
          {paymentsLoading ? (
            <Typography variant="regular_text_14">Loading payments...</Typography>
          ) : paymentsError ? (
            <Typography variant="regular_text_14">Failed to load payments: {paymentsError.message}</Typography>
          ) : (
            <>
              <div className={s.tableWrapper}>
                <table className={s.table}>
                  <thead>
                    <tr>
                      <th>Date of Payment</th>
                      <th>End date of subscription</th>
                      <th>Amount, $</th>
                      <th>Subscription Type</th>
                      <th>Payment Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentRows.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.paymentDate}</td>
                        <td>{payment.endDate}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.subscriptionType}</td>
                        <td>{payment.paymentType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={paymentsPageState.currentPage}
                totalPages={paymentTotalPages}
                pageSize={paymentsPageState.pageSize}
                onPageChange={(page) => setPaymentsPageState((prev) => ({ ...prev, currentPage: page }))}
                onPageSizeChange={(size) => setPaymentsPageState({ currentPage: 1, pageSize: size })}
              />
            </>
          )}
        </div>
      ),
    },
    {
      label: USER_DETAILS_TABS[2].label,
      content: (
        <UserSubscriptionsTable
          rows={pagedFollowers}
          userId={user?.id ?? ''}
          pageState={followersPageState}
          totalCount={USER_DETAILS_FOLLOWERS.length}
          onPageChange={(page) => setFollowersPageState((prev) => ({ ...prev, currentPage: page }))}
          onPageSizeChange={(size) => setFollowersPageState({ currentPage: 1, pageSize: size })}
        />
      ),
    },
    {
      label: USER_DETAILS_TABS[3].label,
      content: (
        <UserSubscriptionsTable
          rows={pagedFollowing}
          userId={user?.id ?? ''}
          pageState={followingPageState}
          totalCount={USER_DETAILS_FOLLOWING.length}
          onPageChange={(page) => setFollowingPageState((prev) => ({ ...prev, currentPage: page }))}
          onPageSizeChange={(size) => setFollowingPageState({ currentPage: 1, pageSize: size })}
        />
      ),
    },
  ]

  return (
    <section className={s.container}>
      {userLoading ? (
        <Typography variant="regular_text_14">Loading user details...</Typography>
      ) : userError ? (
        <Typography variant="regular_text_14">Failed to load user details: {userError.message}</Typography>
      ) : !user ? (
        <Typography variant="regular_text_14">User not found</Typography>
      ) : (
        <>
          <Link href="/users" className={s.backLink}>
            <span aria-hidden>←</span>
            <Typography variant="medium_text_14" as="span">
              Back to Users List
            </Typography>
          </Link>

          <header className={s.userHeader}>
            <div className={s.avatarWrap}>
              {user.avatarUrl ? (
                <span
                  className={s.avatarImage}
                  style={{ backgroundImage: `url(${user.avatarUrl})` }}
                  role="img"
                  aria-label={user.username}
                />
              ) : (
                <span className={s.avatarFallback}>{avatarFallback}</span>
              )}
            </div>

            <div className={s.userInfo}>
              <Typography variant="h2" as="h1">
                {user.username}
              </Typography>

              <a href={profileLinkHref} target="_blank" rel="noreferrer" className={s.profileLink}>
                <Typography variant="regular_text_16" as="span">
                  {user.profileLink}
                </Typography>
              </a>

              <div className={s.metaGrid}>
                <div>
                  <Typography variant="regular_text_14" className={s.metaLabel}>
                    UserID
                  </Typography>
                  <Typography variant="h3">{user.id}</Typography>
                </div>

                <div>
                  <Typography variant="regular_text_14" className={s.metaLabel}>
                    Profile Creation Date
                  </Typography>
                  <Typography variant="h3">{formatDate(user.dataAdded)}</Typography>
                </div>
              </div>
            </div>
          </header>
          <Tabs tabs={tabs} />
        </>
      )}
    </section>
  )
}
