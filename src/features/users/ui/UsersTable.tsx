'use client'

import { User } from '../model/types/types'
import s from './UsersTable.module.scss'
import { Typography } from '@/shared/ui/Typography/Typography'
import BlockIcon from '@/shared/icons/BlockIcon'
import MoreHorizontalOutlineIcon from '@/shared/icons/MoreHorizontalOutlineIcon'
import { Table, TableBody, TableDataCell, TableHead, TableHeaderCell, TableRow } from '@/shared/ui'
import { useState } from 'react'
import { PopUpSettingUser } from '@/shared/ui/PopUpSettingUser/PopUpSettingUser'
import { DirectionType, SortButton, SortBy } from '@/shared/ui/SortButton/SortButton'
import Loader from '@/shared/ui/Loader/Loader'
import { Modal } from '@/shared/ui/Modal/Modal'
import { formatDate } from '@/features/users/model/lib/format-date'

type UsersTableProps = {
  users: User[]
  isLoading: boolean
  sortDirectionHandlerAction: (direction: DirectionType, type: SortBy) => void
}

type ModalData = {
  open: boolean
  type: 'delete' | 'ban' | 'unban'
  userName: string
  userId: string
}

export function UsersTable({ users, isLoading, sortDirectionHandlerAction }: UsersTableProps) {
  const [openedUserId, setOpenedUserId] = useState<string | null>(null)
  const [modal, setModal] = useState<ModalData>({
    open: false,
    type: 'delete',
    userName: '',
    userId: '',
  })

  const closeModal = () => {
    setModal((prev) => ({ ...prev, open: false }))
  }

  const handleConfirm = async (payload?: { reason?: string; customReason?: string }) => {
    const { type, userId, userName } = modal
    console.log('Confirm action:', type, userId, userName, payload)
    closeModal()
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
          {users.map((user) => {
            const handleDelete = () => {
              setModal({ open: true, type: 'delete', userName: user.username, userId: user.id })
              setOpenedUserId(null)
            }

            const handleBanUnban = (banType: 'ban' | 'unban') => {
              setModal({ open: true, type: banType, userName: user.username, userId: user.id })
              setOpenedUserId(null)
            }

            return (
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
                      modalHandler={handleDelete}
                      userId={user.id}
                      handleChangeModalAction={() => setOpenedUserId(null)}
                      isOpen={openedUserId === user.id}
                      handleOpenAgreementModalAction={(_, type) => {
                        if (type === 'delete') {
                          handleDelete()
                        } else {
                          handleBanUnban(type as 'ban' | 'unban')
                        }
                      }}
                      userBan={user.isBanned ?? null}
                    />
                  )}
                </TableDataCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Modal
        open={modal.open}
        onOpenChange={closeModal}
        type={modal.type}
        userName={modal.userName}
        onConfirm={handleConfirm}
      />
    </div>
  )
}
