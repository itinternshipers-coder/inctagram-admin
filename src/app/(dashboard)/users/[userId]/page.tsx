import { UserDetailsView } from '@/features/users/ui/user-details/UserDetailsView'

type UserPageProps = {
  params: Promise<{ userId: string }>
}

export default async function UserPage({ params }: UserPageProps) {
  const { userId } = await params

  return <UserDetailsView requestedUserId={userId} />
}
