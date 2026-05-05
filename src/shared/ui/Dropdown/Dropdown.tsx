import React, { ReactNode } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from './Dropdown.module.scss'
import { clsx } from 'clsx'

export type DropdownItem = {
  label: string
  icon: ReactNode
  onSelect: () => void
}

type Props = {
  items: DropdownItem[]
  trigger: ReactNode
  triggerClassName?: string
}

export const Dropdown = ({ items, trigger, triggerClassName }: Props) => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <div className={clsx(s.menuButton, triggerClassName)}>{trigger}</div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={s.dropdownContent}
          side="bottom"
          align="end"
          sideOffset={4}
          collisionPadding={8}
          avoidCollisions
        >
          {items.map((item, idx) => (
            <DropdownMenu.Item key={idx} className={s.dropdownItem} onSelect={item.onSelect}>
              {item.icon}
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
