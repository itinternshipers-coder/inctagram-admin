'use client'

import { User } from '../model/types/types'
import s from './UsersTable.module.scss'
import { Typography } from '@/shared/ui/Typography/Typography'
import BlockIcon from '@/shared/icons/BlockIcon'
import MoreHorizontalOutlineIcon from '@/shared/icons/MoreHorizontalOutlineIcon'
import PersonRemoveOutlineIcon from '@/shared/icons/PersonRemoveOutlineIcon'
import UnBanIcon from '@/shared/icons/UnBanIcon'
import { Table, TableBody, TableDataCell, TableHead, TableHeaderCell, TableRow } from '@/shared/ui'
import { DirectionType, SortButton, SortBy } from '@/shared/ui/SortButton/SortButton'
import Loader from '@/shared/ui/Loader/Loader'
import { Dropdown, DropdownItem } from '@/shared/ui/Dropdown/Dropdown'
import { useRouter } from 'next/navigation'

type UsersTableProps = {
  users: User[]
  isLoading: boolean
  sortDirectionHandlerAction: (direction: DirectionType, type: SortBy) => void
  onActionSelect: (userId: string, type: 'delete' | 'ban' | 'unban', userName: string) => void
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function UsersTable({ users, isLoading, sortDirectionHandlerAction, onActionSelect }: UsersTableProps) {
  const router = useRouter()

  return (
    <div className={s.tableWrapper}>
      {isLoading && <Loader fullscreen={false}>Loading users...</Loader>}

      <Table className={s.table}>
        <TableHead>
          <TableRow>
            <TableHeaderCell className={s.th}>
              <Typography variant="bold_text_14" as="span">
                User ID
              </Typography>
            </TableHeaderCell>
            <TableHeaderCell className={`${s.th} ${s.sortable}`}>
              <Typography variant="bold_text_14" as="div" className={s.typography}>
                Profile link
                <SortButton typeofSort={'userName'} changeDirectionCallback={sortDirectionHandlerAction} />
              </Typography>
            </TableHeaderCell>
            <TableHeaderCell className={s.th}>
              <Typography variant="bold_text_14" as="span">
                Username
              </Typography>
            </TableHeaderCell>
            <TableHeaderCell className={`${s.th} ${s.sortable}`}>
              <Typography variant="bold_text_14" as="div" className={s.typography}>
                Date added
                <SortButton typeofSort={'created_at'} changeDirectionCallback={sortDirectionHandlerAction} />
              </Typography>
            </TableHeaderCell>
            <TableHeaderCell className={s.th} />
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => {
            const dropdownItems: DropdownItem[] = [
              {
                label: 'Delete User',
                icon: <PersonRemoveOutlineIcon />,
                onSelect: () => onActionSelect(user.id, 'delete', user.username),
              },
              {
                label: user.isBanned ? 'Un-ban User' : 'Ban in the system',
                icon: user.isBanned ? <UnBanIcon /> : <BlockIcon />,
                onSelect: () => onActionSelect(user.id, user.isBanned ? 'unban' : 'ban', user.username),
              },
              {
                label: 'More Information',
                icon: <MoreHorizontalOutlineIcon />,
                onSelect: () => router.push(`/users/${user.id}`),
              },
            ]

            return (
              <TableRow key={user.id} className={s.row}>
                <TableDataCell className={s.td}>
                  <div className={s.userIdCell}>
                    <div className={s.iconWrapper}>
                      {user.isBanned && <BlockIcon size={20} className={s.blockIcon} />}
                    </div>
                    <Typography variant="regular_text_14" as="span">
                      {user.id}
                    </Typography>
                  </div>
                </TableDataCell>
                <TableDataCell className={s.td}>
                  <Typography variant="regular_text_14" as="span">
                    {user.profileLink}
                  </Typography>
                </TableDataCell>
                <TableDataCell className={s.td}>
                  <Typography variant="regular_text_14" as="span">
                    {user.username}
                  </Typography>
                </TableDataCell>
                <TableDataCell className={s.td}>
                  <Typography variant="regular_text_14" as="span">
                    {formatDate(user.dataAdded)}
                  </Typography>
                </TableDataCell>
                <TableDataCell className={s.td}>
                  <Dropdown
                    trigger={<MoreHorizontalOutlineIcon size={20} className={s.iconWrapper} />}
                    items={dropdownItems}
                  />
                </TableDataCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
