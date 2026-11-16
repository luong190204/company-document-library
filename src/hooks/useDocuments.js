import { useMemo } from 'react'
import { documents } from '../data/documents.js'
import { categories } from '../data/categories.js'
import { normalizeText } from '../utils/fileUtils.js'

export const PAGE_SIZE = 8

const sorters = {
  newest: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
  name: (a, b) => a.name.localeCompare(b.name, 'vi'),
  popular: (a, b) => b.downloadCount - a.downloadCount,
}

/** Lọc, sắp xếp, phân trang. Khi có backend chỉ cần thay thân hook này bằng lời gọi API. */
export function useDocuments({ q = '', category = '', type = '', sort = 'newest', page = 1 } = {}) {
  return useMemo(() => {
    const keyword = normalizeText(q)
    const filtered = documents
      .filter((d) => !category || d.categoryId === Number(category))
      .filter((d) => !type || d.fileType === type)
      .filter((d) => !keyword || normalizeText(`${d.name} ${d.code}`).includes(keyword))
      .sort(sorters[sort] ?? sorters.newest)

    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const currentPage = Math.min(Math.max(1, Number(page) || 1), pageCount)
    const start = (currentPage - 1) * PAGE_SIZE
    return { total: filtered.length, pageCount, currentPage, startIndex: start, items: filtered.slice(start, start + PAGE_SIZE) }
  }, [q, category, type, sort, page])
}

export const getDocumentById = (id) => documents.find((d) => d.id === Number(id))
export const getLatestDocuments = (n = 6) => [...documents].sort(sorters.newest).slice(0, n)
export const getPopularDocuments = (n = 5) => [...documents].sort(sorters.popular).slice(0, n)
export const getCategoriesWithCount = () =>
  categories.map((c) => ({ ...c, count: documents.filter((d) => d.categoryId === c.id).length }))
