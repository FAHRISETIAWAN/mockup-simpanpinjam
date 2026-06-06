'use client'

import { Icon } from '@iconify/react'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
  kode: string
  nama: string
  jumlah: number
  tanggalPinjam: string
  tanggalKembali: string
}

export default function ETicketDialog({
  open,
  onOpenChange,
  kode,
  nama,
  jumlah,
  tanggalPinjam,
  tanggalKembali,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        showCloseButton={false}
        className="
          border-0
          bg-transparent
          p-0
          shadow-none
          sm:max-w-md
        "
      >
        {/* Accessibility */}
        <DialogTitle className="sr-only">
          E-Tiket Peminjaman
        </DialogTitle>

        <DialogDescription className="sr-only">
          Detail tiket peminjaman arsip SITAKJUP
        </DialogDescription>

        <div
          className="
            relative
            overflow-hidden
            rounded-[36px]
            border
            border-zinc-200
            bg-white
            shadow-2xl
            dark:border-zinc-800
            dark:bg-zinc-900
          "
        >
          {/* Left Cut */}
          <div
            className="
              absolute
              left-0
              top-1/3
              h-8
              w-8
              -translate-x-1/2
              rounded-full
              bg-background
            "
          />

          {/* Right Cut */}
          <div
            className="
              absolute
              right-0
              top-1/3
              h-8
              w-8
              translate-x-1/2
              rounded-full
              bg-background
            "
          />

          <div className="p-8">
            {/* Header */}
            <div className="text-center">
              <div
                className="
                  mx-auto
                  mb-4
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-orange-100
                  text-orange-500
                  dark:bg-orange-900/30
                "
              >
                <Icon
                  icon="mdi:ticket-confirmation"
                  className="h-8 w-8"
                />
              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  text-zinc-900
                  dark:text-white
                "
              >
                Peminjaman Berhasil
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-zinc-500
                  dark:text-zinc-400
                "
              >
                Tiket peminjaman berhasil dibuat
              </p>
            </div>

            {/* Separator */}
            <div className="my-6 border-t border-dashed border-zinc-300 dark:border-zinc-700" />

            {/* Info */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <Info
                label="Kode"
                value={kode}
              />

              <Info
                label="Status"
                value="PENGAJUAN"
              />

              <Info
                label="Peminjam"
                value={nama}
              />

              <Info
                label="Jumlah Arsip"
                value={`${jumlah} Berkas`}
              />

              <Info
                label="Tgl Pinjam"
                value={tanggalPinjam}
              />

              <Info
                label="Tgl Kembali"
                value={tanggalKembali}
              />
            </div>

            {/* Separator */}
            <div className="my-6 border-t border-dashed border-zinc-300 dark:border-zinc-700" />

            {/* QR */}
            <div className="flex flex-col items-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${kode}`}
                alt={kode}
                className="h-44 w-44"
              />

              <p
                className="
                  mt-3
                  font-mono
                  text-sm
                  font-semibold
                  text-zinc-900
                  dark:text-white
                "
              >
                {kode}
              </p>
            </div>
          </div>

          {/* Bottom Perforation */}
          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              flex
              justify-between
              px-3
              translate-y-1/2
            "
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="
                  h-6
                  w-6
                  rounded-full
                  bg-background
                "
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Info({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <p
        className="
          text-[11px]
          uppercase
          tracking-wider
          text-zinc-500
          dark:text-zinc-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-sm
          font-semibold
          text-zinc-900
          dark:text-white
        "
      >
        {value}
      </p>
    </div>
  )
}