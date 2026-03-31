import { mockUsers } from '@/features/users/model/mock-data'
import { UserDetailsView } from '@/features/users/ui/user-details/UserDetailsView'

type UserPageProps = {
  params: Promise<{ userId: string }>
}

export default async function UserPage({ params }: UserPageProps) {
  const { userId } = await params
  const user = mockUsers.find((item) => item.id === userId) ?? mockUsers[0]

  return <UserDetailsView user={user} requestedUserId={userId} />
}
