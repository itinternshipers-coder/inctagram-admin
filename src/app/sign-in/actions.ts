'use server'

import { redirect } from 'next/navigation'
import { executeGraphQL } from '@/shared/api/graphql-server'
import { setAccessToken } from '@/shared/auth/session'

export type SignInFormState = {
  error?: string
  fieldErrors?: {
    email?: string
    password?: string
  }
}

type AdminLoginMutation = {
  adminLogin: {
    accessToken: string
  }
}

type AdminLoginVariables = {
  email: string
  password: string
}

const ADMIN_LOGIN_MUTATION = `
  mutation AdminLogin($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password) {
      accessToken
    }
  }
`

export async function signInAction(_: SignInFormState, formData: FormData): Promise<SignInFormState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  const fieldErrors: SignInFormState['fieldErrors'] = {}

  if (!email) {
    fieldErrors.email = 'Email is required'
  }

  if (!password) {
    fieldErrors.password = 'Password is required'
  }

  if (fieldErrors.email || fieldErrors.password) {
    return { fieldErrors }
  }

  const { response, payload } = await executeGraphQL<AdminLoginMutation, AdminLoginVariables>({
    query: ADMIN_LOGIN_MUTATION,
    variables: { email, password },
  })

  const accessToken = payload.data?.adminLogin.accessToken

  if (!response.ok || !accessToken) {
    return {
      error: payload.errors?.[0]?.message ?? 'Invalid email or password',
    }
  }

  await setAccessToken(accessToken)
  redirect('/')
}
