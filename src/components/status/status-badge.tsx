'use client'

import { cn } from '@/lib/utils'

export type StatusType =
  | 'PENGAJUAN'
  | 'DISETUJUI'
  | 'DITOLAK'
  | 'DIPINJAM'
  | 'PENGEMBALIAN'
  | 'PENGEMBALIAN_DITOLAK'
  | 'SELESAI'

interface StatusBadgeProps {
  status: StatusType
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  PENGAJUAN: {
    label: 'Pengajuan',
    className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  },
  DISETUJUI: {
    label: 'Disetujui',
    className: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  },
  DITOLAK: {
    label: 'Ditolak',
    className: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  },
  DIPINJAM: {
    label: 'Dipinjam',
    className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  },
  PENGEMBALIAN: {
    label: 'Pengembalian',
    className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
  },
  PENGEMBALIAN_DITOLAK: {
    label: 'Pengembalian Ditolak',
    className: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400',
  },
  SELESAI: {
    label: 'Selesai',
    className: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300',
  },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status as StatusType] ?? statusConfig.PENGAJUAN

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        config.className
      )}
    >
      {config.label}
    </span>
  )
}
