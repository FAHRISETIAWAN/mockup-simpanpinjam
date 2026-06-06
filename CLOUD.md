# CLOUD.md

# SITAKJUP Development Guide

## Project Information

**SITAKJUP** (Sistem Tata Kelola Peminjaman Buku Tanah dan Warkah) adalah aplikasi internal yang digunakan untuk mengelola proses peminjaman, verifikasi, pengembalian, monitoring, dan pelaporan Buku Tanah serta Warkah pada lingkungan Kantor Pertanahan.

---

# Technology Stack

## Framework

* Next.js 16
* React 19
* TypeScript

## Styling

* Tailwind CSS v4
* Sass
* Headless UI
* Radix UI
* Shadcn UI

## Animation

* Framer Motion
* Embla Carousel

## Icons

* Lucide React
* Phosphor Icons
* Hugeicons
* Heroicons
* Iconify

## Utilities

* clsx
* class-variance-authority
* tailwind-merge
* sonner

---

# Project Structure

```text
src
├── app
│   ├── login
│   └── (pages)
│       ├── dashboard
│       ├── peminjaman
│       ├── verifikasi
│       ├── pengembalian
│       ├── master
│       ├── laporan
│       └── pengaturan
│
├── components
│   ├── auth
│   ├── dashboard
│   ├── laporan
│   ├── master
│   ├── peminjaman
│   ├── pengembalian
│   ├── pengaturan
│   ├── status
│   └── ui
│
├── data.ts
├── middleware.ts
└── type.ts
```

---

# Main Modules

## Dashboard

Location:

```text
components/dashboard/
```

Components:

* dashboard-banner.tsx
* dashboard-stats.tsx
* dashboard-loans.tsx
* dashboard-activity.tsx

Responsibilities:

* Statistik peminjaman
* Aktivitas terbaru
* Ringkasan sistem
* Informasi pengguna

---

## Peminjaman

Location:

```text
components/peminjaman/
```

Components:

* draft-sheet.tsx
* search-result-table.tsx

Responsibilities:

* Pencarian Buku Tanah
* Pencarian Warkah
* Draft peminjaman
* Pengajuan peminjaman

---

## Verifikasi

Location:

```text
app/(pages)/(dashboard)/verifikasi
```

Responsibilities:

* Verifikasi permohonan peminjaman
* Approval petugas
* Monitoring status

---

## Pengembalian

Location:

```text
components/pengembalian/
```

Components:

* Pengembalian-table.tsx
* Pengembalian-detail-sheet.tsx

Responsibilities:

* Daftar dokumen dipinjam
* Detail peminjaman
* Pengembalian dokumen
* Riwayat pengembalian

---

## Master Data

### Buku Tanah

Components:

* BukuTanahForm.tsx
* EditBukuTanah.tsx

### Warkah

Components:

* WarkahForm.tsx
* EditWarkah.tsx

### Keperluan

Components:

* KeperluanDialog.tsx
* KeperluanTable.tsx

### Keterangan

Page:

```text
/master/keterangan
```

### User

Page:

```text
/master/user
```

Responsibilities:

* Pengelolaan data master
* CRUD data referensi
* Manajemen pengguna

---

## Laporan

Location:

```text
components/laporan/
```

Components:

* report-summary.tsx
* report-table.tsx

Responsibilities:

* Rekap peminjaman
* Rekap pengembalian
* Statistik bulanan
* Export laporan

---

## Pengaturan

Location:

```text
components/pengaturan/
```

Responsibilities:

* Hak akses
* Konfigurasi sistem
* Pengaturan pengguna

---

# Sidebar Navigation

Menu utama:

1. Dashboard
2. Peminjaman
3. Verifikasi
4. Pengembalian
5. Master

   * Buku Tanah
   * Warkah
   * Keperluan
   * Keterangan
   * User
6. Laporan
7. Pengaturan

---

# Coding Standards

## Component Rules

Gunakan:

```tsx
export default function ComponentName() {
  return <div />
}
```

Hindari:

```tsx
const Component = () => {}
```

untuk page utama.

---

## TypeScript Rules

Selalu gunakan interface.

```ts
interface User {
  id: string
  name: string
}
```

Hindari:

```ts
any
```

kecuali benar-benar diperlukan.

---

## Naming Convention

### Component

```text
PascalCase
```

Contoh:

```text
DashboardBanner.tsx
BukuTanahForm.tsx
```

### Variable

```text
camelCase
```

Contoh:

```ts
selectedItem
loanStatus
```

### Constant

```text
UPPER_SNAKE_CASE
```

Contoh:

```ts
MAX_ITEMS
DEFAULT_PAGE_SIZE
```

---

# UI Guidelines

## Design Philosophy

Modern Government Application

Karakteristik:

* Clean
* Professional
* Minimalist
* Fast
* Accessible

---

## Border Radius

Cards

```css
rounded-2xl
```

Buttons

```css
rounded-xl
```

Badges

```css
rounded-full
```

---

## Shadow

Cards

```css
shadow-sm
```

Hover

```css
shadow-md
```

---

## Colors

Primary

```text
Emerald
```

Success

```text
Green
```

Warning

```text
Amber
```

Danger

```text
Red
```

Info

```text
Blue
```

---

# Responsive Rules

Desktop First

Breakpoints:

```css
sm
md
lg
xl
2xl
```

Rules:

* Semua table wajib responsive.
* Gunakan Sheet pada mobile.
* Hindari horizontal overflow.
* Sidebar collapse pada layar kecil.

---

# Performance Rules

## Wajib

* Dynamic import untuk komponen berat.
* Memoization jika diperlukan.
* Hindari rerender berlebihan.
* Gunakan Server Components bila memungkinkan.

## Hindari

* State global yang tidak diperlukan.
* Fetch data berulang.
* Nested component berlebihan.

---

# Security Rules

* Validasi semua input.
* Sanitasi data sebelum render.
* Middleware untuk proteksi route.
* Jangan expose secret key.
* Gunakan environment variables.

---

# Folder Responsibilities

## app

Routing dan page.

## components

Reusable UI.

## components/ui

Primitive UI berbasis Shadcn.

## components/dashboard

Dashboard widgets.

## components/master

Master data management.

## components/peminjaman

Loan workflow.

## components/pengembalian

Return workflow.

## components/laporan

Reporting module.

## components/pengaturan

System settings.

---

# Future Development

Planned Features:

* API Integration
* Authentication
* Authorization (Role Based Access)
* Audit Trail
* Notification Center
* Export PDF
* Export Excel
* Dashboard Analytics
* Search Optimization
* Dark Mode

---

# AI Development Instructions

Saat membuat kode baru:

1. Ikuti struktur folder yang sudah ada.
2. Gunakan TypeScript strict mode.
3. Gunakan Tailwind utility classes.
4. Gunakan komponen dari folder ui terlebih dahulu.
5. Pertahankan design consistency SITAKJUP.
6. Jangan membuat styling inline kecuali diperlukan.
7. Prioritaskan responsive layout dan versi mobile.
8. Hindari penggunaan any.
9. Gunakan Sheet untuk detail data.
10. Gunakan Badge untuk status.
11. Gunakan Sonner untuk notifikasi.
12. Gunakan Lucide/icontfy React untuk icon utama.


Audit semua halaman agar mendukung Dark Mode.
Menambahkan transisi/animasi konsisten di Card, Button, Table, Sheet, Dialog, Sidebar.
Mobile optimization seluruh halaman.
Menyamakan Master Keperluan dengan Master Keterangan.
Menyamakan Master User dengan Master Keterangan.
Standarisasi notifikasi Sonner.
Menambahkan Skeleton Loading.
Menambahkan Empty State.
Menambahkan Error State + Retry.
Melengkapi fungsi yang masih placeholder