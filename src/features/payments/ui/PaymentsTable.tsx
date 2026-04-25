'use client'

import Image from 'next/image'

import { Typography } from '@/shared/ui/Typography/Typography'
import PersonIcon from '@/shared/icons/PersonIcon'
import type { Payment, PaymentSortField, PaymentSortState } from '../model/types/types'
import s from './PaymentsTable.module.scss'

const AVATAR_SIZE = 36

type PaymentsTableProps = {
  payments: Payment[]
  sort: PaymentSortState | null
  onSort: (field: PaymentSortField) => void
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function sortArrow(sort: PaymentSortState | null, field: PaymentSortField) {
  if (sort?.field !== field || !sort.direction) return ''
  return sort.direction === 'asc' ? ' ↑' : ' ↓'
}

type Column = { field: PaymentSortField | null; label: string }

const COLUMNS: Column[] = [
  { field: 'username', label: 'Username' },
  { field: 'date', label: 'Date added' },
  { field: 'amount', label: 'Amount, $' },
  { field: null, label: 'Subscription Type' },
  { field: 'paymentMethod', label: 'Payment Method' },
]

export function PaymentsTable({ payments, sort, onSort }: PaymentsTableProps) {
  return (
    <div className={s.tableWrapper}>
      <table className={s.table}>
        <thead>
          <tr>
            {COLUMNS.map((col) => {
              const sortable = col.field !== null
              return (
                <th
                  key={col.label}
                  className={`${s.th} ${sortable ? s.sortable : ''}`}
                  onClick={sortable ? () => onSort(col.field as PaymentSortField) : undefined}
                >
                  <Typography variant="bold_text_14" as="span">
                    {col.label}
                    {sortable && sortArrow(sort, col.field as PaymentSortField)}
                  </Typography>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className={s.row}>
              <td className={s.td}>
                <div className={s.userCell}>
                  <div className={s.avatar}>
                    {p.avatarUrl ? (
                      <Image
                        src={p.avatarUrl}
                        alt={p.username}
                        width={AVATAR_SIZE}
                        height={AVATAR_SIZE}
                        className={s.avatarImage}
                        unoptimized
                      />
                    ) : (
                      <PersonIcon size={20} />
                    )}
                  </div>
                  <Typography variant="regular_text_14" as="span">
                    {p.username}
                  </Typography>
                </div>
              </td>
              <td className={s.td}>
                <Typography variant="regular_text_14" as="span">
                  {formatDate(p.date)}
                </Typography>
              </td>
              <td className={s.td}>
                <Typography variant="regular_text_14" as="span">
                  ${p.amount}
                </Typography>
              </td>
              <td className={s.td}>
                <Typography variant="regular_text_14" as="span">
                  {p.subscription}
                </Typography>
              </td>
              <td className={s.td}>
                <Typography variant="regular_text_14" as="span">
                  {p.paymentMethod}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
