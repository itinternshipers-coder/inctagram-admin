'use client'

import { useCallback, useEffect, useMemo } from 'react'
import { useApolloClient } from '@apollo/client/react'
import { useQuery } from '@apollo/client/react'

import { GET_POSTS } from '@/features/users/api/users-queries'
import type { Post, PostsListInput, PostsListOutput } from '@/features/users/model/types/types'
import { GetUsersDocument } from '@/views/UsersList/api/userList.generated'

const POSTS_LIMIT = 12
const BANNED_USERS_PAGE_SIZE = 1000
const POSTS_POLLING_INTERVAL = 15000

type UsePostsParams = {
  search: string
}

function isSamePost(post: Post, candidate: Post) {
  return post.id === candidate.id
}

export function usePosts({ search }: UsePostsParams) {
  const apolloClient = useApolloClient()
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

  const { data: bannedUsersData } = useQuery(GetUsersDocument, {
    variables: {
      page: 1,
      pageSize: BANNED_USERS_PAGE_SIZE,
      filterBanned: 'banned',
    },
  })

  const bannedUsernames = useMemo(
    () => new Set((bannedUsersData?.users.items ?? []).filter((user) => user.isBanned).map((user) => user.username)),
    [bannedUsersData]
  )

  const posts = useMemo(
    () => (data?.posts.items ?? []).filter((post) => !bannedUsernames.has(post.username)),
    [bannedUsernames, data?.posts.items]
  )
  const hasMore = data?.posts.hasMore ?? false
  const nextCursor = data?.posts.nextCursor ?? null
  const isFetchingMore = networkStatus === 3

  useEffect(() => {
    const pollPosts = async () => {
      try {
        const latestPostsResult = await apolloClient.query<{ posts: PostsListOutput }>({
          query: GET_POSTS,
          variables: { input },
          fetchPolicy: 'network-only',
        })

        if (!latestPostsResult.data?.posts?.items) {
          return
        }

        const latestPostsData = latestPostsResult.data.posts
        const latestPosts = latestPostsData.items as Post[]

        apolloClient.cache.updateQuery<{ posts: PostsListOutput }>(
          {
            query: GET_POSTS,
            variables: { input },
          },
          (previous) => {
            if (!previous?.posts?.items) {
              return latestPostsResult.data
            }

            const previousItems = previous.posts.items as Post[]
            const nextItems = latestPosts.filter(
              (post) => !previousItems.some((previousPost) => isSamePost(previousPost, post))
            )

            if (nextItems.length === 0) {
              return previous
            }

            return {
              posts: {
                hasMore: previous.posts.hasMore ?? latestPostsData.hasMore,
                items: [...nextItems, ...previousItems],
                nextCursor: previous.posts.nextCursor ?? latestPostsData.nextCursor,
              },
            }
          }
        )
      } catch {
        // Ignore polling errors and keep the current list visible.
      }
    }

    const intervalId = window.setInterval(() => {
      void pollPosts()
    }, POSTS_POLLING_INTERVAL)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [apolloClient, input])

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
