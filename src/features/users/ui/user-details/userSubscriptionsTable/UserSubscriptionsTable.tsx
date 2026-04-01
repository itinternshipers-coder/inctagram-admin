'use client'

import type { FollowRow } from '@/features/users/model/user-details-mock-data'
import { Pagination } from '@/features/users/ui/Pagination'
import s from './UserSubscriptionsTable.module.scss'

type PageState = {
  currentPage: number
  pageSize: number
}

type UserSubscriptionsTableProps = {
  rows: FollowRow[]
  userId: string
  pageState: PageState
  totalCount: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

function getTotalPages(total: number, pageSize: number) {
  return Math.max(1, Math.ceil(total / pageSize))
}

export function UserSubscriptionsTable({
  rows,
  userId,
  pageState,
  totalCount,
  onPageChange,
  onPageSizeChange,
}: UserSubscriptionsTableProps) {
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
                <td>{userId}</td>
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
