import {
  BookOpen,
  ClipboardCheck,
  ArchiveRestore,
  Database,
  FileSpreadsheet,
  Settings,
  LayoutDashboard,
} from 'lucide-react'

import { SidebarMenu } from '../types/sidebar'

export const sidebarMenus: SidebarMenu[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Peminjaman',
    href: '/peminjaman',
    icon: BookOpen,
  },
  {
    title: 'Verifikasi',
    href: '/verifikasi',
    icon: ClipboardCheck,
  },
  {
    title: 'Pengembalian',
    href: '/pengembalian',
    icon: ArchiveRestore,
  },
  {
    title: 'Master',
    href: '/master',
    icon: Database,
    children: [
      {
        title: 'Buku Tanah',
        href: '/master/buku-tanah',
      },
      {
        title: 'Warkah',
        href: '/master/warkah',
      },
      {
        title: 'Keperluan',
        href: '/master/keperluan',
      },
      {
        title: 'Keterangan',
        href: '/master/keterangan',
      },
      {
        title: 'User',
        href: '/master/user',
      },
    ],
  },
  {
    title: 'Laporan',
    href: '/laporan',
    icon: FileSpreadsheet,
  },
  {
    title: 'Pengaturan',
    href: '/pengaturan',
    icon: Settings,
  },
]