'use client'

import { useState } from 'react'

import { useUserMutations } from '@/features/users/api/use-user-mutations'
import type { Post } from '@/features/users/model/types/types'
import BlockIcon from '@/shared/icons/BlockIcon'
import { Typography } from '@/shared/ui/Typography/Typography'
import { Modal } from '@/shared/ui/Modal/Modal'
import { getInitials, hasImageUrl } from './PostCard.helpers'
import s from './PostCard.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { formatTimeAgo } from '@/shared/helpers/formatTimeAgo'

type Props = {
  post: Post
}

export function PostCard({ post }: Props) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isBanModalOpen, setIsBanModalOpen] = useState(false)

  const { banUserFromPost, isLoading } = useUserMutations()

  const photos = [...post.photos].filter((photo) => hasImageUrl(photo.url)).sort((a, b) => a.order - b.order)

  const activePhoto = photos[activePhotoIndex]
  const avatarUrl = post.avatarUrl?.trim()
  const hasPhotos = photos.length > 0
  const hasManyPhotos = photos.length > 1
  const shouldClamp = post.description.length > 110

  const handlePreviousPhoto = () => {
    setActivePhotoIndex((current) => (current === 0 ? photos.length - 1 : current - 1))
  }

  const handleNextPhoto = () => {
    setActivePhotoIndex((current) => (current === photos.length - 1 ? 0 : current + 1))
  }

  const handleBanConfirm = async (payload?: { reason?: string; customReason?: string }) => {
    const reason =
      payload?.reason === 'another_reason' && payload.customReason
        ? payload.customReason
        : payload?.reason || 'bad_behavior'

    await banUserFromPost({ postId: post.id, reason, username: post.username })
    setIsBanModalOpen(false)
  }

  return (
    <>
      <article className={`${s.card} ${isExpanded ? s.cardExpanded : ''}`}>
        <div className={s.photoFrame}>
          {hasPhotos ? (
            <img className={s.photo} src={activePhoto.url} alt={`Post by ${post.username}`} loading="lazy" />
          ) : (
            <Typography className={s.photoFallback} variant="regular_text_14">
              No photo
            </Typography>
          )}

          {hasManyPhotos && (
            <>
              <Button
                className={`${s.photoButton} ${s.photoButtonLeft}`}
                type="button"
                variant="secondary"
                onClick={handlePreviousPhoto}
                aria-label="Previous photo"
              >
                {'<'}
              </Button>

              <Button
                className={`${s.photoButton} ${s.photoButtonRight}`}
                type="button"
                variant="secondary"
                onClick={handleNextPhoto}
                aria-label="Next photo"
              >
                {'>'}
              </Button>
              <div className={s.dots} aria-hidden="true">
                {photos.map((photo, index) => (
                  <span key={photo.id} className={`${s.dot} ${index === activePhotoIndex ? s.dotActive : ''}`} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className={s.author}>
          {avatarUrl ? (
            <img className={s.avatar} src={avatarUrl} alt="" loading="lazy" />
          ) : (
            <span className={s.avatarFallback}>{getInitials(post.username)}</span>
          )}

          <div className={s.authorInfo}>
            <Typography className={s.username} variant="bold_text_14" as="span">
              {post.username}
            </Typography>

            <Button
              className={s.banButton}
              type="button"
              variant="tertiary"
              onClick={() => setIsBanModalOpen(true)}
              aria-label={`Ban user ${post.username}`}
            >
              <BlockIcon size={20} />
            </Button>
          </div>
        </div>

        <Typography className={s.date} variant="small_text">
          {formatTimeAgo(post.createdAt)}
        </Typography>

        <Typography className={`${s.description} ${isExpanded ? s.descriptionExpanded : ''}`} variant="regular_text_14">
          {isExpanded || !shouldClamp ? post.description : `${post.description.slice(0, 110).trim()}...`}

          {shouldClamp && (
            <Button
              className={s.showMoreButton}
              type="button"
              variant="link"
              onClick={() => setIsExpanded((value) => !value)}
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </Button>
          )}
        </Typography>
      </article>

      <Modal
        open={isBanModalOpen}
        onOpenChange={setIsBanModalOpen}
        type="ban"
        userName={post.username}
        onConfirm={handleBanConfirm}
        loading={isLoading}
      />
    </>
  )
}
