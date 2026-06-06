import Aside from '@/components/aside'
import '@/styles/tailwind.css'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'})

const playfairDisplay = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  style: 'italic',
  variable: '--font-playfair-display',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Sitakjup',
    default: 'Sitakjup',
  },
  description:
    'Bitpan is a modern and elegant template for Next.js, Tailwind CSS, and TypeScript. It is designed to be simple and easy to use, with a focus on performance and accessibility.',
  keywords: [
    'Next.js',
    'Tailwind CSS',
    'TypeScript',
    'Bitpan',
    'Headless UI',
    'Fashion',
    'Hijab',
    'Skincare',
    'E-commerce',
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn(
              clsx(
                inter.className,
                inter.variable,
                playfairDisplay.variable,
                'text-zinc-950 antialiased dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950'
              )
            , "font-mono", jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <Aside.Provider>{children}</Aside.Provider>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}