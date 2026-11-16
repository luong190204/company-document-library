import { useSearchParams, Link } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import Breadcrumb from '../components/common/Breadcrumb.jsx'
import DocumentTable from '../components/common/DocumentTable.jsx'
import DocumentCard from '../components/common/DocumentCard.jsx'
import Pagination from '../components/common/Pagination.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useDocuments } from '../hooks/useDocuments.js'
import { categories } from '../data/categories.js'
import { FILE_TYPES } from '../utils/fileUtils.js'

const sortOptions = [
  { value: 'newest', label: 'Mới cập nhật' },
  { value: 'name', label: 'Tên A-Z' },
  { value: 'popular', label: 'Lượt tải nhiều' },
]

export default function Documents() {
  const [params, setParams] = useSearchParams()
  const filters = {
    q: params.get('q') ?? '',
    category: params.get('category') ?? '',
    type: params.get('type') ?? '',
    sort: params.get('sort') ?? 'newest',
    page: params.get('page') ?? '1',
  }
  const { items, total, pageCount, currentPage, startIndex } = useDocuments(filters)
  const activeCategory = categories.find((c) => c.id === Number(filters.category))
  const hasFilter = filters.q || filters.category || filters.type || filters.sort !== 'newest'

  // Đổi bộ lọc nào cũng quay về trang 1
  const update = (changes) => {
    const next = new URLSearchParams(params)
    Object.entries({ page: '', ...changes }).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)))
    setParams(next, { replace: true })
  }
  const clearFilters = () => setParams({}, { replace: true })

  const clearButton = <button onClick={clearFilters} className="btn-outline"><X className="h-4 w-4" />Xóa bộ lọc</button>

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumb items={[{ label: 'Trang chủ', to: '/' }, { label: 'Tất cả tài liệu', to: activeCategory ? '/documents' : undefined }, ...(activeCategory ? [{ label: activeCategory.name }] : [])]} />
      <h1 className="text-2xl font-bold text-slate-900">{activeCategory ? activeCategory.name : 'Tất cả tài liệu'}</h1>

      <div className="card mt-6 space-y-4 p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input type="search" className="input pl-9" placeholder="Tìm theo tên hoặc mã tài liệu..." aria-label="Tìm kiếm tài liệu" value={filters.q} onChange={(e) => update({ q: e.target.value })} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto]">
          <select className="input" aria-label="Lọc theo danh mục" value={filters.category} onChange={(e) => update({ category: e.target.value })}>
            <option value="">Tất cả danh mục</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div className="flex gap-1.5" role="group" aria-label="Lọc theo định dạng">
            {FILE_TYPES.map((t) => (
              <button key={t} onClick={() => update({ type: filters.type === t ? '' : t })} aria-pressed={filters.type === t}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${filters.type === t ? 'border-navy-700 bg-navy-700 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-navy-600'}`}>{t}</button>
            ))}
          </div>
          <select className="input" aria-label="Sắp xếp" value={filters.sort} onChange={(e) => update({ sort: e.target.value })}>
            {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {hasFilter && clearButton}
        </div>
      </div>

      <p className="mb-3 mt-6 text-sm text-slate-600">Tìm thấy <strong className="text-slate-900">{total}</strong> tài liệu</p>

      {total === 0 ? (
        <EmptyState action={clearButton} />
      ) : (
        <>
          <div className="hidden md:block"><DocumentTable documents={items} startIndex={startIndex} /></div>
          <div className="grid gap-3 md:hidden">{items.map((d) => <DocumentCard key={d.id} document={d} showDownloads />)}</div>
          <Pagination currentPage={currentPage} pageCount={pageCount} onChange={(p) => update({ page: p > 1 ? String(p) : '' })} />
        </>
      )}
      <p className="mt-8 text-sm text-slate-500">Không thấy tài liệu cần tìm? <Link to="/" className="text-navy-700 hover:underline">Xem theo danh mục</Link></p>
    </div>
  )
}
