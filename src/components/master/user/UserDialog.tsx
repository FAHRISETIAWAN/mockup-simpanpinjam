'use client'

import { useEffect, useState } from 'react'
import { Plus, Eye, EyeOff } from 'lucide-react'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface UserValues {
  nama: string
  username: string
  password: string
  unit: string
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  initial?: Omit<UserValues, 'password'> | null
  onSubmit: (values: UserValues) => void
}

export default function UserDialog({ open, onOpenChange, initial, onSubmit }: Props) {
  const [nama, setNama] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [unit, setUnit] = useState('')
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    if (open) {
      setNama(initial?.nama || '')
      setUsername(initial?.username || '')
      setPassword('')
      setUnit(initial?.unit || '')
      setShowPass(false)
    }
  }, [open, initial])

  const isEdit = !!initial

  const handleSubmit = () => {
    if (!nama.trim() || !username.trim()) return
    if (!isEdit && !password.trim()) return
    onSubmit({ nama, username, password, unit })
    onOpenChange(false)
  }

  const INPUT_CLS = `
    h-12 rounded-full transition-all duration-200
    hover:border-cyan-400 dark:hover:border-cyan-600
    focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:focus:ring-cyan-900/30
    placeholder:text-zinc-400 dark:placeholder:text-zinc-600
  `

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-3xl p-0 sm:max-w-lg">
        {/* HEADER */}
        <DialogHeader className="bg-cyan-50 dark:bg-cyan-950/30 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400">
              <Icon icon="solar:user-bold" className="h-7 w-7" />
            </div>
            <div>
              <DialogTitle className="text-xl">
                {isEdit ? 'Edit User' : 'Tambah User'}
              </DialogTitle>
              <DialogDescription className="mt-1">
                {isEdit ? 'Ubah data akun pengguna.' : 'Buat akun pengguna baru.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* CONTENT */}
        <div className="space-y-4 px-8 py-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block text-zinc-700 dark:text-zinc-300">Nama Lengkap</Label>
              <Input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className={INPUT_CLS}
              />
            </div>

            <div>
              <Label className="mb-2 block text-zinc-700 dark:text-zinc-300">Username</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Contoh: budi.s"
                className={`${INPUT_CLS} font-mono`}
              />
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-zinc-700 dark:text-zinc-300">
              {isEdit ? 'Password Baru (kosongkan jika tidak diubah)' : 'Password'}
            </Label>
            <div className="relative">
              <Input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isEdit ? 'Isi untuk ganti password' : 'Masukkan password'}
                className={`${INPUT_CLS} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-zinc-700 dark:text-zinc-300">Unit / Bagian</Label>
            <Input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Contoh: Bagian Hak Tanah"
              className={INPUT_CLS}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800 px-8 py-5">
          <Button
            variant="outline"
            className="h-11 rounded-full cursor-pointer px-5 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>
          <Button
            className="h-11 rounded-full bg-cyan-500 px-5 shadow-md shadow-cyan-200 dark:shadow-cyan-900/30 cursor-pointer hover:bg-cyan-600 hover:scale-105 active:scale-95 transition-all duration-200"
            onClick={handleSubmit}
          >
            <Plus className="mr-2 h-4 w-4" />
            {isEdit ? 'Update User' : 'Simpan User'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
