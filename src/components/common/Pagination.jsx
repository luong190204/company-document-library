import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ currentPage, pageCount, onChange }) {
  if (pageCount <= 1) return null
  const pageBtn = (active) =>
    `h-9 min-w-9 rounded-lg px-2 text-sm font-medium transition-colors ${active ? 'bg-navy-700 text-white' : 'border border-slate-300 bg-white text-slate-700 hover:border-navy-600'}`
  return (
    <nav className="mt-6 flex items-center justify-center gap-1.5" aria-label="Phân trang">
      <button className={`${pageBtn(false)} disabled:opacity-40`} disabled={currentPage === 1} onClick={() => onChange(currentPage - 1)} aria-label="Trang trước"><ChevronLeft className="mx-auto h-4 w-4" /></button>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
        <button key={p} className={pageBtn(p === currentPage)} onClick={() => onChange(p)} aria-current={p === currentPage ? 'page' : undefined}>{p}</button>
      ))}
      <button className={`${pageBtn(false)} disabled:opacity-40`} disabled={currentPage === pageCount} onClick={() => onChange(currentPage + 1)} aria-label="Trang sau"><ChevronRight className="mx-auto h-4 w-4" /></button>
    </nav>
  )
}
