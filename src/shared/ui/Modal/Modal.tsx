'use client'

import * as Dialog from '@radix-ui/react-dialog'
import React, { useMemo, useState } from 'react'
import clsx from 'clsx'

import CloseOutlineIcon from '@/shared/icons/CloseOutlineIcon'
import { SelectBox } from '@/shared/ui/SelectBox/SelectBox'

import s from './Modal.module.scss'

type ModalType = 'delete' | 'ban' | 'unban'
type BanReason = 'bad_behavior' | 'advertising_placement' | 'another_reason'

type ConfirmPayload = {
  reason?: BanReason
  customReason?: string
}

type Props = {
  open: boolean
  onOpenChange: (value: boolean) => void
  type: ModalType
  userName: string
  loading?: boolean
  onConfirm: (payload?: ConfirmPayload) => Promise<void> | void
}

const DEFAULT_REASON: BanReason = 'bad_behavior'

const BAN_REASONS: { value: BanReason; label: string }[] = [
  { value: 'bad_behavior', label: 'Bad behavior' },
  { value: 'advertising_placement', label: 'Advertising placement' },
  { value: 'another_reason', label: 'Another reason' },
]

export const Modal = ({ open, onOpenChange, type, userName, loading = false, onConfirm }: Props) => {
  const [reason, setReason] = useState<BanReason>(DEFAULT_REASON)
  const [customReason, setCustomReason] = useState('')

  const resetForm = () => {
    setReason(DEFAULT_REASON)
    setCustomReason('')
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm()
    }
    onOpenChange(nextOpen)
  }

  const config = useMemo(() => {
    switch (type) {
      case 'delete':
        return {
          title: 'Delete user',
          message: `Are you sure you want to delete this user ${userName}?`,
        }
      case 'ban':
        return {
          title: 'Ban user',
          message: `Are you sure you want to ban this user, ${userName}?`,
        }
      case 'unban':
        return {
          title: 'Un-Ban user',
          message: `Are you sure you want to un-ban ${userName}?`,
        }
    }
  }, [type, userName])

  const isConfirmDisabled =
    loading || (type === 'ban' && reason === 'another_reason' && customReason.trim().length === 0)

  const handleConfirm = async () => {
    try {
      if (type === 'ban') {
        await onConfirm({
          reason,
          customReason: reason === 'another_reason' ? customReason.trim() : undefined,
        })
      } else {
        await onConfirm()
      }

      resetForm()
      onOpenChange(false)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />

        <Dialog.Content className={s.content}>
          <div className={s.header}>
            <Dialog.Title className={s.title}>{config.title}</Dialog.Title>
            <Dialog.Close asChild>
              <button type="button" className={s.closeBtn} aria-label="Close">
                <CloseOutlineIcon />
              </button>
            </Dialog.Close>
          </div>

          <div className={s.messageContent}>
            <Dialog.Description className={s.message}>{config.message}</Dialog.Description>

            {type === 'ban' && (
              <div className={s.formBlock}>
                <div className={s.selectLabel}>Reason for ban</div>

                <SelectBox
                  options={BAN_REASONS}
                  value={reason}
                  onValueChange={(value) => setReason(value as BanReason)}
                  placeholder="Reason for ban"
                  height="36px"
                />

                {reason === 'another_reason' && (
                  <textarea
                    className={s.textarea}
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Enter reason"
                  />
                )}
              </div>
            )}
          </div>

          <div className={s.actions}>
            <Dialog.Close asChild>
              <button type="button" className={clsx(s.btn, s.secondary)} disabled={loading}>
                No
              </button>
            </Dialog.Close>

            <button
              type="button"
              className={clsx(s.btn, s.primary)}
              onClick={handleConfirm}
              disabled={isConfirmDisabled}
            >
              Yes
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
