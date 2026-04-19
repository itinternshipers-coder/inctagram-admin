import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: ReactNode
}

export const Portal = ({ children }: Props) => {
  if (typeof window === 'undefined') return null

  const container = document.getElementById('modal-root')

  if (!container) return null

  return createPortal(children, container)
}
