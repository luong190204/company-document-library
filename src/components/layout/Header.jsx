import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, LifeBuoy, Library } from 'lucide-react'
import SearchBar from '../common/SearchBar.jsx'

const navItems = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/documents', label: 'Tất cả tài liệu' },
  { to: '/documents#categories', label: 'Danh mục tài liệu', hash: true },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-navy-50 text-navy-700' : 'text-slate-600 hover:text-navy-700'}`

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg text-white">
            <img src="/img/logothanhbac.png" alt="Logo" className="h-full w-full object-contain" />
          </span>
          <span className="hidden font-semibold text-navy-900 sm:block">Thư viện tài liệu nội bộ</span>
        </Link>
        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {navItems.map((n) => n.hash
            ? <a key={n.to} href="/#categories" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-navy-700">{n.label}</a>
            : <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>{n.label}</NavLink>)}
        </nav>
        <SearchBar placeholder="Tìm nhanh tài liệu..." className="ml-auto hidden w-64 md:block" />
        <a href="mailto:support@congty.vn" className="btn-outline hidden xl:inline-flex"><LifeBuoy className="h-4 w-4" />Hỗ trợ</a>
        <button className="ml-auto rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:ml-0 lg:hidden" onClick={() => setOpen(!open)} aria-label="Mở menu" aria-expanded={open}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="space-y-3 border-t border-slate-200 bg-white px-4 py-3 lg:hidden" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}><SearchBar placeholder="Tìm nhanh tài liệu..." /></div>
          <nav className="flex flex-col">
            <NavLink to="/" end className={linkClass}>Trang chủ</NavLink>
            <NavLink to="/documents" className={linkClass}>Tất cả tài liệu</NavLink>
            <a href="/#categories" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600">Danh mục tài liệu</a>
            <a href="mailto:support@congty.vn" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600">Liên hệ hỗ trợ</a>
          </nav>
        </div>
      )}
    </header>
  )
}
