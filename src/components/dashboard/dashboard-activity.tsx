import { ShieldCheck, FileCheck, ArchiveRestore, Database, ChevronRight } from 'lucide-react'

const activities = [
  {
    title: 'Peminjaman baru BT-2025-001',
    user: 'Budi Santoso',
    detail: 'Buku Tanah No. 12345/Desa Ancol',
    time: '10 menit lalu',
    icon: ShieldCheck,
    iconColor: 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400',
  },
  {
    title: 'Verifikasi disetujui untuk BT-2025-002',
    user: 'Siti Aisyah',
    detail: 'Buku Tanah No. 67890/Desa Sunter',
    time: '1 jam lalu',
    icon: FileCheck,
    iconColor: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400',
  },
  {
    title: 'Pengembalian arsip BT-2025-003',
    user: 'Dewi Lestari',
    detail: 'Buku Tanah No. 54321/Desa Koja',
    time: '3 jam lalu',
    icon: ArchiveRestore,
    iconColor: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400',
  },
  {
    title: 'Arsip baru ditambahkan BK-2025-045',
    user: '',
    detail: 'Warkah No. 112233/2025',
    time: '5 jam lalu',
    icon: Database,
    iconColor: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
  },
]

export default function DashboardActivity() {
  return (
    <div className="overflow-hidden rounded-[24px] bg-white dark:bg-zinc-900 sm:rounded-[32px] transition-colors duration-300">
      {/* HEADER */}
      <div className="border-b border-zinc-100 dark:border-zinc-800 px-4 py-4 sm:px-6 sm:py-5">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white sm:text-xl">
          Aktivitas Terbaru
        </h2>
      </div>

      {/* TIMELINE */}
      <div className="relative p-4 sm:p-6">
        <div className="absolute bottom-10 left-8 top-10 w-px bg-zinc-200 dark:bg-zinc-700 sm:bottom-12 sm:left-10 sm:top-12" />

        <div className="space-y-5 sm:space-y-8">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.title} className="relative flex gap-3 sm:gap-4">
                <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${activity.iconColor}`}>
                  <Icon size={14} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-zinc-900 dark:text-white sm:text-base">
                        {activity.title}
                        {activity.user && (
                          <span className="font-normal text-zinc-500 dark:text-zinc-400">
                            {' '}oleh {activity.user}
                          </span>
                        )}
                      </h3>
                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                        {activity.detail}
                      </p>
                    </div>
                    <span className="text-xs whitespace-nowrap text-zinc-400 dark:text-zinc-500 sm:text-sm">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-zinc-100 dark:border-zinc-800 p-3 sm:p-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-orange-600 dark:text-orange-400 transition-all hover:bg-orange-50 dark:hover:bg-orange-950/20 sm:rounded-2xl sm:text-base">
          Lihat Semua Aktivitas
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
