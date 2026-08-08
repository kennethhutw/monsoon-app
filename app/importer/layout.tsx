import { RoleGuard } from '@/components/shared/RoleGuard'
import { Nav } from '@/components/shared/Nav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={['importer', 'admin']}>
      <div className="min-h-screen">
        <Nav />
        <main className="ml-60 min-h-screen overflow-auto">{children}</main>
      </div>
    </RoleGuard>
  )
}
