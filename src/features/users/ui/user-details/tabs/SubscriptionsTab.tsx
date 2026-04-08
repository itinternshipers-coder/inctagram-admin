import type { PaginationState, UserSubscriptionRow } from '@/features/users/model/types/types'
import { TabQueryState } from './TabQueryState'
import { UserSubscriptionsTable } from './subscriptions-table/UserSubscriptionsTable'

type Props = {
  emptyText: string
  error?: Error
  loading: boolean
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageState: PaginationState
  rows: UserSubscriptionRow[]
  sectionName: string
  totalCount: number
}

export function SubscriptionsTab({
  emptyText,
  error,
  loading,
  onPageChange,
  onPageSizeChange,
  pageState,
  rows,
  sectionName,
  totalCount,
}: Props) {
  return (
    <TabQueryState
      loading={loading}
      error={error}
      isEmpty={rows.length === 0}
      loadingText={`Loading ${sectionName.toLowerCase()}...`}
      errorText={`Failed to load ${sectionName.toLowerCase()}`}
      emptyText={emptyText}
    >
      <UserSubscriptionsTable
        rows={rows}
        pageState={pageState}
        totalCount={totalCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </TabQueryState>
  )
}
