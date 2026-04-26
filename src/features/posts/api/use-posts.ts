'use client'

import { useCallback, useEffect, useMemo } from 'react'
import { useQuery } from '@apollo/client/react'

import { GET_POSTS, POST_CREATED } from '@/features/users/api/users-queries'
import type { Post, PostsListInput, PostsListOutput } from '@/features/users/model/types/types'

const POSTS_LIMIT = 12

type PostCreatedSubscription = {
  postCreated: Post
}

type UsePostsParams = {
  search: string
}

function isSamePost(post: Post, candidate: Post) {
  return post.id === candidate.id
}

function matchesSearch(post: Post, search: string) {
  return post.username.toLowerCase().includes(search.trim().toLowerCase())
}

export function usePosts({ search }: UsePostsParams) {
  const input = useMemo<PostsListInput>(
    () => ({
      limit: POSTS_LIMIT,
      ...(search.trim() && { search: search.trim() }),
    }),
    [search]
  )

  const { data, loading, error, fetchMore, networkStatus, subscribeToMore } = useQuery<{ posts: PostsListOutput }>(
    GET_POSTS,
    {
      notifyOnNetworkStatusChange: true,
      variables: { input },
    }
  )

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

  useEffect(() => {
    const unsubscribe = subscribeToMore<PostCreatedSubscription>({
      document: POST_CREATED,
      updateQuery: (previous, { subscriptionData }) => {
        const post = subscriptionData.data?.postCreated as Post | undefined
        const previousPosts = previous.posts as PostsListOutput | undefined

        if (!post || !previousPosts || !matchesSearch(post, search)) {
          return previous as { posts: PostsListOutput }
        }

        if (previousPosts.items.some((item) => isSamePost(item, post))) {
          return previous as { posts: PostsListOutput }
        }

        return {
          posts: {
            ...previousPosts,
            items: [post, ...previousPosts.items],
          },
        }
      },
    })

    return () => unsubscribe()
  }, [search, subscribeToMore])

  return {
    error,
    hasMore,
    isFetchingMore,
    loadMore,
    loading,
    posts,
  }
}
