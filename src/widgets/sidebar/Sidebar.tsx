import React from 'react'
import PersonIcon from '@/shared/icons/PersonIcon'
import TrendingUpOutlineIcon from '@/shared/icons/TrendingUpOutlineIcon'
import CreditCardOutlineIcon from '@/shared/icons/CreditCardOutlineIcon'
import ImageOutlineIcon from '@/shared/icons/ImageOutlineIcon'
import styles from './Sidebar.module.scss'
import Link from 'next/link'
import { Typography } from '@/shared/ui/Typography/Typography'

type Props = {
  pathname: string
  handleLogout: () => void
}

const NAV_ITEMS = [
  { href: '/users', label: 'Users list', icon: PersonIcon },
  { href: '/statistics', label: 'Statistics', icon: TrendingUpOutlineIcon },
  { href: '/payments', label: 'Payments list', icon: CreditCardOutlineIcon },
  { href: '/posts', label: 'Posts list', icon: ImageOutlineIcon },
]

export const Sidebar = ({ pathname, handleLogout }: Props) => {
  return (
    <nav className={styles.sidebar}>
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`${styles.navLink} ${pathname.startsWith(href) ? styles.navLinkActive : ''}`}
        >
          <Icon size={24} />
          <Typography variant="regular_text_14" as="span">
            {label}
          </Typography>
        </Link>
      ))}
      <form action={handleLogout}>
        <button className={styles.logoutButton} type="submit">
          <Typography variant="regular_text_14" as="span">
            Log Out
          </Typography>
        </button>
      </form>
    </nav>
  )
}
