import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { downloadFile } from '../../utils/fileUtils.js'

/** Chỉ tải khi file tồn tại; nếu không sẽ báo lỗi thật thay vì giả lập thành công. */
export default function DownloadButton({ document, compact = false, className = '' }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleClick = async () => {
    setLoading(true)
    setError('')
    try {
      await downloadFile(document)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button type="button" onClick={handleClick} disabled={loading} className={`btn-primary ${compact ? 'px-3 py-1.5' : ''} ${className}`} aria-label={`Tải xuống ${document.name}`}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {compact ? 'Tải' : 'Tải xuống'}
      </button>
      {error && <span role="alert" className="max-w-56 text-xs text-red-600">{error}</span>}
    </span>
  )
}
