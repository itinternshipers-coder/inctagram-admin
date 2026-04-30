import { NextResponse } from 'next/server'
import { GRAPHQL_API_URL } from '@/shared/auth/constants'
import { getAccessToken } from '@/shared/auth/session'

export async function POST(request: Request) {
  const token = await getAccessToken()

  if (!token) {
    return NextResponse.json({ errors: [{ message: 'Unauthorized' }] }, { status: 401 })
  }

  const body = await request.text()
  const upstreamResponse = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'content-type': request.headers.get('content-type') ?? 'application/json',
      authorization: `Bearer ${token}`,
    },
    body,
    cache: 'no-store',
  })

  return new Response(await upstreamResponse.text(), {
    status: upstreamResponse.status,
    headers: {
      'content-type': upstreamResponse.headers.get('content-type') ?? 'application/json',
    },
  })
}
