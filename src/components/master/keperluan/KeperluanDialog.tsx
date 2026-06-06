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
  initialValue?: string
  onSubmit: (value: string) => void
}

export default function KeperluanDialog({
  open,
  onOpenChange,
  initialValue,
  onSubmit,
}: Props) {
  const [keperluan, setKeperluan] =
    useState('')

  useEffect(() => {
    setKeperluan(initialValue || '')
  }, [initialValue])

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="
          overflow-hidden

          rounded-3xl

          p-0

          sm:max-w-lg
        "
      >
        {/* HEADER */}
        <DialogHeader
          className="


            bg-orange-50
          dark:bg-orange-950/30

            px-8
            py-6
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-14
                w-14

                items-center
                justify-center

                rounded-2xl

                bg-orange-100
                dark:bg-orange-900/50

                text-orange-600
                dark:text-orange-400
              "
            >
              <Icon
                icon="solar:document-add-outline"
                className="h-7 w-7"
              />
            </div>

            <div>
              

              <DialogTitle className="text-xl">
                {initialValue
                  ? 'Edit Keperluan'
                  : 'Tambah Keperluan'}
              </DialogTitle>

              <DialogDescription className="mt-1">
                Kelola data keperluan peminjaman.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* CONTENT */}
        <div className="px-8 py-6">
          <div>
            <Label className="mb-2 block">
              Nama Keperluan
            </Label>

            <Input
              value={keperluan}
              onChange={(e) =>
                setKeperluan(
                  e.target.value
                )
              }
              placeholder="Contoh: Pengukuran"
              className="
                h-12
                rounded-full

                transition-all
                duration-200

                hover:border-orange-400

                focus:border-orange-500
                focus:ring-4
                focus:ring-orange-100

                placeholder:text-zinc-400
              "
            />

            <p className="mt-2 text-xs text-zinc-500">
              Masukkan nama keperluan yang
              akan digunakan pada proses
              peminjaman.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div
            className="
                flex
                justify-end
                gap-3



                px-8
                py-5
            "
            >
            <Button
                variant="outline"
                className="
                h-11
                rounded-full
                cursor-pointer
                px-5
                "
                onClick={() =>
                onOpenChange(false)
                }
            >
                Batal
            </Button>

            <Button
                className="
                h-11

                rounded-full

                bg-orange-500

                px-5

                shadow-md
                shadow-orange-200
                cursor-pointer
                hover:bg-orange-600
                "
                onClick={() => {
                onSubmit(keperluan)
                onOpenChange(false)
                }}
            >
                <Plus className="mr-2 h-4 w-4" />

                {initialValue
                ? 'Update Keperluan'
                : 'Simpan Keperluan'}
            </Button>
            </div>
      </DialogContent>
    </Dialog>
  )
}