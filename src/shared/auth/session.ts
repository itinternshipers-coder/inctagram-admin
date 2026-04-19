import 'server-only'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AUTH_TOKEN_COOKIE } from '@/shared/auth/constants'

const isProduction = process.env.NODE_ENV === 'production'

export async function getAccessToken() {
  return (await cookies()).get(AUTH_TOKEN_COOKIE)?.value ?? null
}

export async function setAccessToken(token: string) {
  ;(await cookies()).set({
    name: AUTH_TOKEN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction,
    path: '/',
    maxAge: 60 * 60 * 24,
  })
}

export async function clearAccessToken() {
  ;(await cookies()).delete(AUTH_TOKEN_COOKIE)
}

export async function requireAccessToken() {
  const token = await getAccessToken()

  if (!token) {
    redirect('/sign-in')
  }

  return token
}
