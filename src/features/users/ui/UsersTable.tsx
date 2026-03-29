'use client'

import { User, SortDirection } from '../model/types/types'
import s from './UsersTable.module.scss'
import { Typography } from '@/shared/ui/Typography/Typography'
import BlockIcon from '@/shared/icons/BlockIcon'
import MoreHorizontalOutlineIcon from '@/shared/icons/MoreHorizontalOutlineIcon'
import { Table, TableBody, TableDataCell, TableHead, TableHeaderCell, TableRow } from '@/shared/ui'

type UsersTableProps = {
  users: User[]
  sortDirection: SortDirection
  onSort: () => void
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function UsersTable({ users, sortDirection, onSort }: UsersTableProps) {
  const sortArrow = sortDirection === 'asc' ? ' ↑' : sortDirection === 'desc' ? ' ↓' : ''

  return (
    <div className={s.tableWrapper}>
      <Table className={s.table}>
        <TableHead>
          <TableRow>
            <TableHeaderCell className={s.th}>
              <Typography variant="bold_text_14" as="span">
                User ID
              </Typography>
            </TableHeaderCell>
            <TableHeaderCell className={`${s.th} ${s.sortable}`} onClick={onSort}>
              <Typography variant="bold_text_14" as="span">
                Profile link{sortArrow}
              </Typography>
            </TableHeaderCell>
            <TableHeaderCell className={s.th}>
              <Typography variant="bold_text_14" as="span">
                Username
              </Typography>
            </TableHeaderCell>
            <TableHeaderCell className={s.th}>
              <Typography variant="bold_text_14" as="span">
                Date added
              </Typography>
            </TableHeaderCell>
            <TableHeaderCell className={s.th} />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index} className={s.row}>
              <TableDataCell className={s.td}>
                <div className={s.userIdCell}>
                  {user.isBanned && <BlockIcon size={20} className={s.blockIcon} />}
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
                <button className={s.moreButton}>
                  <MoreHorizontalOutlineIcon size={20} />
                </button>
              </TableDataCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
