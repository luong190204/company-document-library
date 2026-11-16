import { Link } from 'react-router-dom'
import { ClipboardList, Handshake, BadgeCheck, TriangleAlert, FileSignature, ChartNoAxesColumn, Wrench, Folder } from 'lucide-react'

const iconMap = { ClipboardList, Handshake, BadgeCheck, TriangleAlert, FileSignature, ChartNoAxesColumn, Wrench, Folder }

export default function CategoryCard({ category }) {
  const Icon = iconMap[category.icon] ?? Folder
  return (
    <Link to={`/documents?category=${category.id}`} className="card group flex items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:border-navy-600 hover:shadow-md">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700 transition-colors group-hover:bg-navy-700 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block font-semibold text-slate-900">{category.name}</span>
        <span className="mt-0.5 block text-sm text-slate-500">{category.description}</span>
        <span className="mt-2 block text-sm font-medium text-navy-700">{category.count} tài liệu</span>
      </span>
    </Link>
  )
}
