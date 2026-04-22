'use client'

import { useState } from 'react'

import { Input } from '@/shared/ui/Input/Input'
import { Pagination } from '@/features/users/ui/Pagination'
import { PaymentsTable } from '@/features/payments/ui/PaymentsTable'
import { usePayments } from '@/features/payments/api/use-payments'
import type { PaymentSortField, PaymentSortState } from '@/features/payments/model/types/types'
import type { Option } from '@/shared/ui/SelectBox/SelectBox'
import s from './payments.module.scss'

const DEFAULT_PAGE_SIZE = 6

const PAGE_SIZE_OPTIONS: Option[] = [
  { value: '6', label: '6' },
  { value: '12', label: '12' },
  { value: '24', label: '24' },
  { value: '48', label: '48' },
]

function nextSortState(current: PaymentSortState | null, field: PaymentSortField): PaymentSortState | null {
  if (current?.field !== field) return { field, direction: 'asc' }
  if (current.direction === 'asc') return { field, direction: 'desc' }
  return null
}

export default function PaymentsPage() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<PaymentSortState | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

  const { payments, totalPages } = usePayments({
    page: currentPage,
    pageSize,
    search,
    sort,
  })

  const handleSort = (field: PaymentSortField) => {
    setSort((prev) => nextSortState(prev, field))
    setCurrentPage(1)
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
          placeholder="Search by username"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
          wrapperClassName={s.searchInput}
        />
      </div>

      <PaymentsTable payments={payments} sort={sort} onSort={handleSort} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
      />
    </div>
  )
}
