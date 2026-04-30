'use client'
import { useState } from 'react'

import s from './SortButton.module.scss'
import TriangleUpDownIcon from '@/shared/icons/TriangleUpDownIcon'
import TriangleUpIcon from '@/shared/icons/TriangleUpIcon'
import TriangleDownIcon from '@/shared/icons/TriangleDownIcon'

export type SortBy = 'created_at' | 'amount' | 'paymentMethod' | 'userName'
export type DirectionType = 'asc' | 'desc' | ''
type Props = {
  changeDirectionCallback?: (direction: DirectionType, type: SortBy) => void
  typeofSort?: SortBy
}

export const changeDirection = (direction: DirectionType): DirectionType => {
  let value: DirectionType = ''
  switch (direction) {
    case 'asc':
      value = 'desc'
      break
    case 'desc':
      value = ''
      break
    case '':
      value = 'asc'
      break
    default:
      value = ''
  }
  return value
}
export const SortButton = ({ changeDirectionCallback, typeofSort }: Props) => {
  const [direction, setDirection] = useState<DirectionType>('')

  const handleClick = () => {
    const nextDirection: DirectionType = changeDirection(direction)
    setDirection(nextDirection)
    changeDirectionCallback?.(direction, typeofSort ?? 'created_at')
  }
  return (
    <button onClick={handleClick} className={s.button}>
      {direction === '' && <TriangleUpDownIcon />}
      {direction === 'asc' && <TriangleUpIcon />}
      {direction === 'desc' && <TriangleDownIcon />}
    </button>
  )
}
