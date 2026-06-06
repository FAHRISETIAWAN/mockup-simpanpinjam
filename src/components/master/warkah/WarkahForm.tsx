'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface WarkahFormProps {
  formData: {
    nomorWarkah: string
    tahunWarkah: string
  }
  onChange: (
    field: string,
    value: string
  ) => void
  onSubmit: () => void
  isLoading?: boolean
}

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

export default function WarkahForm({
  formData,
  onChange,
  onSubmit,
  isLoading,
}: WarkahFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <Label className="mb-2 block">
            Nomor Warkah
          </Label>

          <Input
            value={formData.nomorWarkah}
            placeholder="Masukkan Nomor Warkah"
            className={INPUT_STYLE}
            onChange={(e) =>
              onChange(
                'nomorWarkah',
                e.target.value
              )
            }
          />
        </div>

        <div>
          <Label className="mb-2 block">
            Tahun Warkah
          </Label>

          <Input
            value={formData.tahunWarkah}
            placeholder="Contoh: 2024"
            className={INPUT_STYLE}
            onChange={(e) =>
              onChange(
                'tahunWarkah',
                e.target.value
              )
            }
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={onSubmit}
          disabled={isLoading}
          className="
            h-12

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
            : 'Simpan Warkah'}
        </Button>
      </div>
    </div>
  )
}