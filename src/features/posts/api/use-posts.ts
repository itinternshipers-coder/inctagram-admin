'use client'

import { useCallback, useMemo } from 'react'
import { useApolloClient } from '@apollo/client/react'
import { useQuery } from '@apollo/client/react'
import { useSubscription } from '@apollo/client/react'

import { POST_CREATED_SUBSCRIPTION } from '@/features/posts/api/posts-queries'
import { GET_POSTS } from '@/features/users/api/users-queries'
import type { Post, PostsListInput, PostsListOutput } from '@/features/users/model/types/types'
import { GetUsersDocument } from '@/views/UsersList/api/userList.generated'

const POSTS_LIMIT = 12
const BANNED_USERS_PAGE_SIZE = 1000

type UsePostsParams = {
  search: string
}

function isSamePost(post: Post, candidate: Post) {
  return post.id === candidate.id
}

export function usePosts({ search }: UsePostsParams) {
  const apolloClient = useApolloClient()
  const normalizedSearch = search.trim().toLowerCase()
  const input = useMemo<PostsListInput>(
    () => ({
      limit: POSTS_LIMIT,
      ...(normalizedSearch && { search: search.trim() }),
    }),
    [normalizedSearch, search]
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

  useSubscription<{ postCreated: Post }>(POST_CREATED_SUBSCRIPTION, {
    onData: ({ data: subscriptionData }) => {
      const newPost = subscriptionData.data?.postCreated

      if (!newPost || bannedUsernames.has(newPost.username)) {
        return
      }

      if (
        normalizedSearch &&
        !newPost.username.toLowerCase().includes(normalizedSearch) &&
        !newPost.description.toLowerCase().includes(normalizedSearch)
      ) {
        return
      }

      apolloClient.cache.updateQuery<{ posts: PostsListOutput }>(
        {
          query: GET_POSTS,
          variables: { input },
        },
        (previous) => {
          if (!previous?.posts) {
            return previous
          }

          if (previous.posts.items.some((previousPost) => isSamePost(previousPost, newPost))) {
            return previous
          }

          return {
            posts: {
              ...previous.posts,
              items: [newPost, ...previous.posts.items],
            },
          }
        }
      )
    },
  })

  const posts = useMemo(
    () => (data?.posts.items ?? []).filter((post) => !bannedUsernames.has(post.username)),
    [bannedUsernames, data?.posts.items]
  )
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
