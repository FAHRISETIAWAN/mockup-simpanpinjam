'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SearchableSelect from '@/components/searchableselect'

interface BukuTanahFormProps {
  formData: {
    nomorHak: string
    nib: string
    luas: string
    pemegangHak: string
    tipeHak: any
    kecamatan: any
    desa: any
  }
  onChange: (
    field: string,
    value: string | object | null
  ) => void
  onSubmit: () => void
  isLoading?: boolean
}

const tipeHakOptions = [
  {
    value: 'hm',
    label: 'Hak Milik',
  },
  {
    value: 'hgb',
    label: 'Hak Guna Bangunan',
  },
  {
    value: 'hgu',
    label: 'Hak Guna Usaha',
  },
  {
    value: 'hp',
    label: 'Hak Pakai',
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
]

const INPUT_STYLE = `
  h-12
  rounded-full

  transition-all
  duration-200

  hover:border-orange-400
  dark:hover:border-orange-600

  focus:border-orange-500
  focus:ring-4
  focus:ring-orange-100
  dark:focus:ring-orange-900/30

  placeholder:text-zinc-400
  dark:placeholder:text-zinc-600
`

export default function BukuTanahForm({
  formData,
  onChange,
  onSubmit,
  isLoading,
}: BukuTanahFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* NOMOR HAK */}
        <div>
          <Label className="mb-2 block">
            Nomor Hak
          </Label>

          <Input
            value={formData.nomorHak}
            placeholder="Masukkan Nomor Hak"
            className={INPUT_STYLE}
            onChange={(e) =>
              onChange(
                'nomorHak',
                e.target.value
              )
            }
          />
        </div>

        {/* NIB */}
        <div>
          <Label className="mb-2 block">
            NIB
          </Label>

          <Input
            value={formData.nib}
            placeholder="Masukkan NIB"
            className={INPUT_STYLE}
            onChange={(e) =>
              onChange(
                'nib',
                e.target.value
              )
            }
          />
        </div>

        {/* LUAS */}
        <div>
          <Label className="mb-2 block">
            Luas (m²)
          </Label>

          <Input
            type="number"
            value={formData.luas}
            placeholder="Masukkan Luas"
            className={INPUT_STYLE}
            onChange={(e) =>
              onChange(
                'luas',
                e.target.value
              )
            }
          />
        </div>

        {/* PEMEGANG HAK */}
        <div>
          <Label className="mb-2 block">
            Pemegang Hak
          </Label>

          <Input
            value={formData.pemegangHak}
            placeholder="Masukkan Nama Pemegang Hak"
            className={INPUT_STYLE}
            onChange={(e) =>
              onChange(
                'pemegangHak',
                e.target.value
              )
            }
          />
        </div>

        {/* TIPE HAK */}
        <div>
          <Label className="mb-2 block">
            Tipe Hak
          </Label>

          <SearchableSelect
            options={tipeHakOptions}
            value={formData.tipeHak}
            onChange={(value) =>
              onChange('tipeHak', value)
            }
            placeholder="Pilih Tipe Hak"
          />
        </div>

        {/* KECAMATAN */}
        <div>
          <Label className="mb-2 block">
            Kecamatan
          </Label>

          <SearchableSelect
            options={kecamatanOptions}
            value={formData.kecamatan}
            onChange={(value) =>
              onChange('kecamatan', value)
            }
            placeholder="Pilih Kecamatan"
          />
        </div>

        {/* DESA */}
        <div className="lg:col-span-2">
          <Label className="mb-2 block">
            Desa / Kelurahan
          </Label>

          <SearchableSelect
            options={desaOptions}
            value={formData.desa}
            onChange={(value) =>
              onChange('desa', value)
            }
            placeholder="Pilih Desa / Kelurahan"
          />
        </div>
      </div>

      {/* BUTTON */}
      <div
        className="
          flex
          justify-end
        "
      >
        <Button
          size="lg"
          onClick={onSubmit}
          disabled={isLoading}
          className="
            h-12

            cursor-pointer
            rounded-full

            bg-orange-500

            px-6

            font-medium

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
          {isLoading
            ? 'Menyimpan...'
            : 'Simpan Buku Tanah'}
        </Button>
      </div>
    </div>
  )
}