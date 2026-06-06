'use client'

import React, { ReactNode, useState } from 'react'
import clsx from 'clsx'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header/header'
import Footer from '@/components/footer'
import FooterMobile from '@/components/footermobile'

interface ComponentProps {
  children: ReactNode
}

const ApplicationLayout: React.FC<ComponentProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-dvh overflow-x-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* DESKTOP */}
      <div
        className={clsx(
          'hidden min-h-dvh lg:grid transition-all duration-300 ease-in-out',
          collapsed ? 'grid-cols-[72px_1fr]' : 'grid-cols-[280px_1fr]'
        )}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="flex min-h-dvh flex-col overflow-hidden">
          <Header />

          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>

          <Footer />
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex min-h-dvh w-full flex-col overflow-x-hidden lg:hidden">
        <Header />

        <main className="flex-1 w-full overflow-x-hidden overflow-y-auto p-4 pb-24 sm:p-5 sm:pb-28">
          {children}
        </main>

        <FooterMobile />
      </div>
    </div>
  )
}

export { ApplicationLayout }
