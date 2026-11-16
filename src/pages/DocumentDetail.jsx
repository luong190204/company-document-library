import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Breadcrumb from '../components/common/Breadcrumb.jsx'
import FileTypeIcon from '../components/common/FileTypeIcon.jsx'
import DownloadButton from '../components/common/DownloadButton.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { getDocumentById } from '../hooks/useDocuments.js'
import { formatDate } from '../utils/formatDate.js'
//import { fileExists } from '../utils/fileUtils.js'
import FilePreview from '../components/common/FilePreview.jsx'

function PdfPreview({ url }) {
  const [available, setAvailable] = useState(null)
  useEffect(() => { fileExists(url).then(setAvailable) }, [url])
  if (available === null) return <div className="h-64 animate-pulse rounded-xl bg-slate-100" />
  if (!available) return <p className="rounded-xl bg-slate-100 p-6 text-sm text-slate-500">Chưa có file PDF để xem trước.</p>
  return <iframe src={url} title="Xem trước tài liệu" className="h-[70vh] w-full rounded-xl border border-slate-200" />
}

export default function DocumentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const doc = getDocumentById(id)

  if (!doc) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState title="Không tìm thấy tài liệu" message="Tài liệu không tồn tại hoặc đã bị gỡ." action={<button className="btn-primary" onClick={() => navigate('/documents')}>Về danh sách tài liệu</button>} />
      </div>
    )
  }

  const info = [
    ['Mã tài liệu', doc.code], ['Danh mục', doc.categoryName], ['Phiên bản', doc.version], ['Định dạng', doc.fileType],
    ['Dung lượng', doc.fileSize], ['Lượt tải', doc.downloadCount], ['Ngày tạo', formatDate(doc.createdAt)], ['Ngày cập nhật', formatDate(doc.updatedAt)],
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Tất cả tài liệu", to: "/documents" },
          { label: doc.name },
        ]}
      />
      <div className="card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <FileTypeIcon type={doc.fileType} size="lg" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900">{doc.name}</h1>
            <p className="mt-2 max-w-prose text-slate-600">{doc.description}</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </button>
            <DownloadButton document={doc} />
          </div>
        </div>
        <dl className="mt-6 grid gap-x-6 gap-y-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {info.map(([label, value]) => (
            <div key={label}>
              <dt className="text-sm text-slate-500">{label}</dt>
              <dd className="mt-0.5 font-medium text-slate-900">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Xem trước</h2>
        <FilePreview doc={doc} />
      </section>
    </div>
  );
}
