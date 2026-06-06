'use client'

import KeperluanTable from '@/components/master/keperluan/KeperluanTable'

export default function KeperluanPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600">
          Master Data
        </div>

        <h1 className="text-3xl font-bold">
          Keperluan
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Kelola data master keperluan peminjaman
        </p>
      </div>

      <KeperluanTable />
    </div>
  )
}