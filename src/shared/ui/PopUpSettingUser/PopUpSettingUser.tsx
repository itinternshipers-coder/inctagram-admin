'use client'

import s from './PopUpSettingUser.module.scss'
import { useChangeModal } from '@/shared/lib'
import { useRouter } from 'next/navigation'
import BlockIcon from '@/shared/icons/BlockIcon'
import MoreHorizontalOutlineIcon from '@/shared/icons/MoreHorizontalOutlineIcon'
import UnBanIcon from '@/shared/icons/UnBanIcon'
import DeleteIcon from '@/shared/icons/DeleteIcon'

export type AgreementsType = 'ban' | 'delete' | 'unban'
type Props = {
  userId: string
  handleChangeModalAction: (value: boolean) => void
  isOpen: boolean
  handleOpenAgreementModalAction: (value: boolean, type: AgreementsType) => void
  modalHandler: (value: boolean) => void
  userBan: boolean | null
}

export const PopUpSettingUser = ({
  handleChangeModalAction,
  userId,
  isOpen,
  handleOpenAgreementModalAction,
  userBan,
  modalHandler,
}: Props) => {
  const wrapperRef = useChangeModal({ isOpen, handleChangeModalAction: handleChangeModalAction })
  const router = useRouter()

  return (
    <div className={s.modalSetting} ref={wrapperRef}>
      <button className={s.modalSettingBtn} onClick={() => modalHandler(true)}>
        <DeleteIcon />
        Delete User
      </button>
      {userBan ? (
        <button className={s.modalSettingBtn} onClick={() => handleOpenAgreementModalAction(true, 'unban')}>
          <UnBanIcon />
          Un-ban User
        </button>
      ) : (
        <button className={s.modalSettingBtn} onClick={() => handleOpenAgreementModalAction(true, 'ban')}>
          <BlockIcon />
          Ban in the system
        </button>
      )}
      <button
        className={s.modalSettingBtn}
        onClick={() => {
          router.replace(`/more-information?userId=${userId}`)
        }}
      >
        <MoreHorizontalOutlineIcon />
        More Information
      </button>
    </div>
  )
}
