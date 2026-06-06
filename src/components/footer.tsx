interface FooterProps {
  className?: string
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 px-6 py-4 transition-colors duration-300 ${className ?? ''}`}
    >
      <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-500">
        <span>
          © {new Date().getFullYear()} Simpan Pinjam Buku Tanah & Warkah
        </span>
      </div>
    </footer>
  )
}
