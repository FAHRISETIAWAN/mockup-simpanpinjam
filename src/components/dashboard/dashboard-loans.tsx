import { Search, SlidersHorizontal, Plus, ChevronRight } from 'lucide-react'

const loans = [
  {
    name: 'Budi Santoso',
    unit: 'Bagian Hak Tanah',
    status: 'Verifikasi',
    avatar: 'https://i.pravatar.cc/100?img=11',
  },
  {
    name: 'Siti Aisyah',
    unit: 'Seksi Survei',
    status: 'Peminjaman',
    avatar: 'https://i.pravatar.cc/100?img=32',
  },
  {
    name: 'Dewi Lestari',
    unit: 'Bagian Sengketa',
    status: 'Kembali',
    avatar: 'https://i.pravatar.cc/100?img=24',
  },
  {
    name: 'Andi Pratama',
    unit: 'Bagian Umum',
    status: 'Menunggu',
    avatar: 'https://i.pravatar.cc/100?img=15',
  },
  {
    name: 'Rizky Kurniawan',
    unit: 'Seksi Penetapan Hak',
    status: 'Verifikasi',
    avatar: 'https://i.pravatar.cc/100?img=60',
  },
]

const getBadgeColor = (status: string) => {
  switch (status) {
    case 'Verifikasi':
      return 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400'
    case 'Peminjaman':
      return 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400'
    case 'Kembali':
      return 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400'
    default:
      return 'bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300'
  }
}

export default function DashboardLoans() {
  return (
    <div className="rounded-[24px] bg-white dark:bg-zinc-900 p-3 sm:rounded-[32px] sm:p-4 transition-colors duration-300">
      {/* SEARCH */}
      <div className="mb-4 flex gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 sm:left-4" />
          <input
            placeholder="Cari peminjam..."
            className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-3 text-sm outline-none transition focus:border-violet-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-violet-600 sm:h-12 sm:rounded-2xl sm:pl-11 sm:pr-4"
          />
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 sm:h-12 sm:w-12 sm:rounded-2xl">
          <SlidersHorizontal size={18} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 sm:h-12 sm:w-12 sm:rounded-2xl">
          <Plus size={18} />
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {loans.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-zinc-100 p-3 transition-all hover:border-zinc-200 dark:border-zinc-800 dark:hover:border-zinc-700 sm:rounded-3xl sm:p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-10 w-10 rounded-xl object-cover sm:h-12 sm:w-12"
                />
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-zinc-900 dark:text-white sm:text-base">
                    {item.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="truncate text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                      {item.unit}
                    </span>
                  </div>
                </div>
              </div>

              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium sm:px-3 sm:text-xs ${getBadgeColor(item.status)}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 sm:rounded-2xl sm:py-4 sm:text-base">
        Lihat Semua Peminjam
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
