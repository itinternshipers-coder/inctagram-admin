'use client'

import type { ApolloCache } from '@apollo/client'
import { useApolloClient, useMutation } from '@apollo/client/react'
import { GET_POSTS } from '@/features/users/api/users-queries'
import {
  BanUserDocument,
  BanUserFromPostDocument,
  DeleteUserDocument,
  UnbanUserDocument,
} from '@/views/UsersList/api/userMutations.generated'
import { GetUsersDocument } from '@/views/UsersList/api/userList.generated'

type BanInput = {
  id: string
  reason: string
}

type BanFromPostInput = {
  postId: string
  reason: string
  username: string
}

function removePostsByUsernameFromCache(cache: ApolloCache, username: string) {
  cache.modify({
    fields: {
      posts(existingPosts) {
        if (!existingPosts || typeof existingPosts !== 'object' || !('items' in existingPosts)) {
          return existingPosts
        }

        const typedPosts = existingPosts as { items: { id: string; username: string }[] }

        return {
          ...typedPosts,
          items: typedPosts.items.filter((post) => post.username !== username),
        }
      },
    },
  })
}

export function useUserMutations() {
  const apolloClient = useApolloClient()

  const [deleteMutation, { loading: deleteLoading }] = useMutation(DeleteUserDocument)
  const [banMutation, { loading: banLoading }] = useMutation(BanUserDocument)
  const [banFromPostMutation, { loading: banFromPostLoading }] = useMutation(BanUserFromPostDocument)
  const [unbanMutation, { loading: unbanLoading }] = useMutation(UnbanUserDocument)

  const isLoading = deleteLoading || banLoading || banFromPostLoading || unbanLoading

  const deleteUser = async (id: string) => {
    await deleteMutation({ variables: { id } })
    await apolloClient.refetchQueries({ include: [GetUsersDocument] })
  }

  const banUser = async (input: BanInput) => {
    await banMutation({ variables: { input } })
    await apolloClient.refetchQueries({ include: [GetUsersDocument] })
  }

  const banUserFromPost = async (input: BanFromPostInput) => {
    await banFromPostMutation({
      variables: { input: { postId: input.postId, reason: input.reason } },
      update: (cache) => {
        removePostsByUsernameFromCache(cache, input.username)
      },
    })

    await apolloClient.refetchQueries({ include: [GET_POSTS, GetUsersDocument] })
  }

  const unbanUser = async (id: string) => {
    await unbanMutation({ variables: { id } })
    await apolloClient.refetchQueries({ include: [GetUsersDocument] })
  }

  return {
    deleteUser,
    banUser,
    banUserFromPost,
    unbanUser,
    isLoading,
  }
}
