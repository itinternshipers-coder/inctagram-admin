import { AdminLayout } from '@/widgets/layout/AdminLayout'
import { requireAccessToken } from '@/shared/auth/session'
// comment for redeploy
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAccessToken()

  return <AdminLayout>{children}</AdminLayout>
}
