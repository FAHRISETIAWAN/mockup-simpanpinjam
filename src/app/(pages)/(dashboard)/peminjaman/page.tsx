'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Icon } from '@iconify/react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import SearchableSelect from '@/components/searchableselect'
import DraftSheet from '@/components/peminjaman/draft-sheet'
import SearchResultTable from '@/components/peminjaman/search-result-table'

const dummyResult = [
  {
    id: 1,
    nomorHak: 'HGB 123456',
    desa: 'Ancol',
    kecamatan: 'Pademangan',
  },
  {
    id: 2,
    nomorHak: 'HGB 654321',
    desa: 'Sunter',
    kecamatan: 'Tanjung Priok',
  },
]

const keperluanOptions = [
  {
    value: 'sengketa',
    label: 'Sengketa',
  },
  {
    value: 'pengukuran',
    label: 'Pengukuran',
  },
  {
    value: 'permohonan',
    label: 'Permohonan Hak',
  },
]

const jenisOptions = [
  {
    value: 'bt',
    label: 'Buku Tanah',
  },
  {
    value: 'warkah',
    label: 'Warkah',
  },
]

const kecamatanOptions = [
  {
    value: 'pademangan',
    label: 'Pademangan',
  },
  {
    value: 'priok',
    label: 'Tanjung Priok',
  },
  {
    value: 'koja',
    label: 'Koja',
  },
]

const desaOptions = [
  {
    value: 'ancol',
    label: 'Ancol',
  },
  {
    value: 'sunter',
    label: 'Sunter',
  },
  {
    value: 'koja',
    label: 'Koja',
  },
]

export default function PeminjamanPage() {
  const [results, setResults] = useState<any[]>([])
  const [drafts, setDrafts] = useState<any[]>([])

  const [keperluan, setKeperluan] =
    useState<any>(null)

  const [jenis, setJenis] =
    useState<any>(null)

  const [kecamatan, setKecamatan] =
    useState<any>(null)

  const [desa, setDesa] =
    useState<any>(null)

  const [nomorHak, setNomorHak] =
    useState('')

  const handleSearch = () => {
    setResults(dummyResult)

    console.log({
      keperluan,
      jenis,
      kecamatan,
      desa,
      nomorHak,
    })
  }

  const handleReset = () => {
    setKeperluan(null)
    setJenis(null)
    setKecamatan(null)
    setDesa(null)

    setNomorHak('')

    setResults([])
  }

  const addDraft = (item: any) => {
    const exist = drafts.find(
      (x) => x.id === item.id
    )

    if (!exist) {
      setDrafts((prev) => [...prev, item])
    }
  }

  const removeDraft = (id: number) => {
    setDrafts((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    )
  }

  return (
    <div
      className="
        space-y-4

        sm:space-y-6
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          flex-col

          gap-4

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <div
            className="
              mb-2

              inline-flex

              rounded-full

              bg-orange-100

              px-2.5
              py-1

              text-[11px]
              font-medium

              text-orange-600

              sm:px-3
              sm:text-xs
            "
          >
            Simpan Pinjam Buku Tanah
          </div>

          <h1
            className="
              text-2xl
              font-bold

              text-zinc-900
              dark:text-white

              sm:text-3xl
            "
          >
            Peminjaman Buku Tanah
          </h1>
        </div>

        <DraftSheet
          drafts={drafts}
          onRemoveDraft={removeDraft}
        />
      </div>

      {/* FORM */}
      <div
        className="
          rounded-2xl

          bg-white
          dark:bg-zinc-900

          p-4

          sm:p-6

          lg:rounded-[32px]
          lg:p-8
        "
      >
        <div
          className="
            mb-6

            flex
            items-center

            gap-3

            sm:mb-8
            sm:gap-4
          "
        >
          <div
            className="
              flex

              h-12
              w-12

              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-br
              from-orange-100
              to-orange-200

              text-orange-600

              sm:h-14
              sm:w-14
            "
          >
            <Icon
              icon="line-md:file-document-filled"
              className="
                h-6
                w-6

                sm:h-7
                sm:w-7
              "
            />
          </div>

          <div>
            <h2
              className="
                text-lg
                font-semibold

                sm:text-xl
              "
            >
              Form Pencarian Arsip
            </h2>

            <p
              className="
                text-xs
                text-zinc-500
                dark:text-zinc-400

                sm:text-sm
              "
            >
              Lengkapi data pencarian arsip
            </p>
          </div>
        </div>

        <div
          className="
            grid

            gap-4

            sm:gap-5

            lg:grid-cols-2
            lg:gap-6
          "
        >
          <div>
            <Label
              className="
                mb-2

                block

                text-sm
                font-medium

                text-zinc-700
                dark:text-zinc-300
              "
            >
              Keperluan
            </Label>

            <SearchableSelect
              options={keperluanOptions}
              value={keperluan}
              onChange={setKeperluan}
              placeholder="Pilih Keperluan"
            />
          </div>

          <div>
            <Label
              className="
                mb-2

                block

                text-sm
                font-medium

                text-zinc-700
                dark:text-zinc-300
              "
            >
              Jenis Peminjaman
            </Label>

            <SearchableSelect
              options={jenisOptions}
              value={jenis}
              onChange={setJenis}
              placeholder="Pilih Jenis Arsip"
            />
          </div>

          <div>
            <Label
              className="
                mb-2

                block

                text-sm
                font-medium

                text-zinc-700
                dark:text-zinc-300
              "
            >
              Kecamatan
            </Label>

            <SearchableSelect
              options={kecamatanOptions}
              value={kecamatan}
              onChange={setKecamatan}
              placeholder="Cari Kecamatan..."
            />
          </div>

          <div>
            <Label
              className="
                mb-2

                block

                text-sm
                font-medium

                text-zinc-700
                dark:text-zinc-300
              "
            >
              Desa / Kelurahan
            </Label>

            <SearchableSelect
              options={desaOptions}
              value={desa}
              onChange={setDesa}
              placeholder="Cari Desa / Kelurahan..."
            />
          </div>

          <div className="lg:col-span-2">
            <Label
              className="
                mb-2

                block

                text-sm
                font-medium

                text-zinc-700
                dark:text-zinc-300
              "
            >
              6 Digit Terakhir Nomor Hak
            </Label>

            <Input
              value={nomorHak}
              inputMode="numeric"
              placeholder="Contoh: 123456"
              maxLength={6}
              className="
                h-11

                rounded-2xl

                text-sm

                transition-all
                duration-200

                hover:border-orange-400

                focus:border-orange-500
                focus:ring-4
                focus:ring-orange-100

                placeholder:text-zinc-400

                sm:h-12
                sm:rounded-full
              "
              onChange={(e) =>
                setNomorHak(
                  e.target.value
                    .replace(/\D/g, '')
                    .slice(0, 6)
                )
              }
            />

            <p
              className="
                mt-2

                text-[11px]

                text-zinc-500
                dark:text-zinc-400

                sm:text-xs
              "
            >
              Masukkan 6 digit terakhir nomor
              hak.
            </p>
          </div>
        </div>

        {/* BUTTON */}
        <div
          className="
            mt-6

            flex
            flex-col

            gap-2

            sm:mt-8
            sm:flex-row
            sm:justify-end
            sm:gap-3
          "
        >
          <Button
            size="lg"
            type="button"
            onClick={handleReset}
            className="
              h-11

              w-full
              sm:w-auto

              rounded-2xl

              bg-red-500

              px-5

              text-sm
              font-medium

              shadow-md
              shadow-red-200
              dark:shadow-red-900/30

              hover:bg-red-600

              sm:h-12
              sm:rounded-full
              sm:px-6
            "
          >
            Reset
          </Button>

          <Button
            size="lg"
            onClick={handleSearch}
            className="
              h-11

              w-full
              sm:w-auto

              rounded-2xl

              bg-orange-500

              px-5

              text-sm
              font-medium

              shadow-md
              shadow-orange-200
              dark:shadow-orange-900/30

              hover:bg-orange-600

              sm:h-12
              sm:rounded-full
              sm:px-6
            "
          >
            <Search className="mr-2 h-4 w-4" />
            Cari Arsip
          </Button>
        </div>
      </div>

      {/* RESULT */}
      <SearchResultTable
        results={results}
        drafts={drafts}
        onAddDraft={addDraft}
      />
    </div>
  )
}