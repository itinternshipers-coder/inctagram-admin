import { Pagination } from '@/features/users/ui/Pagination'
import type { PaginationState, PaymentRow } from '@/features/users/model/types/types'
import { TabQueryState } from './TabQueryState'
import s from '../UserDetailsView.module.scss'

type Props = {
  error?: Error
  loading: boolean
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageState: PaginationState
  rows: PaymentRow[]
  totalPages: number
}

export function PaymentsTab({ error, loading, onPageChange, onPageSizeChange, pageState, rows, totalPages }: Props) {
  return (
    <TabQueryState
      loading={loading}
      error={error}
      isEmpty={rows.length === 0}
      loadingText="Loading payments..."
      errorText="Failed to load payments"
      emptyText="No payments"
    >
      <div className={s.tableSection}>
        <>
          <div className={s.tableWrapper}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Date of Payment</th>
                  <th>End date of subscription</th>
                  <th>Amount, $</th>
                  <th>Subscription Type</th>
                  <th>Payment Type</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.paymentDate}</td>
                    <td>{payment.endDate}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.subscriptionType}</td>
                    <td>{payment.paymentType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={pageState.currentPage}
            totalPages={totalPages}
            pageSize={pageState.pageSize}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </>
      </div>
    </TabQueryState>
  )
}
