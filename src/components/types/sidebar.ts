import { LucideIcon } from 'lucide-react'

export interface SidebarMenu {
  title: string
  href: string
  icon: LucideIcon
  children?: {
    title: string
    href: string
  }[]
}