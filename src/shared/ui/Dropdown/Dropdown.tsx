import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Button } from '@/shared/ui/Button/Button'
import MoreHorizontalOutlineIcon from '@/shared/icons/MoreHorizontalOutlineIcon'
import s from './Dropdown.module.scss'
import PauseCircleOutlineIcon from '@/shared/icons/PauseCircleOutlineIcon'
import PersonRemoveOutlineIcon from '@/shared/icons/PersonRemoveOutlineIcon'

type Props = {
  onDelete: () => void
  onBan: () => void
  onMoreInfo: () => void
}

export const Dropdown = ({ onDelete, onBan, onMoreInfo }: Props) => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <Button className={s.menuButton} variant="tertiary">
          <MoreHorizontalOutlineIcon />
        </Button>
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
