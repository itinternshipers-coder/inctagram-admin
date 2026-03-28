'use client'

import { useTheme } from '@/shared/providers/ThemeProvider'
import Link from 'next/link'
import s from './Header.module.scss'
import { Option, SelectBox } from '@/shared/ui/SelectBox/SelectBox'
import FlagRussiaIcon from '@/shared/icons/FlagRussiaIcon'
import FlagUnitedKingdomIcon from '@/shared/icons/FlagUnitedKingdomIcon'
import { Typography } from '@/shared/ui/Typography/Typography'
import { Switch } from '@/shared/ui/Switch/Switch'

const languageOptions: Option[] = [
  { value: 'ru', label: 'Russian', icon: <FlagRussiaIcon /> },
  { value: 'en', label: 'English', icon: <FlagUnitedKingdomIcon /> },
]

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <header className={s.container}>
      <Typography as={Link} href="/" variant="large">
        Inctagram
        <span className={s.superAdmin}>SuperAdmin</span>
      </Typography>
      <div className={s.actions}>
        <SelectBox options={languageOptions} defaultValue="en" width="163px" />
        <Switch checked={isDark} onCheckedChangeAction={toggleTheme} />
      </div>
    </header>
  )
}
