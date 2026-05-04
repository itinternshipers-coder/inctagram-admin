'use client'

import { useApolloClient, useMutation } from '@apollo/client/react'
import { BanUserDocument, DeleteUserDocument, UnbanUserDocument } from '@/views/UsersList/api/userMutations.generated'
import { GetUsersDocument } from '@/views/UsersList/api/userList.generated'

type BanInput = {
  id: string
  reason: string
}

export function useUserMutations() {
  const apolloClient = useApolloClient()

  const [deleteMutation, { loading: deleteLoading }] = useMutation(DeleteUserDocument)
  const [banMutation, { loading: banLoading }] = useMutation(BanUserDocument)
  const [unbanMutation, { loading: unbanLoading }] = useMutation(UnbanUserDocument)

  const isLoading = deleteLoading || banLoading || unbanLoading

  const deleteUser = async (id: string) => {
    await deleteMutation({ variables: { id } })
    await apolloClient.refetchQueries({ include: [GetUsersDocument] })
  }

  const banUser = async (input: BanInput) => {
    await banMutation({ variables: { input } })
    await apolloClient.refetchQueries({ include: [GetUsersDocument] })
  }

  const unbanUser = async (id: string) => {
    await unbanMutation({ variables: { id } })
    await apolloClient.refetchQueries({ include: [GetUsersDocument] })
  }

  return {
    deleteUser,
    banUser,
    unbanUser,
    isLoading,
  }
}
