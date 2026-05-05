'use client'

import { useState, useCallback } from 'react'
import { Option, SelectBox } from '@/shared/ui/SelectBox/SelectBox'
import { Input } from '@/shared/ui/Input/Input'
import { UsersTable } from '@/features/users/ui/UsersTable'
import { Pagination } from '@/features/users/ui/Pagination'
import { useUsers } from '@/features/users/api/use-users'
import { UserFilter, SortDirection } from '@/features/users/model/types/types'
import { Modal } from '@/shared/ui/Modal/Modal'
import s from './users.module.scss'
import { useUserMutations } from '@/features/users/api/use-user-mutations'

const FILTER_OPTIONS: Option[] = [
  { value: 'all', label: 'Not selected' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'not-blocked', label: 'Not Blocked' },
]

type ModalData = {
  open: boolean
  type: 'delete' | 'ban' | 'unban'
  userName: string
  userId: string
}

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<UserFilter>('all')
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { users, totalPages, loading } = useUsers({
    page: currentPage,
    pageSize,
    search,
    filter,
    sortDirection,
  })

  const { deleteUser, banUser, unbanUser, isLoading: mutationLoading } = useUserMutations()

  const [modal, setModal] = useState<ModalData>({
    open: false,
    type: 'delete',
    userName: '',
    userId: '',
  })

  const closeModal = useCallback(() => {
    if (!mutationLoading) {
      setModal((prev) => ({ ...prev, open: false }))
    }
  }, [mutationLoading])

  const handleConfirm = useCallback(
    async (payload?: { reason?: string; customReason?: string }) => {
      const { type, userId } = modal
      try {
        if (type === 'delete') {
          await deleteUser(userId)
        } else if (type === 'ban') {
          const reason =
            payload?.reason === 'another_reason' && payload?.customReason
              ? payload.customReason
              : payload?.reason || 'bad_behavior'
          await banUser({ id: userId, reason })
        } else if (type === 'unban') {
          await unbanUser(userId)
        }
        closeModal()
      } catch (error) {
        console.error('Mutation error:', error)
        // Здесь можно добавить уведомление пользователю
      }
    },
    [modal, deleteUser, banUser, unbanUser, closeModal]
  )

  const handleSort = () => {
    setSortDirection((prev) => (prev === null ? 'asc' : prev === 'asc' ? 'desc' : null))
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const handleActionSelect = useCallback((userId: string, type: 'delete' | 'ban' | 'unban', userName: string) => {
    setModal({ open: true, type, userName, userId })
  }, [])

  return (
    <div className={s.container}>
      <div className={s.toolbar}>
        <Input
          type="search"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
          wrapperClassName={s.searchInput}
        />
        <SelectBox
          options={FILTER_OPTIONS}
          value={filter}
          onValueChange={(v) => {
            setFilter(v as UserFilter)
            setCurrentPage(1)
          }}
          width="200px"
        />
      </div>

      <UsersTable
        users={users}
        isLoading={loading}
        sortDirectionHandlerAction={handleSort}
        onActionSelect={handleActionSelect}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />

      <Modal
        open={modal.open}
        onOpenChange={closeModal}
        type={modal.type}
        userName={modal.userName}
        onConfirm={handleConfirm}
        loading={mutationLoading}
      />
    </div>
  )
}
