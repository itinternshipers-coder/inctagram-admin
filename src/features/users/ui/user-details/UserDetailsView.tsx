'use client'

import Link from 'next/link'
import { useUserDetails } from '@/features/users/api/use-user-details'
import { formatDate } from '@/features/users/model/lib/format-date'
import Tabs from '@/shared/ui/Tabs/Tabs'
import { Typography } from '@/shared/ui/Typography/Typography'
import { useUserDetailsViewModel } from './lib/useUserDetailsViewModel'
import ArrowBackOutlineIcon from '@/shared/icons/ArrowBackOutlineIcon'
import s from './UserDetailsView.module.scss'

type Props = {
  requestedUserId: string
}

export function UserDetailsView({ requestedUserId }: Props) {
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useUserDetails({
    userId: requestedUserId,
  })

  const { avatarFallback, profileLinkHref, tabs } = useUserDetailsViewModel({ user })
  const profileLinkText = user?.profileLink.replace(/^\/?profile\//i, '') || user?.username || ''

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
            <ArrowBackOutlineIcon />
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
                  {profileLinkText}
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
