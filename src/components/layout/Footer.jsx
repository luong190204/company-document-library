export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:justify-between sm:px-6">
        <span>© {new Date().getFullYear()} Thư viện tài liệu nội bộ. Chỉ dành cho nhân viên công ty.</span>
        <span>Hỗ trợ: support@congty.vn • Nội bộ 1234</span>
      </div>
    </footer>
  )
}
