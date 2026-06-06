'use client'

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'
import { Check, ChevronDown, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

export interface SelectOption {
  value: string
  label: string
  description?: string
}

interface SearchableSelectProps {
  options: SelectOption[]
  value: SelectOption | null
  onChange: (value: SelectOption) => void
  placeholder?: string
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = 'Pilih Data',
}: SearchableSelectProps) {
  const [query, setQuery] = useState('')

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return options
    return options.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    )
  }, [options, query])

  return (
    <Combobox
      immediate
      value={value}
      onChange={(selected) => {
        if (selected) onChange(selected)
        setQuery('')
      }}
    >
      <div className="group relative w-full">
        {/* INPUT */}
        <ComboboxInput
          aria-label={placeholder}
          displayValue={(item: SelectOption) => item?.label ?? ''}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="
            h-11 w-full rounded-2xl border px-4 pr-10 text-sm
            transition-all duration-200 placeholder:text-zinc-400
            border-zinc-300 bg-white text-zinc-900
            hover:border-orange-300 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100
            dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500
            dark:hover:border-orange-500 dark:focus:border-orange-500 dark:focus:ring-orange-900/30
            sm:h-12 sm:rounded-full
          "
        />

        {/* BUTTON */}
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-4">
          <ChevronDown className="h-4 w-4 text-zinc-500 dark:text-zinc-400 transition-transform duration-300 group-data-open:rotate-180" />
        </ComboboxButton>

        {/* DROPDOWN */}
        <ComboboxOptions
          transition
          className="
            absolute left-0 top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-2xl border shadow-xl
            origin-top transition-all duration-200 ease-out
            data-[closed]:-translate-y-2 data-[closed]:scale-95 data-[closed]:opacity-0
            border-zinc-200 bg-white shadow-zinc-200/50
            dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-zinc-900/80
            sm:rounded-3xl
          "
        >
          {/* SEARCH HEADER */}
          <div className="border-b border-zinc-100 dark:border-zinc-800 p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari..."
                className="
                  h-10 w-full rounded-xl border pl-9 pr-3 text-sm transition-all duration-200
                  border-zinc-200 bg-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100
                  dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-orange-500
                "
              />
            </div>
          </div>

          {/* OPTIONS */}
          <div className="max-h-64 overflow-y-auto p-2 sm:max-h-72">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => (
                <ComboboxOption
                  key={item.value}
                  value={item}
                  className="
                    group/item flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5
                    transition-all duration-150
                    data-focus:bg-orange-50 dark:data-focus:bg-orange-950/30
                    sm:rounded-2xl sm:px-4 sm:py-3
                  "
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-zinc-900 dark:text-white">
                      {item.label}
                    </div>
                    {item.description && (
                      <div className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400">
                        {item.description}
                      </div>
                    )}
                  </div>
                  <Check className="invisible ml-3 h-4 w-4 shrink-0 text-orange-500 group-data-selected:visible" />
                </ComboboxOption>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-sm text-zinc-500 dark:text-zinc-400">
                <Search className="mb-2 h-5 w-5 opacity-40" />
                <span>Data tidak ditemukan</span>
              </div>
            )}
          </div>
        </ComboboxOptions>
      </div>
    </Combobox>
  )
}
