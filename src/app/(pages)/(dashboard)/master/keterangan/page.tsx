'use client'

import KeteranganTable from '@/components/master/keterangan/KeteranganTable'

export default function KeteranganPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 inline-flex rounded-full bg-violet-100 dark:bg-violet-900/40 px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-400">
          Master Data
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Keterangan
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Kelola data master keterangan status arsip
        </p>
      </div>

      <KeteranganTable />
    </div>
  )
}
