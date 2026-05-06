'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { usePosts } from '@/features/posts/api/use-posts'
import { Input } from '@/shared/ui/Input/Input'
import { Typography } from '@/shared/ui/Typography/Typography'
import { PostCard } from '../postCard/PostCard'

import s from './PostsList.module.scss'

const SEARCH_DELAY = 400
const LOAD_MORE_OFFSET = 520

export function PostsList() {
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null)

  const { error, hasMore, isFetchingMore, loadMore, loading, posts } = usePosts({
    search: debouncedSearch,
  })

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(searchValue)
    }, SEARCH_DELAY)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [searchValue])

  useEffect(() => {
    const target = loadMoreTriggerRef.current

    if (!target || !hasMore || loading || isFetchingMore || error) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        loadMore()
      },
      {
        root: null,
        rootMargin: `${LOAD_MORE_OFFSET}px`,
        threshold: 0,
      }
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [error, hasMore, isFetchingMore, loadMore, loading])

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

      {posts.length > 0 && hasMore && !error && <div ref={loadMoreTriggerRef} className={s.loadMoreTrigger} />}

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
