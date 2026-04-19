'use server'

import { redirect } from 'next/navigation'
import { clearAccessToken } from '@/shared/auth/session'

export async function signOutAction() {
  await clearAccessToken()
  redirect('/sign-in')
}
