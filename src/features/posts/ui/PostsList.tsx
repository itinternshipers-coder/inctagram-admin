'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { usePosts } from '@/features/posts/api/use-posts'
import type { Post } from '@/features/users/model/types/types'
import { Input } from '@/shared/ui/Input/Input'
import { Typography } from '@/shared/ui/Typography/Typography'
import s from './PostsList.module.scss'

const SEARCH_DELAY = 400
const LOAD_MORE_OFFSET = 520
const NEXT_LOAD_SCROLL_DELTA = 120

function getInitials(username: string) {
  return username.slice(0, 2).toUpperCase()
}

function hasImageUrl(value?: string | null) {
  return Boolean(value?.trim())
}

function formatPostDate(value: string) {
  const date = new Date(value)
  const diffInSeconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000))

  if (diffInSeconds < 60) {
    return 'just now'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)

  if (diffInHours < 24) {
    return `${diffInHours} h ago`
  }

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function PostCard({ post }: { post: Post }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
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

  return (
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
            <button className={`${s.photoButton} ${s.photoButtonLeft}`} type="button" onClick={handlePreviousPhoto}>
              {'<'}
            </button>
            <button className={`${s.photoButton} ${s.photoButtonRight}`} type="button" onClick={handleNextPhoto}>
              {'>'}
            </button>
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

        <Typography className={s.username} variant="bold_text_14" as="span">
          {post.username}
        </Typography>
      </div>

      <Typography className={s.date} variant="small_text">
        {formatPostDate(post.createdAt)}
      </Typography>

      <Typography className={`${s.description} ${isExpanded ? s.descriptionExpanded : ''}`} variant="regular_text_14">
        {isExpanded || !shouldClamp ? post.description : `${post.description.slice(0, 110).trim()}...`}
        {shouldClamp && (
          <button className={s.showMoreButton} type="button" onClick={() => setIsExpanded((value) => !value)}>
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </Typography>
    </article>
  )
}

export function PostsList() {
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const lastLoadScrollYRef = useRef(-NEXT_LOAD_SCROLL_DELTA)
  const { error, hasMore, isFetchingMore, loadMore, loading, posts } = usePosts({ search: debouncedSearch })

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(searchValue)
      lastLoadScrollYRef.current = -NEXT_LOAD_SCROLL_DELTA
    }, SEARCH_DELAY)

    return () => window.clearTimeout(timeoutId)
  }, [searchValue])

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || loading || isFetchingMore) {
        return
      }

      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const distanceToBottom = scrollHeight - viewportHeight - scrollTop
      const movedEnoughSinceLastLoad = scrollTop - lastLoadScrollYRef.current >= NEXT_LOAD_SCROLL_DELTA

      if (distanceToBottom <= LOAD_MORE_OFFSET && movedEnoughSinceLastLoad) {
        lastLoadScrollYRef.current = scrollTop
        loadMore()
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [hasMore, isFetchingMore, loadMore, loading])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const isInitialLoading = loading && posts.length === 0

  return (
    <section className={s.container}>
      <Input
        className={s.searchField}
        onChange={handleSearchChange}
        placeholder="Search"
        type="search"
        value={searchValue}
        wrapperClassName={s.search}
      />

      {error && (
        <Typography className={s.message} variant="regular_text_16" role="alert">
          Failed to load posts
        </Typography>
      )}

      {isInitialLoading && (
        <Typography className={s.message} variant="regular_text_16">
          Loading posts...
        </Typography>
      )}

      {!isInitialLoading && !error && posts.length === 0 && (
        <Typography className={s.message} variant="regular_text_16">
          No posts found
        </Typography>
      )}

      {posts.length > 0 && (
        <div className={s.grid}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {isFetchingMore && (
        <Typography className={s.message} variant="regular_text_14">
          Loading more...
        </Typography>
      )}

      {!hasMore && posts.length > 0 && (
        <Typography className={s.message} variant="small_text">
          All posts loaded
        </Typography>
      )}
    </section>
  )
}
