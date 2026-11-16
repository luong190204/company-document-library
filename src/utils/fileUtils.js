export const FILE_TYPES = ['PDF', 'DOCX', 'XLSX']

export const FILE_TYPE_STYLES = {
  PDF: 'bg-red-50 text-red-600',
  DOCX: 'bg-blue-50 text-blue-600',
  XLSX: 'bg-emerald-50 text-emerald-600',
}

/** Chuẩn hóa chuỗi để tìm kiếm tiếng Việt không phân biệt dấu. */
export const normalizeText = (text = '') =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim()

/** Kiểm tra file có thật không (dev server trả index.html cho URL không tồn tại nên cần xét content-type). */
export async function fileExists(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    const type = res.headers.get('content-type') || ''
    return res.ok && !type.includes('text/html')
  } catch {
    return false
  }
}

export async function downloadFile({ fileUrl, fileName }) {
  if (!(await fileExists(fileUrl))) {
    throw new Error('Không tìm thấy file. Vui lòng liên hệ bộ phận hỗ trợ.')
  }
  const link = document.createElement('a')
  link.href = fileUrl
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
}
