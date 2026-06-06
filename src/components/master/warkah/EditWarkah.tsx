'use client'

import { useState } from 'react'

import { Search, Pencil } from 'lucide-react'
import { Icon } from '@iconify/react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'

interface WarkahData {
  nomorWarkah: string
  tahunWarkah: string
}

interface Props {
  onSelectData: (
    data: WarkahData
  ) => void
}

export default function EditWarkahSheet({
  onSelectData,
}: Props) {
  const [nomorWarkah, setNomorWarkah] =
    useState('')

  const [result, setResult] =
    useState<WarkahData | null>(null)

  const handleSearch = () => {
    const data = {
      nomorWarkah: 'WK-2024-000123',
      tahunWarkah: '2024',
    }

    setResult(data)
  }

  const handleUseData = () => {
    if (!result) return
    onSelectData(result)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="
            h-12

            rounded-full

            bg-blue-500

            px-5

            text-white

            shadow-md
            shadow-blue-200
            dark:shadow-blue-900/30

            transition-all
            duration-200

            hover:bg-blue-600
            hover:scale-105
            active:scale-95
          "
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit Warkah
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="
          flex
          flex-col

          w-full
          sm:w-[500px]
          sm:max-w-[500px]

          p-0
        "
      >
        {/* HEADER */}
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle>
            Edit Warkah
          </SheetTitle>

          <SheetDescription>
            Cari data berdasarkan Nomor Warkah
          </SheetDescription>
        </SheetHeader>

        {/* CONTENT */}
        <div
          className="
            flex-1

            overflow-y-auto

            px-6
            pb-6

            space-y-6
          "
        >
          <div>
            <Label className="mb-2 block text-zinc-700 dark:text-zinc-300">
              Nomor Warkah
            </Label>

            <Input
              value={nomorWarkah}
              onChange={(e) =>
                setNomorWarkah(
                  e.target.value
                )
              }
              placeholder="Contoh: WK-2024-000123"
              className="
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
              "
            />
          </div>

          <Button
            onClick={handleSearch}
            className="
              h-12
              w-full

              rounded-full

              bg-orange-500

              shadow-md
              shadow-orange-200
              dark:shadow-orange-900/30

              hover:bg-orange-600
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all
              duration-200
            "
          >
            <Search className="mr-2 h-4 w-4" />
            Cari Data
          </Button>

          {result && (
            <div className="rounded-3xl">
              <div
                className="
                  mb-6

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
                Data Ditemukan
              </div>

              <div className="grid gap-4">
                {/* NOMOR WARKAH */}
                <div
                  className="
                    flex
                    items-start
                    gap-4

                    rounded-2xl

                    border
                    border-white/70
                    dark:border-zinc-700

                    bg-orange-100
                    dark:bg-orange-950/30

                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11

                      items-center
                      justify-center

                      rounded-xl

                      bg-orange-200
                      dark:bg-orange-900/50
                    "
                  >
                    <Icon
                      icon="solar:file-text-outline"
                      className="h-5 w-5 text-orange-600 dark:text-orange-400"
                    />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Nomor Warkah
                    </p>

                    <p className="mt-1 font-semibold text-zinc-900 dark:text-white">
                      {result.nomorWarkah}
                    </p>
                  </div>
                </div>

                {/* TAHUN WARKAH */}
                <div
                  className="
                    flex
                    items-start
                    gap-4

                    rounded-2xl

                    border
                    border-white/70
                    dark:border-zinc-700

                    bg-orange-100
                    dark:bg-orange-950/30

                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11

                      items-center
                      justify-center

                      rounded-xl

                      bg-orange-200
                      dark:bg-orange-900/50
                    "
                  >
                    <Icon
                      icon="solar:calendar-outline"
                      className="h-5 w-5 text-orange-600 dark:text-orange-400"
                    />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Tahun Warkah
                    </p>

                    <p className="mt-1 font-semibold text-zinc-900 dark:text-white">
                      {result.tahunWarkah}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        {result && (
          <SheetFooter
            className="
              shrink-0

              border-t
              border-zinc-100
              dark:border-zinc-800

              bg-white
              dark:bg-zinc-900

              px-6
              py-4
            "
          >
            <Button
              onClick={handleUseData}
              className="
                h-12
                w-full

                rounded-2xl

                bg-blue-500

                font-medium

                shadow-md
                shadow-blue-200
                dark:shadow-blue-900/30

                hover:bg-blue-600
                hover:scale-[1.02]
                active:scale-[0.98]
                transition-all
                duration-200
              "
            >
              Gunakan Data Ini
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
