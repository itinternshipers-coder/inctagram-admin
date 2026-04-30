'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Header } from '@/widgets/header/Header'
import styles from './AdminLayout.module.scss'
import PersonIcon from '@/shared/icons/PersonIcon'
import TrendingUpOutlineIcon from '@/shared/icons/TrendingUpOutlineIcon'
import CreditCardOutlineIcon from '@/shared/icons/CreditCardOutlineIcon'
import ImageOutlineIcon from '@/shared/icons/ImageOutlineIcon'
import { Typography } from '@/shared/ui/Typography/Typography'
import { signOutAction } from '@/shared/auth/actions'

const NAV_ITEMS = [
  { href: '/users', label: 'Users list', icon: PersonIcon },
  { href: '/statistics', label: 'Statistics', icon: TrendingUpOutlineIcon },
  { href: '/payments', label: 'Payments list', icon: CreditCardOutlineIcon },
  { href: '/posts', label: 'Posts list', icon: ImageOutlineIcon },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.body}>
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

          <form action={signOutAction}>
            <button className={styles.logoutButton} type="submit">
              <Typography variant="regular_text_14" as="span">
                Log Out
              </Typography>
            </button>
          </form>
        </nav>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  )
}
