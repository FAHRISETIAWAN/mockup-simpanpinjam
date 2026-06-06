'use client'

import { Filter, X, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import SearchableSelect from '@/components/searchableselect'
import { useMediaQuery } from '@/hooks/use-media-query'
import clsx from 'clsx'

const TAHUN_OPTIONS = [
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
]
const KEPERLUAN_OPTIONS = [
  { value: 'Sengketa',       label: 'Sengketa' },
  { value: 'Pengukuran',     label: 'Pengukuran' },
  { value: 'Pengecekan',     label: 'Pengecekan' },
  { value: 'Permohonan Hak', label: 'Permohonan Hak' },
  { value: 'Peralihan Hak',  label: 'Peralihan Hak' },
]
const STATUS_OPTIONS = [
  { value: 'PENGAJUAN', label: 'Pengajuan' },
  { value: 'DISETUJUI', label: 'Disetujui' },
  { value: 'DIPINJAM',  label: 'Dipinjam'  },
  { value: 'SELESAI',   label: 'Selesai'   },
  { value: 'DITOLAK',   label: 'Ditolak'   },
]

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
  tmpTahun: any
  tmpKeperluan: any
  tmpStatus: any
  setTmpTahun: (v: any) => void
  setTmpKeperluan: (v: any) => void
  setTmpStatus: (v: any) => void
  onApply: () => void
  onReset: () => void
}

export default function ReportFilterSheet({
  open, onOpenChange,
  tmpTahun, tmpKeperluan, tmpStatus,
  setTmpTahun, setTmpKeperluan, setTmpStatus,
  onApply, onReset,
}: Props) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isDesktop ? 'right' : 'bottom'}
        className={clsx(
          'flex flex-col p-0',
          isDesktop ? 'w-full sm:max-w-[400px]' : 'h-[80vh] rounded-t-[32px]'
        )}
      >
        {!isDesktop && (
          <div className="mx-auto mt-3 mb-1 h-1.5 w-14 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        )}

        <SheetHeader className="shrink-0 px-6 pt-5 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400">
              <SlidersHorizontal size={18} />
            </div>
            <div>
              <SheetTitle>Filter Laporan</SheetTitle>
              <SheetDescription>Saring data peminjaman</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          <div>
            <Label className="mb-2 block text-zinc-700 dark:text-zinc-300">Tahun</Label>
            <SearchableSelect options={TAHUN_OPTIONS} value={tmpTahun} onChange={setTmpTahun} placeholder="Pilih Tahun" />
          </div>
          <div>
            <Label className="mb-2 block text-zinc-700 dark:text-zinc-300">Keperluan</Label>
            <SearchableSelect options={KEPERLUAN_OPTIONS} value={tmpKeperluan} onChange={setTmpKeperluan} placeholder="Pilih Keperluan" />
          </div>
          <div>
            <Label className="mb-2 block text-zinc-700 dark:text-zinc-300">Status</Label>
            <SearchableSelect options={STATUS_OPTIONS} value={tmpStatus} onChange={setTmpStatus} placeholder="Pilih Status" />
          </div>
        </div>

        {/* footer — 2 col, never clipped */}
        <div className="shrink-0 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-11 cursor-pointer rounded-full dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              onClick={onReset}
            >
              <X className="mr-2 h-4 w-4" />Reset
            </Button>
            <Button
              className="h-11 cursor-pointer rounded-full bg-orange-500 shadow-md shadow-orange-200 dark:shadow-orange-900/30 hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              onClick={onApply}
            >
              <Filter className="mr-2 h-4 w-4" />Terapkan
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
