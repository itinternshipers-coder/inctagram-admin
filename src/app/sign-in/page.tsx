import { redirect } from 'next/navigation'
import { getAccessToken } from '@/shared/auth/session'
import { Header } from '@/widgets/header/Header'
import { SignInForm } from './SignInForm'

export default async function SignInPage() {
  const token = await getAccessToken()

  if (token) {
    redirect('/')
  }

  return (
    <>
      <Header />
      <SignInForm />
    </>
  )
}
