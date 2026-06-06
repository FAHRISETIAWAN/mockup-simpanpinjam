'use client'

import UserTable from '@/components/master/user/UserTable'

export default function UserPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 inline-flex rounded-full bg-cyan-100 dark:bg-cyan-900/40 px-3 py-1 text-xs font-medium text-cyan-600 dark:text-cyan-400">
          Master Data
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          User
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Kelola akun dan hak akses pengguna sistem
        </p>
      </div>

      <UserTable />
    </div>
  )
}
