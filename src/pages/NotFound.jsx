import { useNavigate } from 'react-router-dom'
import EmptyState from '../components/common/EmptyState.jsx'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <EmptyState title="Không tìm thấy trang" message="Đường dẫn không đúng hoặc trang đã được di chuyển." action={<button className="btn-primary" onClick={() => navigate('/')}>Về trang chủ</button>} />
    </div>
  )
}
