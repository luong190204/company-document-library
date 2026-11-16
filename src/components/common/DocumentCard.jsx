import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react'
import FileTypeIcon from './FileTypeIcon.jsx'
import DownloadButton from './DownloadButton.jsx'
import { formatDate } from '../../utils/formatDate.js'

export default function DocumentCard({ document, showDownloads = false }) {
  return (
    <article className="card flex flex-col gap-4 p-4 transition hover:border-navy-600 hover:shadow-md">
      <div className="flex gap-3">
        <FileTypeIcon type={document.fileType} />
        <div className="min-w-0">
          <Link to={`/documents/${document.id}`} className="font-semibold text-slate-900 hover:text-navy-700">{document.name}</Link>
          <p className="mt-0.5 text-sm text-slate-500">{document.code} • {document.categoryName}</p>
        </div>
      </div>
      <p className="text-sm text-slate-500">
        {document.fileType} • {showDownloads ? `${document.downloadCount} lượt tải` : `Cập nhật ${formatDate(document.updatedAt)}`}
      </p>
      <div className="mt-auto flex items-center gap-2">
        <Link to={`/documents/${document.id}`} className="btn-outline px-3 py-1.5"><Eye className="h-4 w-4" />Xem chi tiết</Link>
        <DownloadButton document={document} compact />
      </div>
    </article>
  )
}
