import { ComponentPropsWithoutRef, forwardRef } from 'react'
import s from './TableHeaderCell.module.scss'

export const TableHeaderCell = forwardRef<HTMLTableHeaderCellElement, ComponentPropsWithoutRef<'th'>>(
  ({ className, ...rest }, ref) => {
    const computedStyles = s.tableHeaderCell + (className ? ` ${className}` : '')
    return <th ref={ref} {...rest} className={computedStyles}></th>
  }
)

TableHeaderCell.displayName = 'TableHeaderCell'
