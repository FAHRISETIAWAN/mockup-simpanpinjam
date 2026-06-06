'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface SearchResult {
  id: number
  nomorHak: string
  desa: string
  kecamatan: string
}

interface SearchResultTableProps {
  results: SearchResult[]
  drafts: SearchResult[]
  onAddDraft: (item: SearchResult) => void
}

export default function SearchResultTable({
  results,
  drafts,
  onAddDraft,
}: SearchResultTableProps) {
  if (results.length === 0) {
    return (
      <div
        className="
          rounded-2xl

          bg-white
          dark:bg-zinc-900

          p-6

          text-center

          transition-colors
          duration-300

          sm:rounded-[32px]
          sm:p-12
        "
      >
        <h3
          className="
            text-base
            font-semibold

            text-zinc-700
            dark:text-zinc-300

            sm:text-lg
          "
        >
          Belum ada hasil pencarian
        </h3>

        <p
          className="
            mt-2

            text-sm
            text-zinc-500
            dark:text-zinc-400
          "
        >
          Masukkan kriteria pencarian lalu klik
          tombol cari data.
        </p>
      </div>
    )
  }

  return (
    <div
      className="
        overflow-hidden

        rounded-2xl

        bg-white
        dark:bg-zinc-900

        transition-colors
        duration-300

        sm:rounded-[32px]
      "
    >
      {/* HEADER */}
      <div
        className="
          border-b
          border-zinc-100
          dark:border-zinc-800

          px-4
          py-4

          sm:px-6
          sm:py-5
        "
      >
        <h2
          className="
            text-base
            font-semibold

            text-zinc-900
            dark:text-white

            sm:text-lg
          "
        >
          Hasil Pencarian
        </h2>

        <p
          className="
            mt-1

            text-xs
            text-zinc-500
            dark:text-zinc-400

            sm:text-sm
          "
        >
          Ditemukan {results.length} data arsip
        </p>
      </div>

      {/* MOBILE CARD */}
      <div className="block sm:hidden">
        <div className="space-y-3 p-4">
          {results.map((item) => {
            const isDraft = drafts.some(
              (d) => d.id === item.id
            )

            return (
              <div
                key={item.id}
                className="
                  rounded-2xl

                  border
                  border-zinc-200
                  dark:border-zinc-700

                  bg-white
                  dark:bg-zinc-800

                  p-4

                  transition-colors
                  duration-200
                "
              >
                <div
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
                  {item.nomorHak}
                </div>

                <div className="mt-3 space-y-2">
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Kecamatan
                    </p>

                    <p className="font-medium text-zinc-800 dark:text-white">
                      {item.kecamatan}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Desa / Kelurahan
                    </p>

                    <p className="font-medium text-zinc-800 dark:text-white">
                      {item.desa}
                    </p>
                  </div>
                </div>

                <Button
                  disabled={isDraft}
                  onClick={() => onAddDraft(item)}
                  className="
                    mt-4

                    h-11
                    w-full

                    rounded-xl

                    bg-blue-100
                    dark:bg-blue-900/40

                    text-blue-700
                    dark:text-blue-400

                    hover:bg-blue-200
                    dark:hover:bg-blue-900/60

                    transition-all
                    duration-200

                    disabled:opacity-60
                  "
                >
                  <Plus className="mr-2 h-4 w-4" />

                  {isDraft
                    ? 'Sudah di Draft'
                    : 'Tambah ke Draft'}
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full">
          <thead>
            <tr className="bg-orange-50/70 dark:bg-orange-950/20">
              {['Nomor Hak', 'Kecamatan', 'Desa', 'Aksi'].map((h, i) => (
                <th
                  key={h}
                  className={`
                    px-6 py-4
                    text-xs font-semibold
                    uppercase tracking-wider
                    text-zinc-600 dark:text-zinc-400
                    ${i === 3 ? 'text-right' : 'text-left'}
                  `}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {results.map((item) => {
              const isDraft = drafts.some(
                (d) => d.id === item.id
              )

              return (
                <tr
                  key={item.id}
                  className="
                    border-b
                    border-zinc-100
                    dark:border-zinc-800

                    transition-all
                    duration-200

                    hover:bg-orange-50/40
                    dark:hover:bg-orange-950/10

                    last:border-0
                  "
                >
                  <td className="px-6 py-4">
                    <span
                      className="
                        inline-flex
                        items-center

                        rounded-full

                        bg-orange-100
                        dark:bg-orange-900/40

                        px-3
                        py-1.5

                        text-sm
                        font-semibold

                        text-orange-700
                        dark:text-orange-400
                      "
                    >
                      {item.nomorHak}
                    </span>
                  </td>

                  <td
                    className="
                      px-6
                      py-4

                      font-medium
                      text-zinc-700
                      dark:text-zinc-300
                    "
                  >
                    {item.kecamatan}
                  </td>

                  <td
                    className="
                      px-6
                      py-4

                      text-zinc-700
                      dark:text-zinc-300
                    "
                  >
                    {item.desa}
                  </td>

                  <td
                    className="
                      px-6
                      py-4

                      text-right
                    "
                  >
                    <Button
                      size="sm"
                      disabled={isDraft}
                      onClick={() =>
                        onAddDraft(item)
                      }
                      className="
                        h-9

                        rounded-full

                        bg-blue-100
                        dark:bg-blue-900/40

                        px-4

                        text-blue-700
                        dark:text-blue-400

                        transition-all
                        duration-200

                        hover:bg-blue-200
                        hover:text-blue-800
                        dark:hover:bg-blue-900/60
                        dark:hover:text-blue-300

                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      <Plus className="mr-1.5 h-4 w-4" />

                      {isDraft
                        ? 'Sudah Draft'
                        : 'Draft'}
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
