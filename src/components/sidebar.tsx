'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight, ChevronDown, Layers3 } from 'lucide-react'
import { sidebarMenus } from './constants/sidebar-menu'

interface SidebarProps {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<string[]>(['Master'])

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    )
  }

  return (
    <aside
      className={clsx(
        'min-h-full flex flex-col transition-all duration-300 ease-in-out',
        'bg-white border-r border-zinc-100',
        'dark:bg-zinc-900 dark:border-zinc-800'
      )}
    >
      {/* HEADER */}
      <div className="px-3 pt-3 pb-6">
        <div className="flex items-center justify-between">
          <div
            className={clsx(
              'flex items-center gap-3 overflow-hidden transition-all duration-300',
              collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            )}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white">
              <Layers3 size={20} />
            </div>
            <span className="whitespace-nowrap text-2xl font-bold text-zinc-900 dark:text-white">
              SITAKJUP
            </span>
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-xl border',
              'transition-all duration-200 hover:scale-105',
              'border-zinc-200 hover:bg-zinc-100 text-zinc-600',
              'dark:border-zinc-700 dark:hover:bg-zinc-800 dark:text-zinc-400'
            )}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 space-y-1 px-3">
        {sidebarMenus.map((menu) => {
          const Icon = menu.icon
          const hasChildren = menu.children && menu.children.length > 0
          const isChildActive =
            hasChildren && menu.children?.some((child) => pathname === child.href)
          const isActive =
            pathname === menu.href ||
            pathname.startsWith(`${menu.href}/`) ||
            isChildActive

          return (
            <div key={menu.title}>
              {hasChildren ? (
                <>
                  <button
                    onClick={() => toggleMenu(menu.title)}
                    className={clsx(
                      'group flex h-12 w-full items-center rounded-2xl transition-all duration-200',
                      isActive
                        ? 'bg-orange-500 text-white shadow-sm shadow-orange-200 dark:shadow-orange-900/30'
                        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
                      collapsed ? 'justify-center' : 'px-4'
                    )}
                  >
                    <Icon
                      size={20}
                      className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                    />
                    {!collapsed && (
                      <>
                        <span className="ml-3 flex-1 text-left">{menu.title}</span>
                        <ChevronDown
                          size={16}
                          className={clsx(
                            'transition-transform duration-200',
                            openMenus.includes(menu.title) && 'rotate-180'
                          )}
                        />
                      </>
                    )}
                  </button>

                  {!collapsed && openMenus.includes(menu.title) && (
                    <div
                      className={clsx(
                        'ml-6 mt-1 border-l pl-4',
                        'border-zinc-200 dark:border-zinc-700'
                      )}
                    >
                      {menu.children?.map((child) => {
                        const isChildCurrent = pathname === child.href
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={clsx(
                              'relative flex h-9 items-center text-sm transition-all duration-200',
                              isChildCurrent
                                ? 'font-medium text-orange-600 dark:text-orange-400'
                                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200'
                            )}
                          >
                            <span
                              className={clsx(
                                'absolute -left-[21px] h-2 w-2 rounded-full transition-all duration-200',
                                isChildCurrent
                                  ? 'bg-orange-500'
                                  : 'bg-zinc-300 dark:bg-zinc-600'
                              )}
                            />
                            {child.title}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={menu.href}
                  title={collapsed ? menu.title : ''}
                  className={clsx(
                    'group flex h-12 w-full items-center rounded-2xl transition-all duration-200 ease-out',
                    isActive
                      ? 'bg-orange-500 text-white shadow-sm shadow-orange-200 dark:shadow-orange-900/30'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
                    collapsed ? 'justify-center' : 'gap-3 px-4'
                  )}
                >
                  <Icon
                    size={20}
                    className="transition-transform duration-200 group-hover:scale-110"
                  />
                  <span
                    className={clsx(
                      'overflow-hidden whitespace-nowrap transition-all duration-300',
                      collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                    )}
                  >
                    {menu.title}
                  </span>
                </Link>
              )}
            </div>
          )
        })}
      </div>

      {/* USER */}
      <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
        <div className={clsx('flex items-center', collapsed ? 'justify-center' : 'gap-3')}>
          <img
            src="https://i.pravatar.cc/100"
            alt="User"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-orange-100 dark:ring-orange-900/40"
          />
          {!collapsed && (
            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                Rakjat
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Administrator</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
