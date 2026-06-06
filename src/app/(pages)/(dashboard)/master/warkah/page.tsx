'use client'

import { useState } from 'react'

import WarkahForm from '@/components/master/warkah/WarkahForm'
import EditWarkahSheet from '@/components/master/warkah/EditWarkah'

export default function WarkahPage() {
  const [formData, setFormData] = useState({
    nomorWarkah: '',
    tahunWarkah: '',
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
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 inline-flex rounded-full bg-orange-100 dark:bg-orange-900/40 px-3 py-1 text-xs font-medium text-orange-600 dark:text-orange-400">
            Master Data
          </div>

          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Warkah
          </h1>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Kelola data master warkah
          </p>
        </div>

        <EditWarkahSheet
          onSelectData={(data) =>
            setFormData(data)
          }
        />
      </div>

      <div className="rounded-[32px] bg-white dark:bg-zinc-900 p-8 transition-colors duration-300">
        <WarkahForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}