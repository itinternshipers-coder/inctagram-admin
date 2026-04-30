import React, { ReactNode } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import MoreHorizontalOutlineIcon from '@/shared/icons/MoreHorizontalOutlineIcon'
import s from './Dropdown.module.scss'
import PauseCircleOutlineIcon from '@/shared/icons/PauseCircleOutlineIcon'
import PersonRemoveOutlineIcon from '@/shared/icons/PersonRemoveOutlineIcon'
import { clsx } from 'clsx'

type Props = {
  onDelete: () => void
  onBan: () => void
  onMoreInfo: () => void
  trigger: ReactNode
  triggerClassName?: string
}

export const Dropdown = ({ onDelete, onBan, onMoreInfo, trigger, triggerClassName }: Props) => {
  const triggerStyle = clsx(s.menuButton, triggerClassName)

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <div className={triggerStyle}>{trigger}</div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.dropdownContent} sideOffset={4} alignOffset={0} align="end">
          <DropdownMenu.Item className={s.dropdownItem} onSelect={onDelete}>
            <PersonRemoveOutlineIcon /> Delete User
          </DropdownMenu.Item>
          <DropdownMenu.Item className={s.dropdownItem} onSelect={onBan}>
            <PauseCircleOutlineIcon /> Ban in the system
          </DropdownMenu.Item>
          <DropdownMenu.Item className={s.dropdownItem} onSelect={onMoreInfo}>
            <MoreHorizontalOutlineIcon /> More Information
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
