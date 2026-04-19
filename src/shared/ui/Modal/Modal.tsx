import type { ReactNode, MouseEvent } from 'react'
import s from './Modal.module.scss'
import { Portal } from '@/shared/ui/Portal/Portal'
import CloseBtnIcon from '@/shared/icons/CloseBtnIcon'

type Props = {
  isOpen: boolean
  title: string
  children: ReactNode
  onClick: () => void
}

export const Modal = ({ title, children, onClick, isOpen }: Props) => {
  if (!isOpen) return null

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }
  return (
    <Portal>
      <div className={s.overlay} onClick={onClick}>
        <div className={s.modal} onClick={handleContentClick}>
          <div className={s.modalTop}>
            <h3 className={s.modalTitle}>{title}</h3>
            <button className={s.modalCloseBtn} onClick={onClick}>
              <CloseBtnIcon className={s.closeBtnIcon} />
            </button>
          </div>

          <div className={s.modalContent}>{children}</div>
        </div>
      </div>
    </Portal>
  )
}
