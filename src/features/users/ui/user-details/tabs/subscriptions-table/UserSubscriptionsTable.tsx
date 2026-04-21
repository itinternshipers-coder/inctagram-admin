'use client'

import type { UserSubscriptionRow } from '@/features/users/model/types/types'
import type { PaginationState } from '@/features/users/model/types/types'
import { getTotalPages } from '@/features/users/model/lib/get-total-pages'
import { Pagination } from '@/features/users/ui/Pagination'

import s from './UserSubscriptionsTable.module.scss'

type Props = {
  rows: UserSubscriptionRow[]
  pageState: PaginationState
  totalCount: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export function UserSubscriptionsTable({ rows, pageState, totalCount, onPageChange, onPageSizeChange }: Props) {
  return (
    <div className={s.tableSection}>
      <div className={s.tableWrapper}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Profile link</th>
              <th>Username</th>
              <th>Subscription Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <span className={s.tableProfileLink}>{row.profileLink}</span>
                </td>
                <td>{row.username}</td>
                <td>{row.since}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={pageState.currentPage}
        totalPages={getTotalPages(totalCount, pageState.pageSize)}
        pageSize={pageState.pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  )
}
