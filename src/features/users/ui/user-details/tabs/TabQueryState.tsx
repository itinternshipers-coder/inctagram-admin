import type { ReactNode } from 'react'
import { Typography } from '@/shared/ui/Typography/Typography'

type Props = {
  children: ReactNode
  emptyText: string
  error?: Error
  errorText: string
  isEmpty: boolean
  loading: boolean
  loadingText: string
}

export function TabQueryState({ children, emptyText, error, errorText, isEmpty, loading, loadingText }: Props) {
  if (loading) {
    return <Typography variant="regular_text_14">{loadingText}</Typography>
  }

  if (error) {
    return (
      <Typography variant="regular_text_14">
        {errorText}: {error.message}
      </Typography>
    )
  }

  if (isEmpty) {
    return <Typography variant="regular_text_14">{emptyText}</Typography>
  }

  return <>{children}</>
}
