'use client'

import { User } from '../model/types'
import s from './UsersTable.module.scss'
import { Typography } from '@/shared/ui/Typography/Typography'
import BlockIcon from '@/shared/icons/BlockIcon'
import MoreHorizontalOutlineIcon from '@/shared/icons/MoreHorizontalOutlineIcon'
import { Table, TableBody, TableDataCell, TableHead, TableHeaderCell, TableRow } from '@/shared/ui'
import { useState } from 'react'
import { AgreementsType, PopUpSettingUser } from '@/shared/ui/PopUpSettingUser/PopUpSettingUser'
import { DirectionType, SortButton, SortBy } from '@/shared/ui/SortButton/SortButton'
import Loader from '@/shared/ui/Loader/Loader'

type UsersTableProps = {
  users: User[]
  isLoading: boolean
  sortDirectionHandlerAction: (direction: DirectionType, type: SortBy) => void
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function UsersTable({ users, isLoading, sortDirectionHandlerAction }: UsersTableProps) {
  const [openedUserId, setOpenedUserId] = useState<string | null>(null)

  const handleChangeModal = (userId: string | null) => {
    setOpenedUserId(userId)
  }

  const modalHandler = (_value: boolean) => {
    handleChangeModal(null)
  }
  const handleOpenAgreementModal = (_value: boolean, _type: AgreementsType) => {
    setOpenedUserId(null)
  }

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
          {users.map((user) => (
            <TableRow key={user.id} className={s.row}>
              <TableDataCell className={s.td}>
                <div className={s.userIdCell}>
                  <div className={s.iconWrapper}>{user.isBanned && <BlockIcon size={20} />}</div>
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
                <button className={s.moreButton} onClick={() => setOpenedUserId(user.id)}>
                  <MoreHorizontalOutlineIcon size={20} />
                </button>
                {openedUserId === user.id && (
                  <PopUpSettingUser
                    modalHandler={modalHandler}
                    userId={user.id}
                    handleChangeModalAction={() => handleChangeModal(null)}
                    isOpen={openedUserId === user.id}
                    handleOpenAgreementModalAction={handleOpenAgreementModal}
                    userBan={user.isBanned ?? null}
                  />
                )}
              </TableDataCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
