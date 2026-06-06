'use client'
import { useState } from 'react'

import { FileText, User, Calendar, Tag, Hash,  Download, Printer, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { useMediaQuery } from '@/hooks/use-media-query'
import { downloadLoanPdf } from '@/components/print/download-loan-pdf'
import ETicketDialog from './ETicketDialog'

import clsx from 'clsx'

const statusColor = (s: string) => {
  switch (s) {
    case 'PENGAJUAN': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'
    case 'DISETUJUI': return 'bg-green-100  text-green-700  dark:bg-green-900/40  dark:text-green-400'
    case 'DIPINJAM':  return 'bg-blue-100   text-blue-700   dark:bg-blue-900/40   dark:text-blue-400'
    case 'SELESAI':   return 'bg-zinc-100   text-zinc-700   dark:bg-zinc-700      dark:text-zinc-300'
    case 'DITOLAK':   return 'bg-red-100    text-red-700    dark:bg-red-900/40    dark:text-red-400'
    default:          return 'bg-zinc-100   text-zinc-700   dark:bg-zinc-700      dark:text-zinc-300'
  }
}

const dummyArsip = [
  { nomorHak: 'HGB 123456', desa: 'Ancol',        kecamatan: 'Pademangan',   keperluan: 'Sengketa',       tanggalPinjam: '30 Mei 2026', tanggalKembali: '06 Juni 2026' },
  { nomorHak: 'HM 654321',  desa: 'Sunter',        kecamatan: 'Tanjung Priok',keperluan: 'Pengukuran',     tanggalPinjam: '30 Mei 2026', tanggalKembali: '06 Juni 2026' },
  { nomorHak: 'HM 789012',  desa: 'Koja Selatan',  kecamatan: 'Koja',         keperluan: 'Pengecekan',     tanggalPinjam: '30 Mei 2026', tanggalKembali: '06 Juni 2026' },
  { nomorHak: 'SHM 001122', desa: 'Tanjung Priok', kecamatan: 'Tanjung Priok',keperluan: 'Peralihan Hak',  tanggalPinjam: '30 Mei 2026', tanggalKembali: '06 Juni 2026' },
  { nomorHak: 'SHM 334455', desa: 'Cilincing',     kecamatan: 'Cilincing',    keperluan: 'Permohonan Hak', tanggalPinjam: '30 Mei 2026', tanggalKembali: '06 Juni 2026' },
]

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
  item: any | null
}

export default function ReportDetailSheet({
  open,
  onOpenChange,
  item,
}: Props) {
  const isDesktop = useMediaQuery(
    '(min-width: 1024px)'
  )

  const [ticketOpen, setTicketOpen] =
    useState(false)

  if (!item) {
    return null
  }

  const arsip = dummyArsip.slice(
    0,
    Math.min(
      item.jumlah,
      dummyArsip.length
    )
  )

  return (
    <>
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
          side={isDesktop ? 'right' : 'bottom'}
          className={`flex flex-col p-0 ${isDesktop ? 'w-screen max-w-none' : 'h-[85vh] rounded-t-[32px]'}`}
        >
        {/* drag handle */}
        <div className="mx-auto mt-3 mb-1 h-1.5 w-14 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />

        {/* header */}
        <SheetHeader className="shrink-0  px-6 pt-3 pb-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400">
                <FileText size={18} />
              </div>
              <div>
                <SheetTitle>Detail Peminjaman</SheetTitle>
                <SheetDescription className="font-mono text-xs">{item.kode}</SheetDescription>
              </div>
            </div>
            <span className={clsx('inline-flex rounded-full px-3 py-1 text-xs font-semibold', statusColor(item.status))}>
              {item.status}
            </span>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-5 space-y-6">

            {/* info cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: User,     label: 'Peminjam',       value: item.nama },
                { icon: Hash,     label: 'Jumlah Arsip',   value: `${item.jumlah} berkas` },
                { icon: Calendar, label: 'Tanggal Pinjam', value: item.tanggalPinjam },
                { icon: Calendar, label: 'Tanggal Kembali',value: item.tanggalKembali },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/60 p-4">
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400">
                    <Icon size={14} />
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-zinc-900 dark:text-white">{value}</p>
                </div>
              ))}
            </div>

            {/* full table */}
            <div className="rounded-2xl  overflow-hidden">

            <div className="flex items-center gap-2  px-6 py-4">
              <Tag size={15} className="text-orange-500" />

              <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">
                Daftar Arsip

                <span
                  className="
                    ml-2
                    inline-flex
                    h-5
                    min-w-[20px]
                    items-center
                    justify-center
                    rounded-full
                    bg-orange-100
                    dark:bg-orange-900/40
                    px-1.5
                    text-[11px]
                    font-bold
                    text-orange-600
                    dark:text-orange-400
                  "
                >
                  {arsip.length}
                </span>
              </h3>
            </div>

            {/* MOBILE */}
            <div className="block lg:hidden p- space-y-3">
              {arsip.map((a, i) => (
                <div
                  key={i}
                  className="
                    rounded-2xl
                    border
                    border-orange-200
                    dark:border-orange-800
                    bg-orange-50
                    dark:bg-orange-800/30
                    p-4
                  "
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="
                        rounded-full
                        bg-orange-100
                        dark:bg-orange-900/40
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-orange-700
                        dark:text-orange-400
                      "
                    >
                      {a.nomorHak}
                    </span>

                    <span
                      className="
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-full
                        bg-orange-200
                        dark:bg-orange-700
                        text-xs
                        font-bold
                      "
                    >
                      {i + 1}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">

                    <div>
                      <p className="text-[11px] text-zinc-500">
                        Desa
                      </p>

                      <p className="text-sm font-medium">
                        {a.desa}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] text-zinc-500">
                        Kecamatan
                      </p>

                      <p className="text-sm font-medium">
                        {a.kecamatan}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] text-zinc-500">
                        Tanggal Pinjam
                      </p>

                      <p className="text-sm">
                        {a.tanggalPinjam}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] text-zinc-500">
                        Tanggal Kembali
                      </p>

                      <p className="text-sm">
                        {a.tanggalKembali}
                      </p>
                    </div>

                  </div>

                  <div className="mt-3">
                    <span
                      className="
                        inline-flex
                        rounded-full
                        bg-violet-100
                        dark:bg-violet-900/40
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-violet-700
                        dark:text-violet-400
                      "
                    >
                      {a.keperluan}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-orange-50/60 dark:bg-orange-950/10">
                    {[
                      'No.',
                      'Nomor Hak',
                      'Desa / Kelurahan',
                      'Kecamatan',
                      'Keperluan',
                      'Tgl Pinjam',
                      'Tgl Kembali',
                    ].map((h) => (
                      <th
                        key={h}
                        className="
                          px-5
                          py-3
                          text-left
                          text-xs
                          font-semibold
                          uppercase
                          tracking-wider
                          text-zinc-500
                          dark:text-zinc-400
                        "
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {arsip.map((a, i) => (
                    <tr
                      key={i}
                      className="
                        border-b
                        border-zinc-100
                        dark:border-zinc-800
                        last:border-0
                      "
                    >
                      <td className="px-5 py-3.5">
                        {i + 1}
                      </td>

                      <td className="px-5 py-3.5">
                        <span
                          className="
                            inline-flex
                            rounded-full
                            bg-orange-100
                            dark:bg-orange-900/40
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-orange-700
                            dark:text-orange-400
                          "
                        >
                          {a.nomorHak}
                        </span>
                      </td>

                      <td className="px-5 py-3.5">
                        {a.desa}
                      </td>

                      <td className="px-5 py-3.5">
                        {a.kecamatan}
                      </td>

                      <td className="px-5 py-3.5">
                        <span
                          className="
                            inline-flex
                            rounded-full
                            bg-violet-100
                            dark:bg-violet-900/40
                            px-3
                            py-1
                            text-xs
                          "
                        >
                          {a.keperluan}
                        </span>
                      </td>

                      <td className="px-5 py-3.5">
                        {a.tanggalPinjam}
                      </td>

                      <td className="px-5 py-3.5">
                        {a.tanggalKembali}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </div>

    <div className="shrink-0 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4">

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

        <Button
          className="
            h-11
            rounded-full
            cursor-pointer
            bg-orange-500
            px-5
            text-white
            transition-all
            duration-200
            hover:bg-orange-600
            hover:scale-[1.02]
            active:scale-95
          "
         onClick={() => setTicketOpen(true)}
        >
          <Printer className="mr-2 h-4 w-4" />
          Cetak Tiket
        </Button>

        <Button
          className="
            h-11
            cursor-pointer
            rounded-full
            bg-green-500
            px-5
            text-white
            transition-all
            duration-200
            hover:bg-green-600
            hover:scale-[1.02]
            active:scale-95
          "
         onClick={() =>
            downloadLoanPdf(
              arsip,
              item.kode,
              item.tanggalPinjam,
              item.nama
            )
          }
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>

        <Button
          variant="outline"
          className="
            h-11
            cursor-pointer
            rounded-full
            px-5
            transition-all
            duration-200
            hover:scale-[1.02]
            active:scale-95
          "
          onClick={() => onOpenChange(false)}
        >
          <X className="mr-2 h-4 w-4" />
          Tutup
        </Button>

      </div>

    </div>
      </SheetContent>
    </Sheet>
    <ETicketDialog
    open={ticketOpen}
    onOpenChange={setTicketOpen}
    kode={item.kode}
    nama={item.nama}
    jumlah={item.jumlah}
    tanggalPinjam={item.tanggalPinjam}
    tanggalKembali={item.tanggalKembali}
  />
</>
  )
}
