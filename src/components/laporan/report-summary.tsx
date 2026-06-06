'use client'

import {
  BookOpen,
  ClipboardCheck,
  ArchiveRestore,
  AlertTriangle,
} from 'lucide-react'

const items = [
  {
    title: 'Sedang Dipinjam',
    value: 24,
    icon: BookOpen,
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400',
  },
  {
    title: 'Menunggu Verifikasi',
    value: 8,
    icon: ClipboardCheck,
    bg: 'bg-yellow-50 dark:bg-yellow-950/30',
    color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400',
  },
  {
    title: 'Dikembalikan',
    value: 156,
    icon: ArchiveRestore,
    bg: 'bg-green-50 dark:bg-green-950/30',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
  },
  {
    title: 'Tunggakan',
    value: 4,
    icon: AlertTriangle,
    bg: 'bg-red-50 dark:bg-red-950/30',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400',
  },
]

export default function ReportSummary() {
  return (
    <div
      className="
        grid

        gap-3

        sm:grid-cols-2
        sm:gap-4

        xl:grid-cols-4
      "
    >
      {items.map((item) => {
        const Icon = item.icon

        return (
          <div
            key={item.title}
            className={`
              relative

              overflow-hidden

              rounded-2xl

              border
              border-white/60
              dark:border-zinc-700/50

              p-4

              transition-all
              duration-300

              hover:-translate-y-1
              hover:shadow-lg

              sm:rounded-[28px]
              sm:p-5

              ${item.bg}
            `}
          >
            {/* DECORATION */}
            <div
              className="
                absolute

                -right-6
                -top-6

                h-20
                w-20

                rounded-full

                bg-white/40
                dark:bg-white/5

                sm:h-24
                sm:w-24
              "
            />

            <div
              className="
                relative

                flex
                items-center
                justify-between
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    font-medium

                    text-zinc-500
                    dark:text-zinc-400

                    sm:text-sm
                  "
                >
                  {item.title}
                </p>

                <h3
                  className="
                    mt-2

                    text-2xl
                    font-bold

                    text-zinc-900
                    dark:text-white

                    sm:text-3xl
                  "
                >
                  {item.value}
                </h3>

                <p
                  className="
                    mt-1

                    text-[11px]

                    text-zinc-400
                    dark:text-zinc-500

                    sm:text-xs
                  "
                >
                  Total arsip
                </p>
              </div>

              <div
                className={`
                  flex

                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-2xl

                  sm:h-14
                  sm:w-14

                  ${item.color}
                `}
              >
                <Icon
                  className="
                    h-5
                    w-5

                    sm:h-6
                    sm:w-6
                  "
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}