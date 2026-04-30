'use client'

import { useCallback, useMemo } from 'react'
import { useQuery } from '@apollo/client/react'

import { GET_POSTS } from '@/features/users/api/users-queries'
import type { Post, PostsListInput, PostsListOutput } from '@/features/users/model/types/types'

const POSTS_LIMIT = 12

type UsePostsParams = {
  search: string
}

function isSamePost(post: Post, candidate: Post) {
  return post.id === candidate.id
}

export function usePosts({ search }: UsePostsParams) {
  const input = useMemo<PostsListInput>(
    () => ({
      limit: POSTS_LIMIT,
      ...(search.trim() && { search: search.trim() }),
    }),
    [search]
  )

  const { data, loading, error, fetchMore, networkStatus } = useQuery<{ posts: PostsListOutput }>(GET_POSTS, {
    notifyOnNetworkStatusChange: true,
    variables: { input },
  })

  const posts = data?.posts.items ?? []
  const hasMore = data?.posts.hasMore ?? false
  const nextCursor = data?.posts.nextCursor ?? null
  const isFetchingMore = networkStatus === 3

  const loadMore = useCallback(() => {
    if (!hasMore || !nextCursor || loading || isFetchingMore) {
      return
    }

    void fetchMore({
      variables: {
        input: {
          ...input,
          cursor: nextCursor,
        },
      },
      updateQuery: (previous, { fetchMoreResult }) => {
        if (!fetchMoreResult?.posts) {
          return previous
        }

        const previousItems = previous.posts.items
        const nextItems = fetchMoreResult.posts.items.filter(
          (post) => !previousItems.some((previousPost) => isSamePost(previousPost, post))
        )

        return {
          posts: {
            ...fetchMoreResult.posts,
            items: [...previousItems, ...nextItems],
          },
        }
      },
    })
  }, [fetchMore, hasMore, input, isFetchingMore, loading, nextCursor])

  return {
    error,
    hasMore,
    isFetchingMore,
    loadMore,
    loading,
    posts,
  }
}
