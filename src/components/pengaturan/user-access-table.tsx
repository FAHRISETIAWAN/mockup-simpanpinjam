'use client'

import { useState } from 'react'
import { Pencil, ShieldCheck, Eye, Check, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import clsx from 'clsx'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Icon } from '@iconify/react'
import { useMediaQuery } from '@/hooks/use-media-query'

const roleColor = (role: string) => {
  switch (role) {
    case 'Administrator': return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
    case 'Operator':      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
    case 'Petugas':       return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
    default:              return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
  }
}

const ALL_KEPERLUAN = ['Sengketa', 'Pengukuran', 'Permohonan Hak', 'Pengecekan', 'Peralihan Hak']
const ROLES = ['Administrator', 'Operator', 'Petugas']

const initialData = [
  { id: 1, nip: '198902012015031001', nama: 'Rakjat',       role: 'Administrator', berlaku: '01 Jun 2026', expired: '31 Des 2026', keperluan: ALL_KEPERLUAN },
  { id: 2, nip: '198905022015031002', nama: 'Budi Santoso', role: 'Operator',      berlaku: '01 Jun 2026', expired: '31 Des 2026', keperluan: ['Pengukuran', 'Pengecekan'] },
  { id: 3, nip: '199001032015032003', nama: 'Siti Rahma',   role: 'Petugas',       berlaku: '01 Jun 2026', expired: '31 Des 2026', keperluan: ['Pengecekan'] },
]

interface AccessItem {
  id: number; nip: string; nama: string; role: string; berlaku: string; expired: string; keperluan: string[]
}

// ── Multi-select dropdown ─────────────────────────────────────────────────────
function KeperluanDropdown({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false)

  const toggle = (k: string) =>
    onChange(value.includes(k) ? value.filter((x) => x !== k) : [...value, k])

  const label =
    value.length === 0 ? 'Pilih Keperluan'
    : value.length === ALL_KEPERLUAN.length ? 'Semua Keperluan'
    : value.length === 1 ? value[0]
    : `${value.length} keperluan dipilih`

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-12 w-full items-center justify-between rounded-full border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-4 text-sm text-zinc-900 dark:text-white transition-all duration-200 hover:border-orange-400 dark:hover:border-orange-600 focus:outline-none"
      >
        <span className={value.length === 0 ? 'text-zinc-400 dark:text-zinc-500' : ''}>{label}</span>
        <ChevronDown size={16} className={clsx('text-zinc-400 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg dark:shadow-zinc-900/80">
            {ALL_KEPERLUAN.map((k) => {
              const active = value.includes(k)
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => toggle(k)}
                  className="flex w-full items-center justify-between px-4 py-3 text-sm text-left hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-colors duration-150"
                >
                  <span className={active ? 'font-medium text-orange-600 dark:text-orange-400' : 'text-zinc-700 dark:text-zinc-300'}>
                    {k}
                  </span>
                  {active && <Check size={14} className="text-orange-500 dark:text-orange-400" />}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

// ── Detail Sheet ──────────────────────────────────────────────────────────────
function DetailSheet({ item, open, onOpenChange, onEdit, isDesktop }: {
  item: AccessItem | null; open: boolean; onOpenChange: (v: boolean) => void; onEdit: () => void; isDesktop: boolean
}) {
  if (!item) return null
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
              <Icon icon="solar:user-id-bold" className="h-5 w-5" />
            </div>
            <div>
              <SheetTitle>Detail Akses</SheetTitle>
              <SheetDescription>{item.nama}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">NIP</p>
            <p className="mt-1 font-mono font-semibold text-zinc-900 dark:text-white">{item.nip}</p>
          </div>

          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Role</p>
            <span className={clsx('inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold', roleColor(item.role))}>
              <ShieldCheck size={14} />{item.role}
            </span>
          </div>

          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 p-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Akses Keperluan ({item.keperluan.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {item.keperluan.map((k) => (
                <span key={k} className="rounded-full bg-blue-100 dark:bg-blue-900/40 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-400">{k}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Berlaku</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">{item.berlaku}</p>
            </div>
            <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Expired</p>
              <span className="mt-1 inline-flex rounded-full bg-yellow-100 dark:bg-yellow-900/40 px-2.5 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-400">{item.expired}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4">
          <Button
            className="h-11 w-full cursor-pointer rounded-full bg-orange-500 shadow-md shadow-orange-200 dark:shadow-orange-900/30 hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            onClick={() => { onOpenChange(false); onEdit() }}
          >
            <Pencil className="mr-2 h-4 w-4" />Atur Akses
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// ── Access Dialog ─────────────────────────────────────────────────────────────
function AccessDialog({ open, onOpenChange, item, onSave }: {
  open: boolean; onOpenChange: (v: boolean) => void; item: AccessItem | null; onSave: (id: number, role: string, keperluan: string[]) => void
}) {
  const [role, setRole] = useState(item?.role || 'Operator')
  const [keperluan, setKeperluan] = useState<string[]>(item?.keperluan || [])

  // sync when item changes
  if (item && open && role !== item.role && keperluan !== item.keperluan) {
    setRole(item.role)
    setKeperluan(item.keperluan)
  }

  const handleSave = () => {
    if (!item) return
    onSave(item.id, role, keperluan)
    onOpenChange(false)
  }

  if (!item) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-3xl p-0 sm:max-w-lg">
        <DialogHeader className="bg-orange-50 dark:bg-orange-950/30 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400">
              <Icon icon="solar:shield-user-bold" className="h-7 w-7" />
            </div>
            <div>
              <DialogTitle className="text-xl">Atur Akses</DialogTitle>
              <DialogDescription className="mt-1">{item.nama}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 px-8 py-6">
          {/* ROLE */}
          <div>
            <Label className="mb-3 block text-zinc-700 dark:text-zinc-300">Role Pengguna</Label>
            <div className="flex flex-wrap gap-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer',
                    role === r
                      ? 'bg-orange-500 text-white shadow-sm shadow-orange-200 dark:shadow-orange-900/30 scale-105'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                  )}
                >
                  <ShieldCheck size={14} />{r}
                </button>
              ))}
            </div>
          </div>

          {/* KEPERLUAN DROPDOWN */}
          <div>
            <Label className="mb-2 block text-zinc-700 dark:text-zinc-300">
              Akses Keperluan
              {keperluan.length > 0 && (
                <span className="ml-2 text-xs font-normal text-zinc-400 dark:text-zinc-500">({keperluan.length} dipilih)</span>
              )}
            </Label>
            <KeperluanDropdown value={keperluan} onChange={setKeperluan} />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800 px-8 py-5">
          <Button
            variant="outline"
            className="h-11 rounded-full cursor-pointer px-5 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>
          <Button
            className="h-11 rounded-full bg-orange-500 px-5 shadow-md shadow-orange-200 dark:shadow-orange-900/30 cursor-pointer hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all duration-200"
            onClick={handleSave}
          >
            Simpan Akses
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── Main Table ────────────────────────────────────────────────────────────────
export default function UserAccessTable() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [data, setData] = useState<AccessItem[]>(initialData)
  const [editOpen,   setEditOpen]   = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [selected,   setSelected]   = useState<AccessItem | null>(null)

  const openDetail = (item: AccessItem) => { setSelected(item); setDetailOpen(true) }
  const openEdit   = (item: AccessItem) => { setSelected(item); setEditOpen(true) }

  const handleSave = (id: number, role: string, keperluan: string[]) =>
    setData((prev) => prev.map((item) => item.id === id ? { ...item, role, keperluan } : item))

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 transition-colors duration-300 sm:rounded-[32px]">
        {/* HEADER */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 px-4 py-4 sm:px-6 sm:py-5">
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-white sm:text-lg">Hak Akses Pengguna</h2>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">Kelola role dan akses keperluan tiap pengguna</p>
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="block space-y-3 p-4 sm:hidden">
          {data.map((item) => (
            <div key={item.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">{item.nama}</p>
                  <p className="mt-0.5 text-xs font-mono text-zinc-500 dark:text-zinc-400">{item.nip}</p>
                </div>
                <span className={clsx('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold', roleColor(item.role))}>
                  <ShieldCheck size={11} />{item.role}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.keperluan.slice(0, 2).map((k) => (
                  <span key={k} className="rounded-full bg-blue-100 dark:bg-blue-900/40 px-2.5 py-0.5 text-[11px] font-medium text-blue-700 dark:text-blue-400">{k}</span>
                ))}
                {item.keperluan.length > 2 && (
                  <span className="rounded-full bg-zinc-100 dark:bg-zinc-700 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-300">+{item.keperluan.length - 2} lainnya</span>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 h-9 rounded-xl cursor-pointer dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700" onClick={() => openDetail(item)}>
                  <Eye className="mr-1.5 h-4 w-4" />Detail
                </Button>
                <Button size="sm" className="flex-1 h-9 rounded-xl cursor-pointer bg-orange-500 shadow-sm shadow-orange-200 dark:shadow-orange-900/30 hover:bg-orange-600 transition-all duration-200" onClick={() => openEdit(item)}>
                  <Pencil className="mr-1.5 h-4 w-4" />Atur Akses
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full">
            <thead>
              <tr className="bg-orange-50/70 dark:bg-orange-950/20">
                {['NIP','Nama','Role','Keperluan','Berlaku','Expired','Aksi'].map((h, i) => (
                  <th key={h} className={clsx('px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400', i === 6 ? 'text-right' : 'text-left')}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-orange-50/20 dark:hover:bg-orange-950/10 transition-all duration-200 last:border-0">
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900/40 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 font-mono">{item.nip}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">{item.nama}</td>
                  <td className="px-6 py-4">
                    <span className={clsx('inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold', roleColor(item.role))}>
                      <ShieldCheck size={12} />{item.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap items-center gap-1">
                      {item.keperluan.slice(0, 2).map((k) => (
                        <span key={k} className="rounded-full bg-blue-100 dark:bg-blue-900/40 px-2.5 py-0.5 text-[11px] font-medium text-blue-700 dark:text-blue-400">{k}</span>
                      ))}
                      {item.keperluan.length > 2 && (
                        <button onClick={() => openDetail(item)} className="rounded-full bg-zinc-100 dark:bg-zinc-700 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600 cursor-pointer transition-colors">
                          +{item.keperluan.length - 2}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{item.berlaku}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-yellow-100 dark:bg-yellow-900/40 px-3 py-1.5 text-xs font-medium text-yellow-700 dark:text-yellow-400">{item.expired}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="h-9 cursor-pointer rounded-full px-3 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all duration-200" onClick={() => openDetail(item)}>
                        <Eye className="mr-1.5 h-4 w-4" />Detail
                      </Button>
                      <Button size="sm" className="h-9 cursor-pointer rounded-full bg-orange-500 px-4 shadow-sm shadow-orange-200 dark:shadow-orange-900/30 hover:bg-orange-600 hover:scale-105 transition-all duration-200" onClick={() => openEdit(item)}>
                        <Pencil className="mr-1.5 h-4 w-4" />Atur Akses
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DetailSheet item={selected} open={detailOpen} onOpenChange={setDetailOpen} onEdit={() => openEdit(selected!)} isDesktop={isDesktop} />
      <AccessDialog open={editOpen} onOpenChange={setEditOpen} item={selected} onSave={handleSave} />
    </>
  )
}
