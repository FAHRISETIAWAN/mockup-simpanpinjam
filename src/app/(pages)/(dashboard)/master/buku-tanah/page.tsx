'use client'

import { useState } from 'react'

import BukuTanahForm from '@/components/master/buku-tanah/BukuTanahForm'
import EditBukuTanahSheet from '@/components/master/buku-tanah/EditBukuTanah'

export default function BukuTanahPage() {
  const [formData, setFormData] = useState({
    nomorHak: '',
    nib: '',
    luas: '',
    pemegangHak: '',
    tipeHak: null,
    kecamatan: null,
    desa: null,
  })

  const handleChange = (
    field: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    console.log(formData)

    // nanti simpan ke API
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <div className="mb-2 inline-flex rounded-full bg-orange-100 dark:bg-orange-900/40 px-3 py-1 text-xs font-medium text-orange-600 dark:text-orange-400">
                Master Data
                </div>

                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Buku Tanah
                </h1>

                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Kelola data master buku tanah
                </p>
            </div>

            <EditBukuTanahSheet
                onSelectData={(data) =>
                setFormData(data)
                }
            />
            </div>

      <div className="rounded-[32px] bg-white dark:bg-zinc-900 p-8 transition-colors duration-300">
        <BukuTanahForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}