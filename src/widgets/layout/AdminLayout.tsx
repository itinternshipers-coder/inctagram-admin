'use client'

import { usePathname, useRouter } from 'next/navigation'
import { PrivateRoute } from '@/shared/guards/PrivateRoute'
import { Header } from '@/widgets/header/Header'
import styles from './AdminLayout.module.scss'
import { Sidebar } from '@/widgets/sidebar/Sidebar'

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/sign-in')
  }

  return (
    <PrivateRoute>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.body}>
          <Sidebar pathname={pathname} handleLogout={handleLogout} />
          <main className={styles.content}>{children}</main>
        </div>
      </div>
    </PrivateRoute>
  )
}
