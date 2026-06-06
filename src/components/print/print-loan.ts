import { buildLoanPdfHtml } from "./loan-pdf-template"

interface DraftItem {
  id: number
  nomorHak: string
  desa: string
  kecamatan: string
}

export function printLoan(
  drafts: DraftItem[],
  kode: string,
  today: string
) {
  const html = buildLoanPdfHtml(
    drafts,
    kode,
    today
  )

  const win = window.open(
    "",
    "_blank",
    "width=900,height=800"
  )

  if (!win) return

  win.document.write(html)
  win.document.close()

  win.onload = () => {
    win.focus()
    win.print()
  }
}