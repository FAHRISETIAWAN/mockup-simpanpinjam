import Link from 'next/link'
import { BookOpen, FileText, ClipboardList, MessageSquare, Users } from 'lucide-react'

const masterMenus = [
  {
    title: 'Buku Tanah',
    desc: 'Kelola data master buku tanah',
    href: '/master/buku-tanah',
    icon: BookOpen,
    color: 'bg-orange-50 dark:bg-orange-950/30',
    iconColor: 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400',
  },
  {
    title: 'Warkah',
    desc: 'Kelola data master warkah',
    href: '/master/warkah',
    icon: FileText,
    color: 'bg-blue-50 dark:bg-blue-950/30',
    iconColor: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
  },
  {
    title: 'Keperluan',
    desc: 'Kelola data keperluan peminjaman',
    href: '/master/keperluan',
    icon: ClipboardList,
    color: 'bg-emerald-50 dark:bg-emerald-950/30',
    iconColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400',
  },
  {
    title: 'Keterangan',
    desc: 'Kelola data keterangan status arsip',
    href: '/master/keterangan',
    icon: MessageSquare,
    color: 'bg-violet-50 dark:bg-violet-950/30',
    iconColor: 'bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400',
  },
  {
    title: 'User',
    desc: 'Kelola akun dan hak akses pengguna',
    href: '/master/user',
    icon: Users,
    color: 'bg-cyan-50 dark:bg-cyan-950/30',
    iconColor: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-400',
  },
]

export default function MasterPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 inline-flex rounded-full bg-orange-100 dark:bg-orange-900/40 px-3 py-1 text-xs font-medium text-orange-600 dark:text-orange-400">
          Master
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Master Data
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Pilih kategori data master yang ingin dikelola
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {masterMenus.map((menu) => {
          const Icon = menu.icon
          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`group flex items-center gap-4 rounded-[24px] border border-white/60 dark:border-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6 ${menu.color}`}
            >
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-110 ${menu.iconColor}`}>
                <Icon size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">{menu.title}</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{menu.desc}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
