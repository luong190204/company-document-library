import { SearchX } from 'lucide-react'

export default function EmptyState({ title = 'Không tìm thấy tài liệu', message = 'Thử đổi từ khóa hoặc xóa bớt bộ lọc.', action }) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400"><SearchX className="h-7 w-7" /></span>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
