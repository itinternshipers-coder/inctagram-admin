'use client'

import { useRef, useEffect } from 'react'

type PropsChangeModal = {
  handleChangeModalAction: (value: boolean) => void
  isOpen: boolean
}

export const useChangeModal = ({ handleChangeModalAction, isOpen }: PropsChangeModal) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const onDocPointer = (e: MouseEvent | TouchEvent) => {
      const root = wrapperRef.current
      if (root && !root.contains(e.target as Node)) {
        handleChangeModalAction(false)
      }
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('mousedown', onDocPointer, true)
    document.addEventListener('touchstart', onDocPointer, true)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('mousedown', onDocPointer, true)
      document.removeEventListener('touchstart', onDocPointer, true)
    }
  }, [isOpen, wrapperRef, handleChangeModalAction])
  return wrapperRef
}
