'use client'

import { useState } from 'react'

import {
  Plus,
  Pencil,
  Trash2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import KeperluanDialog from './KeperluanDialog'

const initialData = [
  {
    id: 1,
    keperluan: 'Pengukuran',
    tanggal: '04 Juni 2026',
  },
  {
    id: 2,
    keperluan: 'Roya',
    tanggal: '04 Juni 2026',
  },
]

export default function KeperluanTable() {
  const [data, setData] =
    useState(initialData)

  const [open, setOpen] =
    useState(false)

  const [selected, setSelected] =
    useState<any>(null)

  const handleAdd = (
    value: string
  ) => {
    setData((prev) => [
      {
        id: Date.now(),
        keperluan: value,
        tanggal: new Date().toLocaleDateString(
          'id-ID'
        ),
      },
      ...prev,
    ])
  }

  const handleEdit = (
    value: string
  ) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              keperluan: value,
            }
          : item
      )
    )
  }

  const handleDelete = (
    id: number
  ) => {
    setData((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    )
  }

  return (
    <>
      <div className="overflow-hidden rounded-[32px] bg-white dark:bg-zinc-900 transition-colors duration-300">
        {/* HEADER */}
        <div
          className="
            flex
            flex-col
            gap-4

            border-b
            border-zinc-100
            dark:border-zinc-800

            px-6
            py-5

            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Daftar Keperluan
            </h2>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Total {data.length} data
            </p>
          </div>

          <Button
            onClick={() => {
              setSelected(null)
              setOpen(true)
            }}
            className="
              h-11

              rounded-full

              bg-orange-500
              cursor-pointer
              px-5

              shadow-md
              shadow-orange-200
              dark:shadow-orange-900/30

              hover:bg-orange-600
              hover:scale-105
              active:scale-95
              transition-all
              duration-200
            "
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Keperluan
          </Button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-orange-50/70 dark:bg-orange-950/20">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Keperluan
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Tanggal
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="
                    border-b
                    border-zinc-100
                    dark:border-zinc-800

                    transition-all
                    duration-200

                    hover:bg-orange-50/20
                    dark:hover:bg-orange-950/10

                    last:border-0
                  "
                >
                  <td className="px-6 py-4">
                    {item.keperluan}
                  </td>

                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                    {item.tanggal}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                        <Button
                        size="sm"
                        className="
                            h-9

                            rounded-full
                            cursor-pointer
                            bg-green-500

                            px-4

                            shadow-sm
                            shadow-green-200
                            dark:shadow-green-900/30

                            hover:bg-green-600
                            transition-all
                            duration-200
                            hover:scale-105
                        "
                        onClick={() => {
                            setSelected(item)
                            setOpen(true)
                        }}
                        >
                        <Pencil className="mr-1.5 h-4 w-4" />
                        Edit
                        </Button>

                        <Button
                        size="sm"
                        className="
                            h-9

                            rounded-full
                            cursor-pointer
                            bg-red-500

                            px-4

                            shadow-sm
                            shadow-red-200
                            dark:shadow-red-900/30

                            hover:bg-red-600
                            transition-all
                            duration-200
                            hover:scale-105
                        "
                        onClick={() =>
                            handleDelete(item.id)
                        }
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
      </div>

      <KeperluanDialog
        open={open}
        onOpenChange={setOpen}
        initialValue={
          selected?.keperluan
        }
        onSubmit={(value) => {
          if (selected) {
            handleEdit(value)
          } else {
            handleAdd(value)
          }
        }}
      />
    </>
  )
}