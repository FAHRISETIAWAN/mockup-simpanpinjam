'use client'

import { CheckCircle2, Printer } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Icon } from '@iconify/react'
import { printLoan } from '../print/print-loan'

interface DraftItem {
  id: number
  nomorHak: string
  desa: string
  kecamatan: string
}

interface Props {
  open: boolean
  onOpenChange: (value: boolean) => void
  drafts: DraftItem[]
}

export default function PrintPdfDialog({
  open,
  onOpenChange,
  drafts,
}: Props) {
  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const kode = `PMJ-${new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '')}-${String(
    Math.floor(Math.random() * 999) + 1
  ).padStart(3, '0')}`

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        size="md"
        showCloseButton={false}
        className="overflow-hidden rounded-[32px] p-0"
      >
        <div className="px-8 py-10">
          <div className="flex flex-col items-center text-center">
            {/* Icon */}
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-400 text-primary-foreground shadow-lg">
                  <Icon
                    icon="mdi:tick-decagram"
                    className="h-8 w-8"
                  />
                </div>
              </div>

            {/* Title */}
            <DialogTitle className="text-3xl font-bold tracking-tight">
              Pengajuan Berhasil
            </DialogTitle>

            {/* Description */}
            <DialogDescription className="mt-3 max-w-sm text-center text-sm">
              Silakan cetak bukti pengajuan atau simpan kode
              peminjaman untuk proses verifikasi
              selanjutnya.
            </DialogDescription>

            {/* Information */}
            <div className="mt-8 w-full rounded-3xl bg-muted/40 p-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Kode Peminjaman
                  </span>

                  <span className="font-semibold">
                    {kode}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Tanggal
                  </span>

                  <span className="font-semibold">
                    {today}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Jumlah Arsip
                  </span>

                  <span className="font-semibold">
                    {drafts.length} Berkas
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Status
                  </span>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                    Pengajuan
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex w-full flex-col gap-3">
              <Button
                size="lg"
                className="h-12 bg-green-500 text-white hover:bg-green-600 rounded-full transition-all duration-300 hover:scale-[1.02]"
                onClick={() =>
                  printLoan(
                    drafts,
                    kode,
                    today
                  )
                }
              >
                <Printer className="mr-2 h-4 w-4" />
                Cetak Bukti Peminjaman
              </Button>

              <Button
                variant="ghost"
                className="rounded-full"
                onClick={() =>
                  onOpenChange(false)
                }
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}