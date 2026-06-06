'use client'

import { useState } from 'react'
import { XCircle, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import clsx from 'clsx'

const KETERANGAN_OPTIONS = [
  'Berkas tidak lengkap',
  'Data tidak sesuai',
  'Arsip sedang dipinjam',
  'Tidak memenuhi syarat',
  'Keperluan tidak valid',
]

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
  onConfirm: (keterangan: string) => void
  itemKode?: string
}

export default function TolakDialog({ open, onOpenChange, onConfirm, itemKode }: Props) {
  const [selected, setSelected] = useState('')

  const handleConfirm = () => {
    if (!selected) return
    onConfirm(selected)
    setSelected('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) setSelected(''); onOpenChange(v) }}>
      <DialogContent className="max-w-2xl w-full p-0 overflow-hidden rounded-3xl gap-0">
        <DialogHeader className="px-8 pt-7 pb-5 border-b border-zinc-100 dark:border-zinc-800 bg-red-50 dark:bg-red-950/20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400">
              <XCircle size={18} />
            </div>
            <div>
              <DialogTitle>Tolak Peminjaman</DialogTitle>
              <DialogDescription className="font-mono">{itemKode}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-8 py-6 space-y-3">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Pilih alasan penolakan:</p>
          {KETERANGAN_OPTIONS.map((k) => (
            <button
              key={k}
              onClick={() => setSelected(k)}
              className={clsx(
                'w-full flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-sm transition-all duration-150 text-left',
                selected === k
                  ? 'border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 font-medium'
                  : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50/50 dark:hover:bg-red-950/10'
              )}
            >
              <span>{k}</span>
              {selected === k && <Check size={16} className="shrink-0 text-red-500 dark:text-red-400" />}
            </button>
          ))}
        </div>

        <div className="shrink-0 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-8 py-5">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-11 cursor-pointer rounded-full dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              onClick={() => { setSelected(''); onOpenChange(false) }}
            >
              Batal
            </Button>
            <Button
              disabled={!selected}
              onClick={handleConfirm}
              className="h-11 cursor-pointer rounded-full bg-red-500 shadow-md shadow-red-200 dark:shadow-red-900/30 hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              <XCircle className="mr-2 h-4 w-4" />Tolak
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
