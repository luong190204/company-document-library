import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp } from 'lucide-react'
import SearchBar from '../components/common/SearchBar.jsx'
import CategoryCard from '../components/common/CategoryCard.jsx'
import DocumentCard from '../components/common/DocumentCard.jsx'
import { getCategoriesWithCount, getLatestDocuments, getPopularDocuments } from '../hooks/useDocuments.js'
import FileTypeIcon from '../components/common/FileTypeIcon.jsx'

const categories = getCategoriesWithCount()
const latest = getLatestDocuments(6)
const popular = getPopularDocuments(5)

function SectionTitle({ title, to }) {
  return (
    <div className="mb-5 flex items-end justify-between">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      {to && <Link to={to} className="flex items-center gap-1 text-sm font-medium text-navy-700 hover:underline">Xem tất cả<ArrowRight className="h-4 w-4" /></Link>}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <section className="bg-navy-900 px-4 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold sm:text-5xl">Thư viện tài liệu nội bộ</h1>
          <p className="mx-auto mt-4 max-w-xl text-navy-100">Tìm kiếm và tải xuống nhanh chóng các biểu mẫu, biên bản và tài liệu phục vụ công việc.</p>
          <SearchBar large className="mx-auto mt-8 max-w-2xl text-left" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-14 px-4 pt-12 sm:px-6">
        <section id="categories" className="scroll-mt-24">
          <SectionTitle title="Danh mục tài liệu" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => <CategoryCard key={c.id} category={c} />)}
          </div>
        </section>

        <section>
          <SectionTitle title="Tài liệu mới cập nhật" to="/documents?sort=newest" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((d) => <DocumentCard key={d.id} document={d} />)}
          </div>
        </section>

        <section>
          <SectionTitle title="Tài liệu được sử dụng nhiều" to="/documents?sort=popular" />
          <ol className="card divide-y divide-slate-100">
            {popular.map((d, i) => (
              <li key={d.id}>
                <Link to={`/documents/${d.id}`} className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-navy-50/50">
                  <span className="w-5 text-center text-sm font-semibold text-slate-400">{i + 1}</span>
                  <FileTypeIcon type={d.fileType} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-slate-900">{d.name}</span>
                    <span className="text-sm text-slate-500">{d.code} • {d.categoryName}</span>
                  </span>
                  <span className="flex items-center gap-1 text-sm text-slate-500"><TrendingUp className="h-4 w-4" />{d.downloadCount} lượt tải</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  )
}
