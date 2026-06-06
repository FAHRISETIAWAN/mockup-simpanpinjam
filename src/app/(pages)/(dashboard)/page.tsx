import DashboardBanner from '@/components/dashboard/dashboard-banner'
import DashboardLoans from '@/components/dashboard/dashboard-loans'
import DashboardStats from '@/components/dashboard/dashboard-stats'
import DashboardActivity from '@/components/dashboard/dashboard-activity'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardBanner />

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <DashboardLoans />

        <div className="space-y-6">
          <DashboardStats />

          <DashboardActivity />
        </div>
      </div>
    </div>
  )
}