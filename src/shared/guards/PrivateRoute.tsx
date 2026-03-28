'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Loader from '@/shared/ui/Loader/Loader'

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null

  useEffect(() => {
    if (!token) {
      router.replace('/sign-in')
    }
  }, [router, token])

  if (!token) {
    return <Loader />
  }

  return <>{children}</>
}
