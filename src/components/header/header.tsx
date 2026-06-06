'use client'

import { useRouter } from 'next/navigation'
import { logout } from '@/lib/logout'
import { Moon, Sun, LogOut } from 'lucide-react'
import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { useTheme } from '@/components/theme-provider'
import NotificationPanel from '@/components/notifications/notification-panel'

export default function Header() {
  const router = useRouter()
  const { theme, toggle } = useTheme()

  const handleLogout = () => {
    logout()
    router.push('/login')
    router.refresh()
  }

  return (
    <header
      className={clsx(
        'z-20 border-b backdrop-blur-md transition-colors duration-300',
        'border-zinc-100 bg-white/90',
        'dark:border-zinc-800 dark:bg-zinc-900/90'
      )}
    >
      <div className="flex h-14 items-center px-3 sm:h-16 sm:px-6">
        {/* MOBILE BRAND */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 font-bold text-white shadow-md shadow-orange-200 dark:shadow-orange-900/30">
            S
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wide text-zinc-900 dark:text-white">
              SITAKJUP
            </h1>
          </div>
        </div>

        {/* RIGHT */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* THEME TOGGLE */}
          <button
            onClick={toggle}
            title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
            className={clsx(
              'flex h-9 w-9 items-center justify-center rounded-xl border',
              'cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95',
              'border-zinc-200 hover:bg-zinc-100 text-zinc-600',
              'dark:border-zinc-700 dark:hover:bg-zinc-800 dark:text-zinc-300',
              'sm:h-10 sm:w-10'
            )}
          >
            {theme === 'dark' ? (
              <Sun size={16} className="sm:size-[18px] text-yellow-400" />
            ) : (
              <Moon size={16} className="sm:size-[18px]" />
            )}
          </button>

          {/* NOTIFICATION */}
          <NotificationPanel />

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            title="Logout"
            className={clsx(
              'flex h-9 w-9 items-center justify-center rounded-xl border',
              'cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95',
              'border-zinc-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600',
              'dark:border-zinc-700 dark:hover:border-red-800 dark:hover:bg-red-950/40 dark:hover:text-red-400 dark:text-zinc-300',
              'sm:h-10 sm:w-10'
            )}
          >
            <LogOut size={16} className="sm:size-[18px]" />
          </button>

          {/* PROFILE */}
          <div className="pl-1 sm:border-l sm:border-zinc-200 sm:pl-4 dark:sm:border-zinc-700">
            <button
              className={clsx(
                'flex items-center gap-2 rounded-xl p-1 transition-all duration-200',
                'hover:bg-zinc-100 dark:hover:bg-zinc-800',
                'sm:gap-3 sm:px-2 sm:py-1.5'
              )}
            >
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                  Rakjat
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Administrator
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 sm:h-10 sm:w-10">
                <Icon icon="iconamoon:profile-fill" width="20" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
