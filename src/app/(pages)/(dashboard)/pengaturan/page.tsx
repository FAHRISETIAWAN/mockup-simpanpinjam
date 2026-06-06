'use client'

import UserAccessTable from '@/components/pengaturan/user-access-table'

export default function PengaturanPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 inline-flex rounded-full bg-orange-100 dark:bg-orange-900/40 px-2.5 py-1 text-[11px] font-medium text-orange-600 dark:text-orange-400 sm:px-3 sm:text-xs">
            Simpan Pinjam Buku Tanah
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
            Pengaturan Akses User
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Kelola hak akses dan pengguna aplikasi SITAKJUP.
          </p>
        </div>
      </div>

      <UserAccessTable />
    </div>
  )
}
