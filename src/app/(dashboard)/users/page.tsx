'use client'

import { useState } from 'react'
import { Option, SelectBox } from '@/shared/ui/SelectBox/SelectBox'
import { Input } from '@/shared/ui/Input/Input'
import { UsersTable } from '@/features/users/ui/UsersTable'
import { Pagination } from '@/features/users/ui/Pagination'
import { useUsers } from '@/features/users/api/use-users'
import { UserFilter, SortDirection } from '@/features/users/model/types/types'
import s from './users.module.scss'
import { Modal } from '@/shared/ui/Modal/Modal'

const FILTER_OPTIONS: Option[] = [
  { value: 'all', label: 'Not selected' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'not-blocked', label: 'Not Blocked' },
]

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<UserFilter>('all')
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [pageSize, setPageSize] = useState(8)

  const { users, totalPages, loading } = useUsers({
    page: currentPage,
    pageSize,
    search,
    filter,
    sortDirection,
  })

  const handleSort = () => {
    setSortDirection((prev) => (prev === null ? 'asc' : prev === 'asc' ? 'desc' : null))
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

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

      <UsersTable users={users} isLoading={loading} sortDirectionHandlerAction={handleSort} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
      <Modal open={openModal} onOpenChange={() => {}} type={'delete'} userName={'aaa'} onConfirm={() => {}} />
    </div>
  )
}
