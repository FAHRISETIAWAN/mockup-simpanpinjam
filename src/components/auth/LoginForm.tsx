'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Lock, User } from 'lucide-react'
import { toast } from 'sonner'

import { login } from '@/lib/auth'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginForm() {
  const router = useRouter()

  const [username, setUsername] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const handleLogin = async () => {
    if (!username.trim()) {
      toast.error('Username wajib diisi')
      return
    }

    if (!password.trim()) {
      toast.error('Password wajib diisi')
      return
    }

    try {
      setLoading(true)

      const result = await login(
        username,
        password
      )

      if (!result.success) {
        toast.error(
          result.message ||
            'Username atau password salah'
        )
        return
      }

      document.cookie = `token=${result.token}; path=/`

      toast.success('Login berhasil')

      router.push('/')
      router.refresh()
    } catch (error) {
      console.error(error)

      toast.error(
        'Terjadi kesalahan pada sistem'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* LEFT SIDE */}
      <div
        className="
          relative
          hidden
          w-1/2
          overflow-hidden
          bg-gradient-to-br
          from-orange-500
          to-orange-600
          lg:flex
          lg:flex-col
          lg:justify-center
        "
      >
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 px-16">
          <Image
            src="/images/Banner/login.png"
            alt="Banner Login"
            width={800}
            height={1200}
            priority
            className="
              mx-auto
              h-[650px]
              w-full
              rounded-3xl
              object-cover
            "
          />

          <div className="mt-10 text-start text-white">
            <h2 className="text-4xl font-bold">
              SITAKJUP
            </h2>

            <p className="mt-4 max-w-2xl text-orange-100">
              Sistem Simpan Pinjam Buku Tanah
              untuk mendukung pengelolaan arsip
              pertanahan secara cepat,
              terintegrasi, dan aman.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        className="
          flex
          flex-1
          items-center
          justify-center
          px-6
          py-10
        "
      >
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div
              className="
                mb-3
                inline-flex
                rounded-full
                bg-orange-100
                px-3
                py-1
                text-xs
                font-medium
                text-orange-600
              "
            >
              Simpan Pinjam Buku Tanah
            </div>

            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Masuk ke Akun Anda
            </h1>

            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Masukkan username dan password
              untuk melanjutkan.
            </p>
          </div>

          <div
            className="
              rounded-[32px]
              bg-white
              dark:bg-zinc-900
              p-8
            "
          >
            <div className="space-y-5">
              {/* Username */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Username
                </label>

                <div className="relative">
                  <User
                    className="
                      absolute
                      left-4
                      top-1/2
                      h-4
                      w-4
                      -translate-y-1/2
                      text-zinc-400
                    "
                  />

                  <Input
                    value={username}
                    onChange={(e) =>
                      setUsername(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLogin()
                      }
                    }}
                    placeholder="Masukkan username"
                    className="
                      h-12
                      rounded-xl
                      pl-11
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    className="
                      absolute
                      left-4
                      top-1/2
                      h-4
                      w-4
                      -translate-y-1/2
                      text-zinc-400
                    "
                  />

                  <Input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLogin()
                      }
                    }}
                    placeholder="Masukkan password"
                    className="
                      h-12
                      rounded-xl
                      pl-11
                    "
                  />
                </div>
              </div>

              {/* Button Login */}
              <Button
                onClick={handleLogin}
                disabled={loading}
                className="
                  h-12
                  w-full
                  rounded-xl
                  bg-orange-500
                  font-medium
                  shadow-md
                  shadow-orange-200
                  dark:shadow-orange-900/30
                  transition-all
                  duration-200
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  hover:bg-orange-600
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >
                {loading
                  ? 'Memproses...'
                  : 'Login'}
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-zinc-400">
            © 2026 SITAKJUP - Sistem Simpan
            Pinjam Buku Tanah
          </p>
        </div>
      </div>
    </div>
  )
}