import { RoleGuard } from '@/components/shared/RoleGuard'
import { Nav } from '@/components/shared/Nav'

export default function BankLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={['bank', 'admin']}>
      <div className="min-h-screen">
        <Nav />
        <main className="ml-60 min-h-screen overflow-auto">{children}</main>
      </div>
    </RoleGuard>
  )
}
