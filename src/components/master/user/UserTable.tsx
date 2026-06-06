'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import UserDialog from './UserDialog'

const initialData = [
  { id: 1, nama: 'Rakjat', username: 'rakjat', unit: 'Seksi Umum', aktif: true },
  { id: 2, nama: 'Budi Santoso', username: 'budi.s', unit: 'Bagian Hak Tanah', aktif: true },
  { id: 3, nama: 'Siti Rahma', username: 'siti.r', unit: 'Seksi Survei', aktif: false },
]

export default function UserTable() {
  const [data, setData] = useState(initialData)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<any>(null)

  const handleAdd = (values: any) => {
    setData((prev) => [{ id: Date.now(), nama: values.nama, username: values.username, unit: values.unit, aktif: true }, ...prev])
  }

  const handleEdit = (values: any) => {
    setData((prev) =>
      prev.map((item) => (item.id === selected.id ? { ...item, nama: values.nama, username: values.username, unit: values.unit } : item))
    )
  }

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleAktif = (id: number) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, aktif: !item.aktif } : item))
    )
  }

  return (
    <>
      <div className="overflow-hidden rounded-[32px] bg-white dark:bg-zinc-900 transition-colors duration-300">
        {/* HEADER */}
        <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Daftar User</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Total {data.length} user</p>
          </div>

          <Button
            onClick={() => { setSelected(null); setOpen(true) }}
            className="h-11 rounded-full bg-cyan-500 cursor-pointer px-5 shadow-md shadow-cyan-200 dark:shadow-cyan-900/30 hover:bg-cyan-600 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah User
          </Button>
        </div>

        {/* TABLE DESKTOP */}
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full">
            <thead>
              <tr className="bg-cyan-50/70 dark:bg-cyan-950/20">
                {['Nama', 'Username', 'Unit / Bagian', 'Status', 'Aksi'].map((h) => (
                  <th
                    key={h}
                    className={clsx(
                      'px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400',
                      h === 'Aksi' ? 'text-right' : 'text-left'
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-zinc-100 dark:border-zinc-800 transition-all duration-200 hover:bg-cyan-50/20 dark:hover:bg-cyan-950/10 last:border-0"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400">
                        <User size={16} />
                      </div>
                      <span className="font-medium text-zinc-900 dark:text-white">{item.nama}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 font-mono text-sm">
                    {item.username}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{item.unit}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleAktif(item.id)}
                      className={clsx(
                        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer',
                        item.aktif
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 hover:bg-green-200'
                          : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400 hover:bg-zinc-200'
                      )}
                    >
                      <span className={clsx('h-1.5 w-1.5 rounded-full', item.aktif ? 'bg-green-500' : 'bg-zinc-400')} />
                      {item.aktif ? 'Aktif' : 'Non-aktif'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        className="h-9 rounded-full cursor-pointer bg-green-500 px-4 shadow-sm shadow-green-200 dark:shadow-green-900/30 hover:bg-green-600 transition-all duration-200 hover:scale-105"
                        onClick={() => { setSelected(item); setOpen(true) }}
                      >
                        <Pencil className="mr-1.5 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        className="h-9 rounded-full cursor-pointer bg-red-500 px-4 shadow-sm shadow-red-200 dark:shadow-red-900/30 hover:bg-red-600 transition-all duration-200 hover:scale-105"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="mr-1.5 h-4 w-4" />
                        Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CARDS MOBILE */}
        <div className="block space-y-3 p-4 sm:hidden">
          {data.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-white">{item.nama}</p>
                    <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">{item.username}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleAktif(item.id)}
                  className={clsx(
                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer',
                    item.aktif
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                      : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400'
                  )}
                >
                  <span className={clsx('h-1.5 w-1.5 rounded-full', item.aktif ? 'bg-green-500' : 'bg-zinc-400')} />
                  {item.aktif ? 'Aktif' : 'Non-aktif'}
                </button>
              </div>

              <div className="mt-3">
                <span className="rounded-full bg-zinc-100 dark:bg-zinc-700 px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-300">
                  {item.unit}
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 h-9 rounded-xl cursor-pointer bg-green-500 shadow-sm shadow-green-200 dark:shadow-green-900/30 hover:bg-green-600 transition-all duration-200"
                  onClick={() => { setSelected(item); setOpen(true) }}
                >
                  <Pencil className="mr-1.5 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  className="flex-1 h-9 rounded-xl cursor-pointer bg-red-500 shadow-sm shadow-red-200 dark:shadow-red-900/30 hover:bg-red-600 transition-all duration-200"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="mr-1.5 h-4 w-4" />
                  Hapus
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <UserDialog
        open={open}
        onOpenChange={setOpen}
        initial={selected}
        onSubmit={(values) => {
          if (selected) handleEdit(values)
          else handleAdd(values)
        }}
      />
    </>
  )
}
