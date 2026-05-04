'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/widgets/header/Header'
import styles from './AdminLayout.module.scss'
import { Sidebar } from '@/widgets/sidebar/Sidebar'
import { signOutAction } from '@/shared/auth/actions'

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.body}>
        <Sidebar pathname={pathname} handleLogout={signOutAction} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  )
}
