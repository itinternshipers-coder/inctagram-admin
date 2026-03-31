'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Loader from '@/shared/ui/Loader/Loader'

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.replace('/sign-in')
    } else {
      setIsAuthorized(true) // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, [router])

  if (isAuthorized === null) {
    return <Loader />
  }

  return <>{children}</>
}
