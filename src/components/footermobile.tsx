'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { Icon } from '@iconify/react'


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'


export default function FooterMobile() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    document.cookie =
      'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'

    router.push('/login')
    router.refresh()
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname.startsWith(href)
  }

  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0

        z-50

        border-t
        border-zinc-200
        dark:border-zinc-800

        bg-white
        dark:bg-zinc-900

        shadow-lg

        transition-colors
        duration-300

        lg:hidden
      "
    >
      <div
        className="
          relative

          grid
          grid-cols-5

          h-[72px]
        "
      >
        {/* DASHBOARD */}
        <Link
          href="/"
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-1
          "
        >
          <Icon
            icon="material-symbols:dashboard-rounded"
            width={22}
            className={
              isActive('/')
                ? 'text-orange-500'
                : 'text-zinc-500'
            }
          />

          <span
            className={`text-[11px] ${
              isActive('/')
                ? 'font-medium text-orange-500'
                : 'text-zinc-500'
            }`}
          >
            Dashboard
          </span>
        </Link>

        {/* PEMINJAMAN */}
        <Link
          href="/peminjaman"
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-1
          "
        >
          <Icon
            icon="mdi:book-open-page-variant"
            width={22}
            className={
              isActive('/peminjaman')
                ? 'text-orange-500'
                : 'text-zinc-500'
            }
          />

          <span
            className={`text-[11px] ${
              isActive('/peminjaman')
                ? 'font-medium text-orange-500'
                : 'text-zinc-500'
            }`}
          >
            Peminjaman
          </span>
        </Link>

        {/* SPACER TENGAH */}
        <div />

        {/* PENGEMBALIAN */}
        <Link
          href="/pengembalian"
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-1
          "
        >
          <Icon
            icon="mdi:archive-refresh"
            width={22}
            className={
              isActive('/pengembalian')
                ? 'text-orange-500'
                : 'text-zinc-500'
            }
          />

          <span
            className={`text-[11px] ${
              isActive('/pengembalian')
                ? 'font-medium text-orange-500'
                : 'text-zinc-500'
            }`}
          >
            Kembali
          </span>
        </Link>

        {/* MENU */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="
                flex
                flex-col
                items-center
                justify-center
                gap-1
              "
            >
              <Icon
                icon="solar:hamburger-menu-bold"
                width={22}
                className="text-zinc-500"
              />

              <span className="text-[11px] text-zinc-500">
                Menu
              </span>
            </button>
          </SheetTrigger>

          <SheetContent
            side="bottom"
            className="rounded-t-3xl px-0"
            >
            <SheetHeader className="px-6">
                <SheetTitle>
                Menu Lainnya
                </SheetTitle>
            </SheetHeader>

            <div className="mt-6 px-4 pb-6">
                <div className="grid grid-cols-3 gap-4">
                {/* BUKU TANAH */}
                <SheetClose asChild>
                    <Link
                    href="/master/buku-tanah"
                    className="
                        group
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-3

                        rounded-3xl

                        bg-orange-50

                        p-5

                        transition-all
                        duration-300

                        hover:bg-orange-100
                        hover:scale-[1.03]

                        active:scale-95
                    "
                    >
                    <div
                        className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center

                        rounded-2xl

                        bg-orange-100

                        group-hover:bg-orange-200
                        "
                    >
                        <Icon
                        icon="mdi:book-open-page-variant"
                        width={26}
                        className="text-orange-600"
                        />
                    </div>

                    <span className="text-sm font-medium text-orange-700">
                        BukuTanah
                    </span>
                    </Link>
                </SheetClose>

                {/* WARKAH */}
                <SheetClose asChild>
                    <Link
                    href="/master/warkah"
                    className="
                        group
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-3

                        rounded-3xl

                        bg-blue-50

                        p-5

                        transition-all
                        duration-300

                        hover:bg-blue-100
                        hover:scale-[1.03]

                        active:scale-95
                    "
                    >
                    <div
                        className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center

                        rounded-2xl

                        bg-blue-100

                        group-hover:bg-blue-200
                        "
                    >
                        <Icon
                        icon="mdi:file-document-outline"
                        width={26}
                        className="text-blue-600"
                        />
                    </div>

                    <span className="text-sm font-medium text-blue-700">
                        Warkah
                    </span>
                    </Link>
                </SheetClose>

                {/* KEPERLUAN */}
                <SheetClose asChild>
                    <Link
                    href="/master/keperluan"
                    className="
                        group
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-3

                        rounded-3xl

                        bg-emerald-50

                        p-5

                        transition-all
                        duration-300

                        hover:bg-emerald-100
                        hover:scale-[1.03]

                        active:scale-95
                    "
                    >
                    <div
                        className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center

                        rounded-2xl

                        bg-emerald-100

                        group-hover:bg-emerald-200
                        "
                    >
                        <Icon
                        icon="mdi:clipboard-list-outline"
                        width={26}
                        className="text-emerald-600"
                        />
                    </div>

                    <span className="text-sm font-medium text-emerald-700">
                        Keperluan
                    </span>
                    </Link>
                </SheetClose>

                {/* KETERANGAN */}
                <SheetClose asChild>
                    <Link
                    href="/master/keterangan"
                    className="
                        group
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-3

                        rounded-3xl

                        bg-violet-50

                        p-5

                        transition-all
                        duration-300

                        hover:bg-violet-100
                        hover:scale-[1.03]

                        active:scale-95
                    "
                    >
                    <div
                        className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center

                        rounded-2xl

                        bg-violet-100

                        group-hover:bg-violet-200
                        "
                    >
                        <Icon
                        icon="mdi:text-box-outline"
                        width={26}
                        className="text-violet-600"
                        />
                    </div>

                    <span className="text-sm font-medium text-violet-700">
                        Keterangan
                    </span>
                    </Link>
                </SheetClose>

                {/* USER */}
                <SheetClose asChild>
                    <Link
                    href="/master/user"
                    className="
                        group
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-3

                        rounded-3xl

                        bg-cyan-50

                        p-5

                        transition-all
                        duration-300

                        hover:bg-cyan-100
                        hover:scale-[1.03]

                        active:scale-95
                    "
                    >
                    <div
                        className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center

                        rounded-2xl

                        bg-cyan-100

                        group-hover:bg-cyan-200
                        "
                    >
                        <Icon
                        icon="mdi:account-group-outline"
                        width={26}
                        className="text-cyan-600"
                        />
                    </div>

                    <span className="text-sm font-medium text-cyan-700">
                        User
                    </span>
                    </Link>
                </SheetClose>

                {/* LAPORAN */}
                <SheetClose asChild>
                    <Link
                    href="/laporan"
                    className="
                        group
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-3

                        rounded-3xl

                        bg-amber-50

                        p-5

                        transition-all
                        duration-300

                        hover:bg-amber-100
                        hover:scale-[1.03]

                        active:scale-95
                    "
                    >
                    <div
                        className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center

                        rounded-2xl

                        bg-amber-100

                        group-hover:bg-amber-200
                        "
                    >
                        <Icon
                        icon="mdi:file-chart-outline"
                        width={26}
                        className="text-amber-600"
                        />
                    </div>

                    <span className="text-sm font-medium text-amber-700">
                        Laporan
                    </span>
                    </Link>
                </SheetClose>

                {/* PENGATURAN */}
                <SheetClose asChild>
                    <Link
                    href="/pengaturan"
                    className="
                        group
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-3

                        rounded-3xl

                        bg-zinc-100

                        p-5

                        transition-all
                        duration-300

                        hover:bg-zinc-200
                        hover:scale-[1.03]

                        active:scale-95
                    "
                    >
                    <div
                        className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center

                        rounded-2xl

                        bg-zinc-200
                        "
                    >
                        <Icon
                        icon="mdi:cog-outline"
                        width={26}
                        className="text-zinc-700"
                        />
                    </div>

                    <span className="text-sm font-medium text-zinc-700">
                        Pengaturan
                    </span>
                    </Link>
                </SheetClose>

                {/* LOGOUT */}
                <SheetClose asChild>
                    <button
                    onClick={handleLogout}
                    className="
                        group
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-3

                        rounded-3xl

                        bg-red-50

                        p-5

                        transition-all
                        duration-300

                        hover:bg-red-100
                        hover:scale-[1.03]

                        active:scale-95
                    "
                    >
                    <div
                        className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center

                        rounded-2xl

                        bg-red-100

                        group-hover:bg-red-200
                        "
                    >
                        <Icon
                        icon="solar:logout-2-bold"
                        width={26}
                        className="text-red-600"
                        />
                    </div>

                    <span className="text-sm font-medium text-red-600">
                        Logout
                    </span>
                    </button>
                </SheetClose>
                </div>
            </div>
            </SheetContent>
        </Sheet>

        {/* FLOATING VERIFIKASI */}
        <Link
          href="/verifikasi"
          className="
            absolute

            left-1/2
            top-0

            flex
            h-[64px]
            w-[64px]

            -translate-x-1/2
            -translate-y-6

            items-center
            justify-center

            rounded-full

            bg-orange-500

            shadow-xl
            shadow-orange-300

            ring-4
            ring-white

            transition-transform

            active:scale-95
          "
        >
          <Icon
            icon="mdi:tick-decagram"
            width={30}
            className="text-white"
          />
        </Link>
      </div>
    </div>
  )
}