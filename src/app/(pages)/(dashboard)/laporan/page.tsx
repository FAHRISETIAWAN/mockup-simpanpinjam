'use client'

import ReportSummary from '@/components/laporan/report-summary'
import ReportTable from '@/components/laporan/report-table'

export default function LaporanPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 inline-flex rounded-full bg-orange-100 dark:bg-orange-900/40 px-3 py-1 text-xs font-medium text-orange-600 dark:text-orange-400">
          Simpan Pinjam Buku Tanah
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Laporan
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Rekap data peminjaman dan pengembalian arsip
        </p>
      </div>

      <ReportSummary />
      <ReportTable />
    </div>
  )
}
