import { Link } from 'react-router-dom'
import FileTypeIcon from './FileTypeIcon.jsx'
import DownloadButton from './DownloadButton.jsx'
import { formatDate } from '../../utils/formatDate.js'

const columns = ['STT', 'Tên tài liệu', 'Mã tài liệu', 'Danh mục', 'Ngày cập nhật', 'Định dạng', 'Lượt tải', 'Thao tác']

export default function DocumentTable({ documents, startIndex = 0 }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
          <tr>{columns.map((c) => <th key={c} className="whitespace-nowrap px-4 py-3 font-semibold">{c}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {documents.map((d, i) => (
            <tr key={d.id} className="transition-colors hover:bg-navy-50/50">
              <td className="px-4 py-3 text-slate-500">{startIndex + i + 1}</td>
              <td className="px-4 py-3">
                <Link to={`/documents/${d.id}`} className="flex items-center gap-3 font-medium text-slate-900 hover:text-navy-700">
                  <FileTypeIcon type={d.fileType} />{d.name}
                </Link>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-600">{d.code}</td>
              <td className="px-4 py-3 text-slate-600">{d.categoryName}</td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-600">{formatDate(d.updatedAt)}</td>
              <td className="px-4 py-3 text-slate-600">{d.fileType}</td>
              <td className="px-4 py-3 text-slate-600">{d.downloadCount}</td>
              <td className="px-4 py-3"><DownloadButton document={d} compact /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
