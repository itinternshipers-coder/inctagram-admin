'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Header } from '@/widgets/header/Header'
import styles from './sign-in.module.scss'
import { Input } from '@/shared/ui/Input/Input'
import { Typography } from '@/shared/ui/Typography/Typography'
import { Card } from '@/shared/ui/Card/Card'
import { Button } from '@/shared/ui/Button/Button'

// Реальный endpoint для авторизации админа (вместо прошлой локальной заглушки).
const GRAPHQL_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}/graphql`

// Минимальная структура ответа GraphQL adminLogin, которая нам нужна.
type AdminLoginResponse = {
  data?: {
    adminLogin?: {
      accessToken: string
    }
  }
  errors?: Array<{
    message: string
  }>
}

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  // Нужен для блокировки кнопки и текста прогресса во время запроса.
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Базовая клиентская проверка перед отправкой запроса.
    if (!email || !password) {
      setError('Invalid email or password')
      return
    }

    try {
      setIsLoading(true)

      // Реальная авторизация через GraphQL mutation на бэкенде.
      const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation AdminLogin($email: String!, $password: String!) {
              adminLogin(email: $email, password: $password) {
                accessToken
              }
            }
          `,
          variables: {
            email,
            password,
          },
        }),
      })

      const result: AdminLoginResponse = await response.json()
      const token = result.data?.adminLogin?.accessToken

      // В GraphQL может прийти 200 с errors[], поэтому отдельно проверяем token.
      if (!token) {
        setError(result.errors?.[0]?.message ?? 'Invalid email or password')
        return
      }

      // Сохраняем JWT для Apollo auth header и переходим в реальный users-flow.
      localStorage.setItem('adminToken', token)
      router.push('/users')
    } catch {
      // Ошибка сети/транспорта.
      setError('Failed to sign in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Card className={styles.form}>
          <Typography variant="h2" className={styles.title}>
            Sign In
          </Typography>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Epam@epam.com"
                error={error && email === '' ? 'Email is required' : undefined}
              />
            </div>

            <div className={styles.inputGroup}>
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                error={error && password === '' ? 'Password is required' : undefined}
              />
            </div>

            {error && (
              <Typography variant="regular_text_14" className={styles.error}>
                {error}
              </Typography>
            )}

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Card>
      </div>
    </>
  )
}
