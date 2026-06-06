'use client'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import QRCode from 'qrcode'

interface ArsipItem {
  nomorHak: string
  desa: string
  kecamatan: string
  keperluan: string
  tanggalPinjam: string
  tanggalKembali: string
}

export async function downloadLoanPdf(
  arsip: ArsipItem[],
  kode: string,
  tanggal: string,
  peminjam: string
) {
  const doc = new jsPDF()

  // ======================
  // HEADER
  // ======================

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(24)
  doc.text('SITAKJUP', 14, 20)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)

  doc.text(
    'Sistem Tata Kelola Peminjaman Buku Tanah dan Warkah',
    14,
    28
  )

  doc.setFontSize(10)

  doc.text('Kode', 140, 32)
  doc.text(`: ${kode}`, 160, 32)

  doc.text('Tanggal', 140, 38)
  doc.text(`: ${tanggal}`, 160, 38)

  doc.text('Peminjam', 140, 44)
  doc.text(`: ${peminjam}`, 160, 44)

  // ======================
  // INFO SINGKAT
  // ======================

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)

  doc.text(
    `Jumlah Arsip : ${arsip.length}`,
    14,
    60
  )

  doc.text(
    'Status : DIPINJAM',
    80,
    60
  )

  // ======================
  // TABEL
  // ======================

  autoTable(doc, {
    startY: 70,

    head: [
      [
        'No',
        'Nomor Hak',
        'Desa/Kelurahan',
        'Kecamatan',
        'Keperluan',
        'Tgl Pinjam',
        'Tgl Kembali',
      ],
    ],

    body: arsip.map((item, index) => [
      index + 1,
      item.nomorHak,
      item.desa,
      item.kecamatan,
      item.keperluan || '-',
      item.tanggalPinjam,
      item.tanggalKembali,
    ]),

    styles: {
      fontSize: 8,
      cellPadding: 3,
      valign: 'middle',
      overflow: 'linebreak',
    },

    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center',
    },

    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },

    columnStyles: {
      0: {
        cellWidth: 10,
        halign: 'center',
      },
      1: {
        cellWidth: 22,
      },
      2: {
        cellWidth: 28,
      },
      3: {
        cellWidth: 28,
      },
      4: {
        cellWidth: 42,
      },
      5: {
        cellWidth: 25,
      },
      6: {
        cellWidth: 25,
      },
    },
  })

  const finalY =
    (doc as any).lastAutoTable.finalY + 15

  // ======================
  // FOOTER LINE
  // ======================

  doc.setDrawColor(220)

  doc.line(
    14,
    finalY,
    196,
    finalY
  )

  // ======================
  // INFORMASI
  // ======================

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)

  doc.text(
    'INFORMASI PEMINJAMAN',
    14,
    finalY + 10
  )

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)

  doc.text(
    'Dokumen ini dibuat secara otomatis oleh Sistem Tata Kelola Peminjaman Buku Tanah dan Warkah (SITAKJUP).',
    14,
    finalY + 18,
    {
      maxWidth: 120,
    }
  )

  doc.text(
    'Gunakan QR Code atau kode peminjaman untuk proses verifikasi dan pengembalian arsip.',
    14,
    finalY + 26,
    {
      maxWidth: 120,
    }
  )

  // ======================
  // QR CODE
  // ======================

  const qrCode = await QRCode.toDataURL(kode)

  doc.addImage(
    qrCode,
    'PNG',
    155,
    finalY + 5,
    35,
    35
  )

  doc.setFontSize(8)

  doc.text(
    kode,
    172.5,
    finalY + 45,
    {
      align: 'center',
    }
  )

  // ======================
  // FOOTER PAGE
  // ======================

  const pageHeight =
    doc.internal.pageSize.height

  doc.setFontSize(8)

  doc.setTextColor(120)

  doc.text(
    'SITAKJUP - Sistem Tata Kelola Peminjaman Buku Tanah dan Warkah',
    14,
    pageHeight - 10
  )

  // ======================
  // SAVE PDF
  // ======================

  doc.save(`${kode}.pdf`)
}