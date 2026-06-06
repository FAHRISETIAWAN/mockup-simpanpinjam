'use client'

import { useState } from 'react'
import { Eye, Search, X, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import clsx from 'clsx'
import { useMediaQuery } from '@/hooks/use-media-query'
import ReportFilterSheet from './ReportFilterSheet'
import ReportDetailSheet from './ReportDetailSheet'

const ALL_DATA = [
  { id: 1, kode: 'PMJ-20260530-001', nama: 'Rakjat',       jumlah: 3, tanggalPinjam: '30 Mei 2026',  tanggalKembali: '06 Juni 2026', keperluan: 'Sengketa',       status: 'DIPINJAM',  tahun: '2026' },
  { id: 2, kode: 'PMJ-20260528-002', nama: 'Budi Santoso', jumlah: 5, tanggalPinjam: '28 Mei 2026',  tanggalKembali: '04 Juni 2026', keperluan: 'Pengukuran',     status: 'SELESAI',   tahun: '2026' },
  { id: 3, kode: 'PMJ-20260510-003', nama: 'Siti Rahma',   jumlah: 2, tanggalPinjam: '10 Mei 2026',  tanggalKembali: '17 Mei 2026',  keperluan: 'Pengecekan',     status: 'SELESAI',   tahun: '2026' },
  { id: 4, kode: 'PMJ-20260601-004', nama: 'Ahmad Fauzi',  jumlah: 1, tanggalPinjam: '01 Juni 2026', tanggalKembali: '08 Juni 2026', keperluan: 'Permohonan Hak', status: 'PENGAJUAN', tahun: '2026' },
]

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

export default function ReportTable() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // search
  const [search, setSearch] = useState('')

  // filter sheet
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterTahun,     setFilterTahun]     = useState<any>(null)
  const [filterKeperluan, setFilterKeperluan] = useState<any>(null)
  const [filterStatus,    setFilterStatus]    = useState<any>(null)
  const [tmpTahun,        setTmpTahun]        = useState<any>(null)
  const [tmpKeperluan,    setTmpKeperluan]    = useState<any>(null)
  const [tmpStatus,       setTmpStatus]       = useState<any>(null)

  // detail sheet
  const [detailOpen, setDetailOpen] = useState(false)
  const [detailItem, setDetailItem] = useState<any>(null)

  const openFilter = () => {
    setTmpTahun(filterTahun)
    setTmpKeperluan(filterKeperluan)
    setTmpStatus(filterStatus)
    setFilterOpen(true)
  }

  const applyFilter = () => {
    setFilterTahun(tmpTahun)
    setFilterKeperluan(tmpKeperluan)
    setFilterStatus(tmpStatus)
    setFilterOpen(false)
  }

  const resetTmp = () => { setTmpTahun(null); setTmpKeperluan(null); setTmpStatus(null) }
  const clearAll = () => { setFilterTahun(null); setFilterKeperluan(null); setFilterStatus(null) }

  const activeCount = [filterTahun, filterKeperluan, filterStatus].filter(Boolean).length

  const filtered = ALL_DATA.filter((item) => {
    const q = search.toLowerCase()
    if (q && !item.kode.toLowerCase().includes(q) && !item.nama.toLowerCase().includes(q)) return false
    if (filterTahun     && item.tahun     !== filterTahun.value)     return false
    if (filterKeperluan && item.keperluan !== filterKeperluan.value) return false
    if (filterStatus    && item.status    !== filterStatus.value)    return false
    return true
  })

  const openDetail = (item: any) => { setDetailItem(item); setDetailOpen(true) }

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 transition-colors duration-300 sm:rounded-[32px]">
        {/* HEADER */}
        <div className="flex flex-col gap-3 border-b border-zinc-100 dark:border-zinc-800 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-white sm:text-lg">Daftar Peminjaman</h2>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
                Menampilkan {filtered.length} dari {ALL_DATA.length} data
              </p>
            </div>
            <div className="flex items-center gap-2">
              {activeCount > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1.5 rounded-full border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30 px-3 py-2 text-xs font-medium text-orange-600 dark:text-orange-400 transition-all hover:bg-orange-100"
                >
                  <X size={12} />Reset ({activeCount})
                </button>
              )}
              <Button
                onClick={openFilter}
                variant="outline"
                className={clsx(
                  'h-10 cursor-pointer rounded-xl transition-all duration-200 sm:rounded-full',
                  activeCount > 0
                    ? 'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400'
                    : 'border-zinc-200 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800'
                )}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter
                {activeCount > 0 && (
                  <span className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                    {activeCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kode peminjaman atau nama..."
              className="h-11 rounded-xl pl-11 border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all duration-200 focus:border-orange-400 dark:focus:border-orange-600 focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-900/30 sm:rounded-full"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="block space-y-3 p-4 sm:hidden">
          {filtered.length === 0
            ? <p className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">Tidak ada data</p>
            : filtered.map((item) => (
            <div key={item.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="inline-flex rounded-full bg-orange-100 dark:bg-orange-900/40 px-3 py-1 text-xs font-semibold text-orange-700 dark:text-orange-400">{item.kode}</div>
                <span className={clsx('inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold', statusColor(item.status))}>{item.status}</span>
              </div>
              <div className="mt-3 space-y-2">
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Nama Peminjam</p>
                  <p className="font-medium text-zinc-800 dark:text-white">{item.nama}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900/40 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-400">{item.jumlah} Arsip</span>
                  <span className="inline-flex rounded-full bg-violet-100 dark:bg-violet-900/40 px-3 py-1 text-xs font-semibold text-violet-700 dark:text-violet-400">{item.keperluan}</span>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Tgl Pinjam – Kembali</p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">{item.tanggalPinjam} → {item.tanggalKembali}</p>
                </div>
              </div>
              <Button
                onClick={() => openDetail(item)}
                className="mt-4 h-11 w-full cursor-pointer rounded-xl bg-green-500 shadow-sm shadow-green-200 dark:shadow-green-900/30 hover:bg-green-600 transition-all duration-200"
              >
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
                {['Kode Peminjaman','Nama Peminjam','Jumlah','Keperluan','Status','Tgl Pinjam','Tgl Kembali','Detail'].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 last:text-center">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0
                ? <tr><td colSpan={8} className="px-6 py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">Tidak ada data</td></tr>
                : filtered.map((item) => (
                <tr key={item.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-orange-50/20 dark:hover:bg-orange-950/10 transition-all duration-200 last:border-0">
                  <td className="px-6 py-4"><span className="inline-flex rounded-full bg-orange-100 dark:bg-orange-900/40 px-3 py-1.5 text-sm font-semibold text-orange-700 dark:text-orange-400">{item.kode}</span></td>
                  <td className="px-6 py-4 font-medium text-zinc-700 dark:text-zinc-300">{item.nama}</td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900/40 px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-400">{item.jumlah}</span></td>
                  <td className="px-6 py-4"><span className="inline-flex rounded-full bg-violet-100 dark:bg-violet-900/40 px-3 py-1 text-xs font-medium text-violet-700 dark:text-violet-400">{item.keperluan}</span></td>
                  <td className="px-6 py-4"><span className={clsx('inline-flex rounded-full px-3 py-1 text-xs font-semibold', statusColor(item.status))}>{item.status}</span></td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{item.tanggalPinjam}</td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{item.tanggalKembali}</td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      size="sm"
                      onClick={() => openDetail(item)}
                      className="cursor-pointer rounded-full bg-green-500 hover:bg-green-600 shadow-sm shadow-green-200 dark:shadow-green-900/30 transition-all duration-200 hover:scale-105"
                    >
                      <Eye className="mr-1 h-4 w-4" />Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ReportFilterSheet
        open={filterOpen}
        onOpenChange={setFilterOpen}
        tmpTahun={tmpTahun}
        tmpKeperluan={tmpKeperluan}
        tmpStatus={tmpStatus}
        setTmpTahun={setTmpTahun}
        setTmpKeperluan={setTmpKeperluan}
        setTmpStatus={setTmpStatus}
        onApply={applyFilter}
        onReset={resetTmp}
      />

      <ReportDetailSheet
        open={detailOpen}
        onOpenChange={setDetailOpen}
        item={detailItem}
      />
    </>
  )
}
