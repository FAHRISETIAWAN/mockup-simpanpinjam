'use client'

import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

const data = [
  { id: 1, kode: 'PMJ-20260530-001', nama: 'Rakjat',       jumlah: 3, tanggal: '30 Mei 2026' },
  { id: 2, kode: 'PMJ-20260530-002', nama: 'Budi Santoso', jumlah: 2, tanggal: '30 Mei 2026' },
  { id: 3, kode: 'PMJ-20260530-003', nama: 'Siti Rahma',   jumlah: 5, tanggal: '29 Mei 2026' },
]

interface Props {
  onDetail: (item: any) => void
}

export default function PengembalianTable({ onDetail }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 transition-colors duration-300 sm:rounded-[32px]">
      <div className="border-b border-zinc-100 dark:border-zinc-800 px-4 py-4 sm:px-6 sm:py-5">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-white sm:text-lg">Daftar Pengembalian</h2>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">Menampilkan {data.length} data pengembalian</p>
      </div>

      {/* MOBILE CARDS */}
      <div className="block space-y-3 p-4 sm:hidden">
        {data.map((item) => (
          <div key={item.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 transition-colors duration-200">
            <div className="inline-flex rounded-full bg-orange-100 dark:bg-orange-900/40 px-3 py-1 text-xs font-semibold text-orange-700 dark:text-orange-400">{item.kode}</div>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Nama Peminjam</p>
                <p className="font-medium text-zinc-800 dark:text-white">{item.nama}</p>
              </div>
              <span className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900/40 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-400">{item.jumlah} Arsip</span>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Tanggal Pengembalian</p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">{item.tanggal}</p>
              </div>
            </div>
            <Button onClick={() => onDetail(item)} className="mt-4 h-11 w-full cursor-pointer rounded-xl bg-green-500 text-white shadow-sm shadow-green-200 dark:shadow-green-900/30 hover:bg-green-600 transition-all duration-200">
              <Eye className="mr-2 h-4 w-4" />Lihat Detail
            </Button>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full">
          <thead>
            <tr className="bg-orange-50/70 dark:bg-orange-950/20">
              {['Kode Peminjaman','Nama Peminjam','Jumlah','Tanggal','Aksi'].map((h, i) => (
                <th key={h} className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 ${i === 2 ? 'text-center' : i === 4 ? 'text-right' : 'text-left'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b border-zinc-100 dark:border-zinc-800 transition-all duration-200 hover:bg-orange-50/30 dark:hover:bg-orange-950/10 last:border-0">
                <td className="px-6 py-4"><span className="inline-flex items-center rounded-full bg-orange-100 dark:bg-orange-900/40 px-3 py-1.5 text-sm font-semibold text-orange-700 dark:text-orange-400">{item.kode}</span></td>
                <td className="px-6 py-4 font-medium text-zinc-700 dark:text-zinc-300">{item.nama}</td>
                <td className="px-6 py-4 text-center"><span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/40 px-3 py-1.5 text-sm font-semibold text-blue-700 dark:text-blue-400">{item.jumlah} Arsip</span></td>
                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{item.tanggal}</td>
                <td className="px-6 py-4 text-right">
                  <Button size="sm" onClick={() => onDetail(item)} className="h-9 cursor-pointer rounded-full bg-green-500 px-4 text-white shadow-sm shadow-green-200 dark:shadow-green-900/30 hover:bg-green-600 transition-all duration-200 hover:scale-105 active:scale-95">
                    <Eye className="mr-1.5 h-4 w-4" />Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
