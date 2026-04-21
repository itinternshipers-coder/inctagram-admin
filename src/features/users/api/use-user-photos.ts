import { useMemo } from 'react'
import { useQuery } from '@apollo/client/react'

import { GET_POSTS } from './users-queries'
import type { PostsListInput, PostsListOutput } from '../model/types/types'

type UseUserPhotosParams = {
  username: string
}

export function useUserPhotos({ username }: UseUserPhotosParams) {
  const input: PostsListInput = {
    limit: 100,
    search: username,
  }

  const { data, loading, error } = useQuery<{ posts: PostsListOutput }>(GET_POSTS, {
    variables: { input },
    skip: !username,
  })

  const photoUrls = useMemo(() => {
    const posts = data?.posts.items ?? []
    const normalizedUsername = username.toLowerCase()
    const exactUserPosts = posts.filter((post) => post.username.toLowerCase() === normalizedUsername)
    const sourcePosts = exactUserPosts.length > 0 ? exactUserPosts : posts

    return sourcePosts.flatMap((post) => post.photos.map((photo) => photo.url)).filter(Boolean)
  }, [data?.posts.items, username])

  return {
    photoUrls,
    loading,
    error,
  }
}
