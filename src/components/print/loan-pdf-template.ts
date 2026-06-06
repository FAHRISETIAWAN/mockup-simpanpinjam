
interface DraftItem {
  id: number
  nomorHak: string
  desa: string
  kecamatan: string
  keperluan?: string
}

export function buildLoanPdfHtml(
  drafts: DraftItem[],
  kode: string,
  today: string
) {
  const rows = drafts
    .map(
      (item, index) => `
        <tr>
          <td class="center">${index + 1}</td>
          <td>${item.nomorHak}</td>
          <td>${item.desa}</td>
          <td>${item.kecamatan}</td>
          <td>${item.keperluan ?? "-"}</td>
        </tr>
      `
    )
    .join("")

  return `
<html lang="id">

<head>
<meta charset="UTF-8">

<title>${kode}</title>

<style>

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  font-family:Arial, Helvetica, sans-serif;
  color:#1f2937;
  background:#ffffff;
  padding:40px;
}

.invoice-header{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  margin-bottom:40px;
}

.company h1{
  font-size:32px;
  font-weight:700;
  margin-bottom:8px;
}

.company p{
  font-size:13px;
  color:#6b7280;
  max-width:280px;
  line-height:1.6;
}

.invoice-info{
  min-width:260px;
}

.invoice-info h2{
  text-align:right;
  font-size:34px;
  font-weight:700;
  margin-bottom:20px;
}

.meta-row{
  display:grid;
  grid-template-columns:90px 1fr;
  gap:20px;
  margin-bottom:8px;
  font-size:14px;
}

.meta-row span{
  color:#6b7280;
  font-weight:600;
}

.meta-row strong{
  font-weight:700;
}

.items-table{
  width:100%;
  border-collapse:collapse;
  margin-top:20px;
}

.items-table thead{
  background:#f9fafb;
}

.items-table th{
  border:1px solid #e5e7eb;
  padding:12px;
  text-align:left;
  font-size:13px;
  font-weight:700;
}

.items-table td{
  border:1px solid #e5e7eb;
  padding:12px;
  font-size:13px;
}

.center{
  text-align:center;
}

.summary-box{
  width:300px;
  margin-top:24px;
  margin-left:auto;
  border:1px solid #e5e7eb;
  border-radius:12px;
  overflow:hidden;
}

.summary-row{
  display:flex;
  justify-content:space-between;
  padding:12px 16px;
  border-bottom:1px solid #e5e7eb;
}

.summary-row:last-child{
  border-bottom:none;
}

.summary-label{
  color:#6b7280;
}

.summary-value{
  font-weight:700;
}

.footer{
  margin-top:48px;
  padding-top:24px;
  border-top:1px solid #e5e7eb;

  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  gap:40px;
}

.footer-left{
  flex:1;
}

.footer-title{
  font-size:12px;
  font-weight:700;
  letter-spacing:.08em;
  color:#6b7280;
  margin-bottom:12px;
}

.footer-text{
  font-size:12px;
  line-height:1.8;
  color:#4b5563;
}

.qr-section{
  text-align:center;
}

.qr-wrapper{
  border:1px solid #e5e7eb;
  padding:10px;
  border-radius:12px;
}

.qr-wrapper img{
  width:120px;
  height:120px;
}

.qr-code{
  margin-top:8px;
  font-size:12px;
  font-weight:700;
}

</style>

</head>

<body>

<div class="invoice-header">

  <div class="company">
    <h1>SITAKJUP</h1>

    <p>
      Sistem Tata Kelola Peminjaman
      Buku Tanah dan Warkah
    </p>
  </div>

  <div class="invoice-info">


    <div class="meta-row">
      <span>KODE</span>
      <strong>${kode}</strong>
    </div>

    <div class="meta-row">
      <span>TANGGAL</span>
      <strong>${today}</strong>
    </div>

    <div class="meta-row">
      <span>STATUS</span>
      <strong>PENGAJUAN</strong>
    </div>

  </div>

</div>

<table class="items-table">

  <thead>
    <tr>
      <th width="60">No</th>
      <th>Nomor Hak</th>
      <th>Desa / Kelurahan</th>
      <th>Kecamatan</th>
      <th>Keperluan</th>
    </tr>
  </thead>

  <tbody>
    ${rows}
  </tbody>

</table>

<div class="summary-box">

  <div class="summary-row">
    <div class="summary-label">
      Jumlah Arsip
    </div>

    <div class="summary-value">
      ${drafts.length}
    </div>
  </div>

  <div class="summary-row">
    <div class="summary-label">
      Status
    </div>

    <div class="summary-value">
      PENGAJUAN
    </div>
  </div>

</div>

<div class="footer">

  <div class="footer-left">

    <div class="footer-title">
      INFORMASI PEMINJAMAN
    </div>

    <div class="footer-text">
      Dokumen ini dibuat secara otomatis oleh
      Sistem Tata Kelola Peminjaman Buku Tanah
      dan Warkah (SITAKJUP).
    </div>

    <div class="footer-text">
      Gunakan QR Code atau kode peminjaman
      untuk proses verifikasi dan pengembalian arsip.
    </div>

  </div>

  <div class="qr-section">

    <div class="qr-wrapper">
      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${kode}"
        alt="${kode}"
      />
    </div>

    <div class="qr-code">
      ${kode}
    </div>

  </div>

</div>

</body>
</html>
`
}
