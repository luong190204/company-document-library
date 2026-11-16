import { FileText, FileSpreadsheet } from 'lucide-react'
import { FILE_TYPE_STYLES } from '../../utils/fileUtils.js'

export default function FileTypeIcon({ type, size = 'md' }) {
  const Icon = type === 'XLSX' ? FileSpreadsheet : FileText
  const box = size === 'lg' ? 'h-16 w-16 rounded-2xl' : 'h-10 w-10 rounded-lg'
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${box} ${FILE_TYPE_STYLES[type] ?? 'bg-slate-100 text-slate-500'}`} aria-hidden="true">
      <Icon className={size === 'lg' ? 'h-8 w-8' : 'h-5 w-5'} />
    </span>
  )
}
