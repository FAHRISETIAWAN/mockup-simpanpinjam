'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import VerificationTable from '@/components/verifikasi/verification-table'
import VerificationDetailSheet from '@/components/verifikasi/verification-detail-sheet'

export default function VerifikasiPage() {
  const [selected, setSelected] = useState<any>(null)
  const [openDetail, setOpenDetail] = useState(false)

  const handleOpenDetail = (item: any) => {
    setSelected(item)
    setOpenDetail(true)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 inline-flex rounded-full bg-orange-100 dark:bg-orange-900/40 px-2.5 py-1 text-[11px] font-medium text-orange-600 dark:text-orange-400 sm:px-3 sm:text-xs">
            Simpan Pinjam Buku Tanah
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
            Verifikasi Peminjaman
          </h1>
        </div>

        {/* SEARCH */}
        <div className="w-full lg:w-[350px]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
            <Input
              placeholder="Cari kode peminjaman..."
              className="h-11 rounded-2xl pl-11 text-sm transition-all duration-200 hover:border-orange-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-900/30 sm:h-12 sm:rounded-full"
            />
          </div>
        </div>
      </div>

      <VerificationTable onDetail={handleOpenDetail} />

      <VerificationDetailSheet open={openDetail} onOpenChange={setOpenDetail} data={selected} />
    </div>
  )
}
