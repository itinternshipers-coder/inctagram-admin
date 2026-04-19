export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: string; output: string }
}

export type AdminLoginResponse = {
  __typename?: 'AdminLoginResponse'
  accessToken: Scalars['String']['output']
}

export type BanUserFromPostInput = {
  postId: Scalars['String']['input']
  reason: Scalars['String']['input']
}

export type BanUserInput = {
  id: Scalars['String']['input']
  reason: Scalars['String']['input']
}

export type FollowerOutput = {
  __typename?: 'FollowerOutput'
  avatarUrl?: Maybe<Scalars['String']['output']>
  createdAt: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  username: Scalars['String']['output']
}

export type FollowersListOutput = {
  __typename?: 'FollowersListOutput'
  items: Array<FollowerOutput>
  page: Scalars['Int']['output']
  pageSize: Scalars['Int']['output']
  totalCount: Scalars['Int']['output']
  totalPages: Scalars['Int']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  adminLogin: AdminLoginResponse
  banUser: Scalars['Boolean']['output']
  banUserFromPost: Scalars['Boolean']['output']
  deleteUser: Scalars['Boolean']['output']
  unbanUser: Scalars['Boolean']['output']
}

export type MutationAdminLoginArgs = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type MutationBanUserArgs = {
  input: BanUserInput
}

export type MutationBanUserFromPostArgs = {
  input: BanUserFromPostInput
}

export type MutationDeleteUserArgs = {
  id: Scalars['String']['input']
}

export type MutationUnbanUserArgs = {
  id: Scalars['String']['input']
}

export type PaymentOutput = {
  __typename?: 'PaymentOutput'
  amount: Scalars['Float']['output']
  avatarUrl?: Maybe<Scalars['String']['output']>
  date: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  paymentMethod: Scalars['String']['output']
  subscription: Scalars['String']['output']
  userId: Scalars['String']['output']
  username: Scalars['String']['output']
}

export type PaymentsListInput = {
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sortBy?: InputMaybe<Scalars['String']['input']>
  sortDirection?: InputMaybe<Scalars['String']['input']>
}

export type PaymentsListOutput = {
  __typename?: 'PaymentsListOutput'
  items: Array<PaymentOutput>
  page: Scalars['Int']['output']
  pageSize: Scalars['Int']['output']
  totalCount: Scalars['Int']['output']
  totalPages: Scalars['Int']['output']
}

export type PostOutput = {
  __typename?: 'PostOutput'
  avatarUrl?: Maybe<Scalars['String']['output']>
  createdAt: Scalars['DateTime']['output']
  description: Scalars['String']['output']
  id: Scalars['String']['output']
  photos: Array<PostPhotoOutput>
  username: Scalars['String']['output']
}

export type PostPhotoOutput = {
  __typename?: 'PostPhotoOutput'
  id: Scalars['String']['output']
  order: Scalars['Int']['output']
  url: Scalars['String']['output']
}

export type PostsListInput = {
  cursor?: InputMaybe<Scalars['String']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type PostsListOutput = {
  __typename?: 'PostsListOutput'
  hasMore: Scalars['Boolean']['output']
  items: Array<PostOutput>
  nextCursor?: Maybe<Scalars['String']['output']>
}

export type Query = {
  __typename?: 'Query'
  payments: PaymentsListOutput
  posts: PostsListOutput
  user: UserDetailOutput
  userFollowers: FollowersListOutput
  userFollowing: FollowersListOutput
  userPayments: UserPaymentsListOutput
  users: UsersListOutput
}

export type QueryPaymentsArgs = {
  input?: InputMaybe<PaymentsListInput>
}

export type QueryPostsArgs = {
  input?: InputMaybe<PostsListInput>
}

export type QueryUserArgs = {
  id: Scalars['String']['input']
}

export type QueryUserFollowersArgs = {
  input: UserFollowersInput
}

export type QueryUserFollowingArgs = {
  input: UserFollowersInput
}

export type QueryUserPaymentsArgs = {
  input: UserPaymentsInput
}

export type QueryUsersArgs = {
  input?: InputMaybe<UsersListInput>
}

export type Subscription = {
  __typename?: 'Subscription'
  postCreated: PostOutput
}

export type UserDetailOutput = {
  __typename?: 'UserDetailOutput'
  avatarSmallUrl?: Maybe<Scalars['String']['output']>
  avatarUrl?: Maybe<Scalars['String']['output']>
  banReason?: Maybe<Scalars['String']['output']>
  bannedAt?: Maybe<Scalars['DateTime']['output']>
  createdAt: Scalars['DateTime']['output']
  email: Scalars['String']['output']
  id: Scalars['String']['output']
  isBanned: Scalars['Boolean']['output']
  profileLink: Scalars['String']['output']
  username: Scalars['String']['output']
}

export type UserFollowersInput = {
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  userId: Scalars['String']['input']
}

export type UserOutput = {
  __typename?: 'UserOutput'
  avatarUrl?: Maybe<Scalars['String']['output']>
  banReason?: Maybe<Scalars['String']['output']>
  bannedAt?: Maybe<Scalars['DateTime']['output']>
  dataAdded: Scalars['DateTime']['output']
  email: Scalars['String']['output']
  id: Scalars['String']['output']
  isBanned: Scalars['Boolean']['output']
  profileLink: Scalars['String']['output']
  username: Scalars['String']['output']
}

export type UserPaymentOutput = {
  __typename?: 'UserPaymentOutput'
  amount: Scalars['Float']['output']
  avatarUrl?: Maybe<Scalars['String']['output']>
  date: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  paymentMethod: Scalars['String']['output']
  subscription: Scalars['String']['output']
  userId: Scalars['String']['output']
  username: Scalars['String']['output']
}

export type UserPaymentsInput = {
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  userId: Scalars['String']['input']
}

export type UserPaymentsListOutput = {
  __typename?: 'UserPaymentsListOutput'
  items: Array<UserPaymentOutput>
  page: Scalars['Int']['output']
  pageSize: Scalars['Int']['output']
  totalCount: Scalars['Int']['output']
  totalPages: Scalars['Int']['output']
}

export type UsersListInput = {
  filterBanned?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sortBy?: InputMaybe<Scalars['String']['input']>
  sortDirection?: InputMaybe<Scalars['String']['input']>
}

export type UsersListOutput = {
  __typename?: 'UsersListOutput'
  items: Array<UserOutput>
  page: Scalars['Int']['output']
  pageSize: Scalars['Int']['output']
  totalCount: Scalars['Int']['output']
  totalPages: Scalars['Int']['output']
}
