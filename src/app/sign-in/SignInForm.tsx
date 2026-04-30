'use client'

import { useActionState } from 'react'
import styles from './sign-in.module.scss'
import { signInAction, type SignInFormState } from './actions'
import { Input } from '@/shared/ui/Input/Input'
import { Typography } from '@/shared/ui/Typography/Typography'
import { Card } from '@/shared/ui/Card/Card'
import { Button } from '@/shared/ui/Button/Button'

const initialState: SignInFormState = {}

export function SignInForm() {
  const [state, formAction, pending] = useActionState(signInAction, initialState)

  return (
    <div className={styles.container}>
      <Card className={styles.form}>
        <Typography variant="h2" className={styles.title}>
          Sign In
        </Typography>

        <form action={formAction}>
          <div className={styles.inputGroup}>
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="Epam@epam.com"
              error={state.fieldErrors?.email}
              disabled={pending}
            />
          </div>

          <div className={styles.inputGroup}>
            <Input
              name="password"
              label="Password"
              type="password"
              placeholder="********"
              error={state.fieldErrors?.password}
              disabled={pending}
            />
          </div>

          {state.error && (
            <Typography variant="regular_text_14" className={styles.error}>
              {state.error}
            </Typography>
          )}

          <Button type="submit" fullWidth disabled={pending}>
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  )
}
