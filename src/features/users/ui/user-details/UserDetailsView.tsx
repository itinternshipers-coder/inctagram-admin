'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import {
  USER_DETAILS_FOLLOWERS,
  USER_DETAILS_FOLLOWING,
  USER_DETAILS_PAYMENTS,
  USER_DETAILS_PHOTO_URLS,
  USER_DETAILS_TABS,
} from '@/features/users/model/user-details-mock-data'
import { Pagination } from '@/features/users/ui/Pagination'
import type { User } from '@/features/users/model/types'
import Tabs from '@/shared/ui/Tabs/Tabs'
import { Typography } from '@/shared/ui/Typography/Typography'
import s from './UserDetailsView.module.scss'

type UserDetailsViewProps = {
  user: User
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

function getTotalPages(total: number, pageSize: number) {
  return Math.max(1, Math.ceil(total / pageSize))
}

export function UserDetailsView({ user, requestedUserId }: UserDetailsViewProps) {
  const [paymentsPageState, setPaymentsPageState] = useState<PageState>({ currentPage: 1, pageSize: 10 })
  const [followersPageState, setFollowersPageState] = useState<PageState>({ currentPage: 1, pageSize: 10 })
  const [followingPageState, setFollowingPageState] = useState<PageState>({ currentPage: 1, pageSize: 10 })

  const avatarFallback = user.username.charAt(0).toUpperCase()
  const profileLinkHref = `https://inctagram.org/${user.profileLink}`
  const isFallbackUser = user.id !== requestedUserId

  const pagedPayments = useMemo(
    () => paginate(USER_DETAILS_PAYMENTS, paymentsPageState.currentPage, paymentsPageState.pageSize),
    [paymentsPageState.currentPage, paymentsPageState.pageSize]
  )

  const pagedFollowers = useMemo(
    () => paginate(USER_DETAILS_FOLLOWERS, followersPageState.currentPage, followersPageState.pageSize),
    [followersPageState.currentPage, followersPageState.pageSize]
  )

  const pagedFollowing = useMemo(
    () => paginate(USER_DETAILS_FOLLOWING, followingPageState.currentPage, followingPageState.pageSize),
    [followingPageState.currentPage, followingPageState.pageSize]
  )

  const tabs = useMemo(
    () => [
      {
        label: USER_DETAILS_TABS[0].label,
        content: (
          <div className={s.photosGrid}>
            {USER_DETAILS_PHOTO_URLS.map((url, index) => (
              <article key={`${url}-${index}`} className={s.photoCard}>
                <span
                  className={s.photo}
                  style={{ backgroundImage: `url(${url})` }}
                  role="img"
                  aria-label={`Uploaded photo ${index + 1}`}
                />
              </article>
            ))}
          </div>
        ),
      },
      {
        label: USER_DETAILS_TABS[1].label,
        content: (
          <div className={s.tableSection}>
            <div className={s.tableWrapper}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Subscription</th>
                    <th>Payment method</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.date}</td>
                      <td>{payment.amount}</td>
                      <td>{payment.subscription}</td>
                      <td>{payment.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={paymentsPageState.currentPage}
              totalPages={getTotalPages(USER_DETAILS_PAYMENTS.length, paymentsPageState.pageSize)}
              pageSize={paymentsPageState.pageSize}
              onPageChange={(page) => setPaymentsPageState((prev) => ({ ...prev, currentPage: page }))}
              onPageSizeChange={(size) => setPaymentsPageState({ currentPage: 1, pageSize: size })}
            />
          </div>
        ),
      },
      {
        label: USER_DETAILS_TABS[2].label,
        content: (
          <div className={s.tableSection}>
            <div className={s.tableWrapper}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Profile link</th>
                    <th>Followed at</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedFollowers.map((follower) => (
                    <tr key={follower.id}>
                      <td>{follower.username}</td>
                      <td>{follower.profileLink}</td>
                      <td>{follower.since}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={followersPageState.currentPage}
              totalPages={getTotalPages(USER_DETAILS_FOLLOWERS.length, followersPageState.pageSize)}
              pageSize={followersPageState.pageSize}
              onPageChange={(page) => setFollowersPageState((prev) => ({ ...prev, currentPage: page }))}
              onPageSizeChange={(size) => setFollowersPageState({ currentPage: 1, pageSize: size })}
            />
          </div>
        ),
      },
      {
        label: USER_DETAILS_TABS[3].label,
        content: (
          <div className={s.tableSection}>
            <div className={s.tableWrapper}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Profile link</th>
                    <th>Following since</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedFollowing.map((following) => (
                    <tr key={following.id}>
                      <td>{following.username}</td>
                      <td>{following.profileLink}</td>
                      <td>{following.since}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={followingPageState.currentPage}
              totalPages={getTotalPages(USER_DETAILS_FOLLOWING.length, followingPageState.pageSize)}
              pageSize={followingPageState.pageSize}
              onPageChange={(page) => setFollowingPageState((prev) => ({ ...prev, currentPage: page }))}
              onPageSizeChange={(size) => setFollowingPageState({ currentPage: 1, pageSize: size })}
            />
          </div>
        ),
      },
    ],
    [
      followersPageState.currentPage,
      followersPageState.pageSize,
      followingPageState.currentPage,
      followingPageState.pageSize,
      pagedFollowers,
      pagedFollowing,
      pagedPayments,
      paymentsPageState.currentPage,
      paymentsPageState.pageSize,
    ]
  )

  return (
    <section className={s.container}>
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

      {isFallbackUser && (
        <Typography variant="small_text" className={s.fallbackNote}>
          User with id {requestedUserId} not found in mock data. Showing first available user.
        </Typography>
      )}

      <Tabs tabs={tabs} />
    </section>
  )
}
