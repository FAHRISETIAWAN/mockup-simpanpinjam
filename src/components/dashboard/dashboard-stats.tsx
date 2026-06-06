import { BookOpen, ClipboardCheck, ArchiveRestore, Database, TrendingUp } from 'lucide-react'

const stats = [
  {
    title: 'Sedang Dipinjam',
    value: '128',
    growth: '+12%',
    subtitle: 'bulan lalu',
    icon: BookOpen,
    cardColor: 'bg-violet-50 dark:bg-violet-950/30',
    iconColor: 'bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400',
    badgeColor: 'bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400',
  },
  {
    title: 'Menunggu Verifikasi',
    value: '24',
    growth: '+8%',
    subtitle: 'bulan lalu',
    icon: ClipboardCheck,
    cardColor: 'bg-orange-50 dark:bg-orange-950/30',
    iconColor: 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400',
    badgeColor: 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400',
  },
  {
    title: 'Dikembalikan',
    value: '512',
    growth: '+16%',
    subtitle: 'bulan lalu',
    icon: ArchiveRestore,
    cardColor: 'bg-green-50 dark:bg-green-950/30',
    iconColor: 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400',
    badgeColor: 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400',
  },
  {
    title: 'Total Arsip',
    value: '12.450',
    growth: '+5%',
    subtitle: 'bulan lalu',
    icon: Database,
    cardColor: 'bg-blue-50 dark:bg-blue-950/30',
    iconColor: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
    badgeColor: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
  },
]

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:gap-4 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.title}
            className={`
              ${item.cardColor}
              rounded-[22px] border border-white/60 dark:border-white/5
              p-4 sm:p-5 lg:p-6
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-md
            `}
          >
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${item.iconColor} sm:h-12 sm:w-12 sm:rounded-2xl`}>
              <Icon size={20} />
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl lg:text-5xl">
              {item.value}
            </h3>

            <p className="mt-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 sm:text-sm lg:text-base">
              {item.title}
            </p>

            <div className={`mt-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium sm:px-3 sm:text-xs ${item.badgeColor}`}>
              <TrendingUp size={12} />
              <span>{item.growth}</span>
              <span className="opacity-80">{item.subtitle}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
