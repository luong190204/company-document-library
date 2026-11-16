import { useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

/** Thanh tìm kiếm: chuyển sang trang danh sách kèm từ khóa. */
export default function SearchBar({ placeholder = 'Tìm kiếm biên bản, biểu mẫu, tài liệu...', large = false, className = '' }) {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = value.trim()
    navigate(q ? `/documents?q=${encodeURIComponent(q)}` : '/documents')
  }

  return (
    <form onSubmit={handleSubmit} role="search" className={`relative ${className}`}>
      <Search className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 ${large ? 'left-4 h-5 w-5' : 'left-3 h-4 w-4'}`} />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Tìm kiếm tài liệu"
        className={`input ${large ? 'py-4 pl-12 pr-28 text-base shadow-lg' : 'pl-9'}`}
      />
      {large && <button type="submit" className="btn-primary absolute right-2 top-1/2 -translate-y-1/2">Tìm kiếm</button>}
    </form>
  )
}
