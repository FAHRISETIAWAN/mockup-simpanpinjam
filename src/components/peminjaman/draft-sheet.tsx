'use client'

import { useState } from 'react'
import { FileText, Trash2, MapPin } from 'lucide-react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import PrintPdfDialog from './PrintPdfDialog'

interface DraftItem {
  id: number
  nomorHak: string
  desa: string
  kecamatan: string
}

interface Props {
  drafts: DraftItem[]
  onRemoveDraft: (id: number) => void
}

export default function DraftSheet({ drafts, onRemoveDraft }: Props) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [printOpen, setPrintOpen] = useState(false)

  const handleAjukan = () => {
    setSheetOpen(false)
    setPrintOpen(true)
  }

  return (
    <>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button className="relative h-11 w-full rounded-xl bg-green-500 px-5 text-white shadow-md shadow-green-200 dark:shadow-green-900/30 transition-all duration-200 hover:bg-green-600 hover:scale-105 active:scale-95 hover:shadow-lg sm:w-auto sm:rounded-full sm:h-12">
            <FileText className="mr-2 h-4 w-4" />
            Draft
            {drafts.length > 0 && (
              <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-green-600">
                {drafts.length}
              </span>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent
          side={isDesktop ? 'right' : 'bottom'}
          className={`flex flex-col p-0 ${isDesktop ? 'w-full max-w-[500px]' : 'h-[85vh] rounded-t-[32px] overflow-hidden'}`}
        >
          {!isDesktop && (
            <div className="mx-auto mt-3 mb-1 h-1.5 w-14 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}

          <SheetHeader className="pb-4 px-4 lg:px-6 border-b border-zinc-100 dark:border-zinc-800">
            <SheetTitle>Draft Peminjaman</SheetTitle>
            <SheetDescription>
              Total arsip yang akan dipinjam:{' '}
              <span className="font-semibold text-orange-600 dark:text-orange-400">{drafts.length}</span>
            </SheetDescription>
          </SheetHeader>

          {drafts.length === 0 && (
            <div className="flex flex-1 items-start justify-center pt-12 px-6 lg:items-center lg:justify-center lg:pt-0">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-950/30">
                  <FileText className="h-10 w-10 text-orange-300 dark:text-orange-700" />
                </div>
                <h4 className="font-semibold text-zinc-700 dark:text-zinc-300">Belum Ada Draft</h4>
                <p className="mt-2 mb-6 text-sm text-zinc-500 dark:text-zinc-400">
                  Tambahkan arsip dari hasil pencarian untuk mulai mengajukan peminjaman.
                </p>
              </div>
            </div>
          )}

          {drafts.length > 0 && (
            <>
              <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-3 lg:px-4">
                {drafts.map((item, index) => (
                  <div
                    key={item.id}
                    className="rounded-3xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 transition-all duration-200 hover:border-orange-300 dark:hover:border-orange-700"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-900/50 font-bold text-orange-600 dark:text-orange-400">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="inline-flex rounded-full bg-orange-100 dark:bg-orange-900/40 px-3 py-1 text-xs font-semibold text-orange-700 dark:text-orange-400">
                          {item.nomorHak}
                        </div>
                        <div className="mt-3">
                          <p className="font-medium text-zinc-800 dark:text-white">{item.desa}</p>
                          <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
                            <MapPin className="h-3.5 w-3.5" />
                            Kecamatan {item.kecamatan}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onRemoveDraft(item.id)}
                        className="h-9 w-9 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="shrink-0 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-4">
                <Button
                  onClick={handleAjukan}
                  className="h-12 w-full cursor-pointer rounded-2xl bg-orange-500 font-medium shadow-md shadow-orange-200 dark:shadow-orange-900/30 hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Ajukan Peminjaman ({drafts.length})
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <PrintPdfDialog open={printOpen} onOpenChange={setPrintOpen} drafts={drafts} />
    </>
  )
}
