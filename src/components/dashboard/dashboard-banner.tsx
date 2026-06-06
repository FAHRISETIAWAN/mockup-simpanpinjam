import {
  BookOpen,
  ArrowRight,
  BarChart3,
} from 'lucide-react'

export default function DashboardBanner() {
  return (
    <div
      className="
        relative
        overflow-hidden

        rounded-[24px]

        bg-gradient-to-r
        from-red-500
        via-yellow-400
        to-orange-200

        p-5

        text-white

        sm:rounded-[32px]
        sm:p-8
      "
    >
      {/* TOP CIRCLE */}
      <div
        className="
          absolute
          left-1/2
          top-0

          h-32
          w-32

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-white/15

          blur-xl

          sm:h-40
          sm:w-40
        "
      />

      {/* SHAPES */}
      <div className="absolute right-50 top-20 hidden xl:block">
        <div className="relative">
          <div
            className="
              absolute

              h-44
              w-44

              rotate-12

              rounded-[40px]

              border
              border-white/20

              bg-white/10

              backdrop-blur-sm
            "
          />

          <div
            className="
              absolute
              left-10
              top-4

              h-44
              w-44

              rotate-12

              rounded-[40px]

              border
              border-white/20

              bg-white/10

              backdrop-blur-sm
            "
          />

          <div
            className="
              absolute
              left-20
              top-8

              h-44
              w-44

              rotate-12

              rounded-[40px]

              border
              border-white/20

              bg-white/10

              backdrop-blur-sm
            "
          />

          <div
            className="
              absolute
              left-32
              top-12

              h-44
              w-44

              rotate-12

              rounded-[40px]

              border
              border-white/20

              bg-white/10

              backdrop-blur-sm
            "
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-xl">
        <div
          className="
            mb-4

            flex
            h-11
            w-11

            items-center
            justify-center

            rounded-xl

            bg-white/20

            backdrop-blur-md

            sm:mb-5
            sm:h-14
            sm:w-14
            sm:rounded-2xl
          "
        >
          <BookOpen size={22} />
        </div>

        <h2
          className="
            text-2xl
            font-bold

            leading-tight

            sm:text-3xl
            lg:text-4xl
          "
        >
          Laporan Bulanan
        </h2>

        <p
          className="
            mt-3

            text-sm

            text-white/90

            sm:text-base
            lg:text-lg
          "
        >
          Laporan lengkap aktivitas
          peminjaman buku tanah dan
          warkah bulan Mei 2026.
        </p>

        <div
          className="
            mt-5

            flex
            flex-wrap

            gap-3

            sm:mt-8
            sm:gap-4
          "
        >
          <button
            className="
              flex
              items-center
              gap-2

              rounded-xl

              bg-white

              px-4
              py-3

              text-sm
              font-semibold

              text-zinc-900

              transition-all

              hover:scale-105

              sm:rounded-2xl
              sm:px-6
              sm:py-4
              sm:text-base
            "
          >
            <BarChart3 size={18} />

            Lihat Laporan
          </button>

          <button
            className="
              flex
              items-center
              gap-2

              rounded-xl

              bg-white/15

              px-4
              py-3

              text-sm
              font-medium

              text-white

              backdrop-blur-md

              transition-all

              hover:bg-white/20

              sm:rounded-2xl
              sm:px-6
              sm:py-4
              sm:text-base
            "
          >
            Pelajari

            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* RIGHT FADE */}
      <div
        className="
          absolute
          inset-y-0
          right-0

          hidden
          w-1/3

          bg-gradient-to-l
          from-white/10
          to-transparent

          lg:block
        "
      />
    </div>
  )
}