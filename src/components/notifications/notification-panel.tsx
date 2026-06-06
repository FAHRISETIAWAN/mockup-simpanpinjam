'use client'

import { useState } from 'react'
import { Bell, CheckCheck, Trash2, BookOpen, ClipboardCheck, ArchiveRestore } from 'lucide-react'
import clsx from 'clsx'

const initialNotifs = [
  {
    id: 1,
    type: 'peminjaman',
    title: 'Peminjaman Baru',
    body: 'Rakjat mengajukan peminjaman 3 arsip buku tanah.',
    time: '2 menit lalu',
    read: false,
  },
  {
    id: 2,
    type: 'verifikasi',
    title: 'Menunggu Verifikasi',
    body: 'PMJ-20260604-001 menunggu persetujuan Anda.',
    time: '15 menit lalu',
    read: false,
  },
  {
    id: 3,
    type: 'pengembalian',
    title: 'Arsip Dikembalikan',
    body: 'Budi Santoso telah mengembalikan 2 arsip warkah.',
    time: '1 jam lalu',
    read: true,
  },
  {
    id: 4,
    type: 'peminjaman',
    title: 'Peminjaman Disetujui',
    body: 'PMJ-20260603-005 telah disetujui dan siap diambil.',
    time: '3 jam lalu',
    read: true,
  },
]

const iconMap: Record<string, React.ReactNode> = {
  peminjaman: <BookOpen size={16} />,
  verifikasi: <ClipboardCheck size={16} />,
  pengembalian: <ArchiveRestore size={16} />,
}

const colorMap: Record<string, string> = {
  peminjaman: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400',
  verifikasi: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
  pengembalian: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400',
}

export default function NotificationPanel() {
  const [open, setOpen] = useState(false)
  const [notifs, setNotifs] = useState(initialNotifs)

  const unread = notifs.filter((n) => !n.read).length

  const markAll = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const dismiss = (id: number) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          'relative flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200',
          'cursor-pointer hover:scale-105 active:scale-95 sm:h-10 sm:w-10',
          'border-zinc-200 hover:bg-zinc-100',
          'dark:border-zinc-700 dark:hover:bg-zinc-800 dark:text-zinc-300'
        )}
      >
        <Bell size={16} className="sm:size-[18px]" />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white animate-pulse">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* BACKDROP */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          {/* PANEL */}
          <div
            className={clsx(
              'absolute right-0 top-12 z-50 w-80 sm:w-96',
              'overflow-hidden rounded-2xl border shadow-xl',
              'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200',
              'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'
            )}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 px-4 py-3">
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Notifikasi
              </h3>

              {unread > 0 && (
                <button
                  onClick={markAll}
                  className="flex items-center gap-1.5 text-xs text-orange-500 hover:text-orange-600 transition-colors"
                >
                  <CheckCheck size={14} />
                  Tandai semua dibaca
                </button>
              )}
            </div>

            {/* LIST */}
            <div className="max-h-[360px] overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800">
              {notifs.length === 0 ? (
                <div className="py-12 text-center text-sm text-zinc-400 dark:text-zinc-600">
                  Tidak ada notifikasi
                </div>
              ) : (
                notifs.map((n) => (
                  <div
                    key={n.id}
                    className={clsx(
                      'group relative flex gap-3 px-4 py-3 transition-colors duration-150',
                      n.read
                        ? 'bg-white dark:bg-zinc-900'
                        : 'bg-orange-50/60 dark:bg-orange-950/20'
                    )}
                  >
                    {/* ICON */}
                    <div
                      className={clsx(
                        'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
                        colorMap[n.type]
                      )}
                    >
                      {iconMap[n.type]}
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        {n.title}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                        {n.body}
                      </p>
                      <p className="mt-1 text-[11px] text-zinc-400 dark:text-zinc-600">
                        {n.time}
                      </p>
                    </div>

                    {/* UNREAD DOT */}
                    {!n.read && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    )}

                    {/* DISMISS */}
                    <button
                      onClick={() => dismiss(n.id)}
                      className="absolute right-3 top-3 hidden group-hover:flex h-6 w-6 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            {notifs.length > 0 && (
              <div className="border-t border-zinc-100 dark:border-zinc-800 px-4 py-2.5">
                <button
                  onClick={() => setNotifs([])}
                  className="w-full text-center text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  Hapus semua notifikasi
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
