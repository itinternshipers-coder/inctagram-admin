export type User = {
  id: string
  username: string
  profileLink: string
  email: string
  isBanned: boolean
  banReason: string | null
  bannedAt: string | null
  dataAdded: string
  avatarUrl: string | null
}

export type UsersListInput = {
  page?: number
  pageSize?: number
  search?: string
  sortBy?: string
  sortDirection?: string
  filterBanned?: string
}

export type UsersListOutput = {
  items: User[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export type UserDetail = {
  id: string
  username: string
  profileLink: string
  email: string
  isBanned: boolean
  banReason: string | null
  bannedAt: string | null
  createdAt: string
  avatarUrl: string | null
  avatarSmallUrl: string | null
}

export type UserPaymentsInput = {
  page?: number
  pageSize?: number
  userId: string
}

export type UserPayment = {
  id: string
  amount: number
  date: string
  paymentMethod: string
  subscription: string
  userId: string
  username: string
  avatarUrl: string | null
}

export type UserPaymentsListOutput = {
  items: UserPayment[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export type UserFollowersInput = {
  page?: number
  pageSize?: number
  userId: string
}

export type Follower = {
  id: string
  username: string
  createdAt: string
  avatarUrl: string | null
}

export type FollowersListOutput = {
  items: Follower[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export type UserSubscriptionRow = {
  id: string
  username: string
  profileLink: string
  since: string
}

export type PaginationState = {
  currentPage: number
  pageSize: number
}

export type PostsListInput = {
  cursor?: string
  limit?: number
  search?: string
}

export type PostPhoto = {
  id: string
  order: number
  url: string
}

export type Post = {
  avatarUrl: string | null
  createdAt: string
  description: string
  id: string
  username: string
  photos: PostPhoto[]
}

export type PostsListOutput = {
  items: Post[]
  hasMore: boolean
  nextCursor: string | null
}

export type PaymentRow = {
  amount: string
  endDate: string
  id: string
  paymentDate: string
  paymentType: string
  subscriptionType: string
}

export type UserFilter = 'all' | 'blocked' | 'not-blocked'

export type SortDirection = 'asc' | 'desc' | null
