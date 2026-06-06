'use client'

import { useState, useEffect } from 'react'
import { Check, X } from 'lucide-react'
import { useMediaQuery } from '@/hooks/use-media-query'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import StatusBadge, { StatusType } from '@/components/status/status-badge'
import TolakDialog from '../verifikasi/TolakDialog'

interface ArsipItem {
  id: number
  nomorHak: string
  kecamatan: string
  desa: string
  keperluan: string
  status: StatusType
  keteranganTolak: string
}

const initialDetailArsip: ArsipItem[] = [
  { id: 1, nomorHak: 'HGB 123456', kecamatan: 'Pademangan',   desa: 'Ancol',        keperluan: 'Sengketa',       status: 'DIPINJAM', keteranganTolak: '' },
  { id: 2, nomorHak: 'HGB 654321', kecamatan: 'Tanjung Priok',desa: 'Sunter',       keperluan: 'Pengukuran',     status: 'DIPINJAM', keteranganTolak: '' },
  { id: 3, nomorHak: 'HGB 777888', kecamatan: 'Koja',         desa: 'Koja Selatan', keperluan: 'Permohonan Hak', status: 'DIPINJAM', keteranganTolak: '' },
]

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: any
}

export default function PengembalianDetailSheet({ open, onOpenChange, data }: Props) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [detailArsip, setDetailArsip] = useState(initialDetailArsip)
  const [tolakOpen, setTolakOpen]     = useState(false)
  const [tolakTarget, setTolakTarget] = useState<ArsipItem | null>(null)

  useEffect(() => {
    if (!open) setDetailArsip(initialDetailArsip)
  }, [open])

  const kembalikan = (id: number) => {
    setDetailArsip((prev) => prev.map((item) => item.id === id ? { ...item, status: 'PENGEMBALIAN' as StatusType, keteranganTolak: '' } : item))
  }

  const openTolak = (item: ArsipItem) => {
    setTolakTarget(item)
    setTolakOpen(true)
  }

  const confirmTolak = (keterangan: string) => {
    if (!tolakTarget) return
    setDetailArsip((prev) => prev.map((item) => item.id === tolakTarget.id ? { ...item, status: 'DITOLAK' as StatusType, keteranganTolak: keterangan } : item))
    setTolakTarget(null)
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side={isDesktop ? 'right' : 'bottom'}
          className={`flex flex-col p-0 ${isDesktop ? 'w-screen max-w-none' : 'h-[85vh] rounded-t-[32px]'}`}
        >
          {!isDesktop && (
            <div className="mx-auto mt-3 mb-1 h-1.5 w-14 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}

          <SheetHeader className="shrink-0 border-b border-zinc-100 dark:border-zinc-800 px-4 pt-4 pb-5 lg:px-6">
            <SheetTitle className="text-zinc-900 dark:text-white">Detail Pengembalian Arsip</SheetTitle>
            <SheetDescription className="mt-1 dark:text-zinc-400">
              Kode Peminjaman:{' '}
              <span className="font-semibold text-orange-600 dark:text-orange-400">{data?.kode}</span>
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-3 py-4 lg:px-4 lg:py-6">
            <div className="overflow-hidden rounded-[28px] bg-white dark:bg-zinc-800/60 transition-colors duration-300">
              <div className="border-b border-zinc-100 dark:border-zinc-700 px-6 py-5">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Daftar Arsip</h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Total {detailArsip.length} arsip yang dikembalikan</p>
              </div>

              {/* DESKTOP TABLE */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="bg-orange-50/70 dark:bg-orange-950/20">
                      {['Nomor Hak','Kecamatan','Desa','Keperluan','Status','Keterangan Penolakan','Aksi'].map((h) => (
                        <th key={h} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {detailArsip.map((item) => (
                      <tr key={item.id} className="border-b border-zinc-100 dark:border-zinc-700 transition-all duration-200 hover:bg-orange-50/20 dark:hover:bg-orange-950/10 last:border-0">
                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-full bg-orange-100 dark:bg-orange-900/40 px-3 py-1.5 text-sm font-semibold text-orange-700 dark:text-orange-400">{item.nomorHak}</span>
                        </td>
                        <td className="px-6 py-4 font-medium text-zinc-700 dark:text-zinc-300">{item.kecamatan}</td>
                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{item.desa}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900/40 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-400">{item.keperluan}</span>
                        </td>
                        <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                        <td className="px-6 py-4">
                          {item.keteranganTolak
                            ? <span className="inline-flex rounded-full bg-red-100 dark:bg-red-900/40 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-400">{item.keteranganTolak}</span>
                            : <span className="text-xs text-zinc-400 dark:text-zinc-600">—</span>
                          }
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => kembalikan(item.id)}
                              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 ${
                                item.status === 'PENGEMBALIAN'
                                  ? 'bg-green-500 text-white shadow-md shadow-green-200 dark:shadow-green-900/40'
                                  : 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-400 dark:hover:bg-green-900/60'
                              }`}
                            >
                              <Check className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => openTolak(item)}
                              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 ${
                                item.status === 'DITOLAK'
                                  ? 'bg-red-500 text-white shadow-md shadow-red-200 dark:shadow-red-900/40'
                                  : 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400 dark:hover:bg-red-900/60'
                              }`}
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS */}
              <div className="space-y-4 p-4 lg:hidden">
                {detailArsip.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 transition-colors duration-200">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex rounded-full bg-orange-100 dark:bg-orange-900/40 px-3 py-1.5 text-sm font-semibold text-orange-700 dark:text-orange-400">{item.nomorHak}</span>
                        <StatusBadge status={item.status} />
                      </div>
                      <div>
                        <p className="font-medium text-zinc-800 dark:text-white">{item.desa}</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Kecamatan {item.kecamatan}</p>
                      </div>
                      <span className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900/40 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-400">{item.keperluan}</span>
                      {item.keteranganTolak && (
                        <div className="rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 px-3 py-2">
                          <p className="text-xs text-red-600 dark:text-red-400 font-medium">Alasan: {item.keteranganTolak}</p>
                        </div>
                      )}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => kembalikan(item.id)}
                          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-medium transition-all duration-200 ${
                            item.status === 'PENGEMBALIAN'
                              ? 'bg-green-500 text-white shadow-sm'
                              : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-400 dark:hover:bg-green-900/60'
                          }`}
                        >
                          <Check className="h-4 w-4" />Kembalikan
                        </button>
                        <button
                          onClick={() => openTolak(item)}
                          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-medium transition-all duration-200 ${
                            item.status === 'DITOLAK'
                              ? 'bg-red-500 text-white shadow-sm'
                              : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400 dark:hover:bg-red-900/60'
                          }`}
                        >
                          <X className="h-4 w-4" />Tolak
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <SheetFooter className="shrink-0 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-4 lg:px-6">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="h-12 cursor-pointer rounded-2xl px-6 border-zinc-200 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all duration-200">
                Tutup
              </Button>
              <Button className="h-12 cursor-pointer rounded-2xl bg-orange-500 px-8 font-medium hover:bg-orange-600 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-orange-200 dark:shadow-orange-900/30">
                Simpan Pengembalian
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <TolakDialog
        open={tolakOpen}
        onOpenChange={setTolakOpen}
        itemKode={tolakTarget?.nomorHak}
        onConfirm={confirmTolak}
      />
    </>
  )
}
