'use client'

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialKode?: string
  initialKeterangan?: string
  onSubmit: (kode: string, keterangan: string) => void
}

export default function KeteranganDialog({
  open,
  onOpenChange,
  initialKode,
  initialKeterangan,
  onSubmit,
}: Props) {
  const [kode, setKode] = useState('')
  const [keterangan, setKeterangan] = useState('')

  useEffect(() => {
    setKode(initialKode || '')
    setKeterangan(initialKeterangan || '')
  }, [initialKode, initialKeterangan, open])

  const isEdit = !!initialKeterangan

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-3xl p-0 sm:max-w-lg">
        {/* HEADER */}
        <DialogHeader className="bg-violet-50 dark:bg-violet-950/30 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400">
              <Icon icon="solar:text-bold" className="h-7 w-7" />
            </div>
            <div>
              <DialogTitle className="text-xl">
                {isEdit ? 'Edit Keterangan' : 'Tambah Keterangan'}
              </DialogTitle>
              <DialogDescription className="mt-1">
                Kelola data keterangan status arsip.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* CONTENT */}
        <div className="space-y-4 px-8 py-6">
          <div>
            <Label className="mb-2 block">Kode Keterangan</Label>
            <Input
              value={kode}
              onChange={(e) => setKode(e.target.value)}
              placeholder="Contoh: KET-001"
              className="h-12 rounded-full transition-all duration-200 hover:border-violet-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/30 placeholder:text-zinc-400"
            />
          </div>

          <div>
            <Label className="mb-2 block">Nama Keterangan</Label>
            <Input
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder="Contoh: Aktif"
              className="h-12 rounded-full transition-all duration-200 hover:border-violet-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/30 placeholder:text-zinc-400"
            />
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Masukkan keterangan yang akan digunakan pada arsip.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-8 py-5">
          <Button
            variant="outline"
            className="h-11 rounded-full cursor-pointer px-5 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>
          <Button
            className="h-11 rounded-full bg-violet-500 px-5 shadow-md shadow-violet-200 dark:shadow-violet-900/30 cursor-pointer hover:bg-violet-600 hover:scale-105 active:scale-95 transition-all duration-200"
            onClick={() => {
              if (!kode.trim() || !keterangan.trim()) return
              onSubmit(kode, keterangan)
              onOpenChange(false)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            {isEdit ? 'Update Keterangan' : 'Simpan Keterangan'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
