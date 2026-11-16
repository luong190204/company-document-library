import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Breadcrumb from "../components/common/Breadcrumb.jsx";
import VideoPlayer from "../components/common/VideoPlayer.jsx";
import VideoCard from "../components/common/VideoCard.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import { videos } from "../data/videos.js";
import { formatDate } from "../utils/formatDate.js";

export default function GuideDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const video = videos.find((v) => v.id === Number(id));

  if (!video) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          title="Không tìm thấy video"
          action={
            <button className="btn-primary" onClick={() => navigate("/guides")}>
              Về danh sách hướng dẫn
            </button>
          }
        />
      </div>
    );
  }
  const related = videos
    .filter((v) => v.topic === video.topic && v.id !== video.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Hướng dẫn kỹ thuật", to: "/guides" },
          { label: video.title },
        ]}
      />
      <VideoPlayer key={video.id} video={video} />
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{video.title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {video.topic} • {video.duration} • Cập nhật{" "}
            {formatDate(video.updatedAt)}
          </p>
          <p className="mt-3 max-w-prose text-slate-600">{video.description}</p>
        </div>
        <button
          className="btn-outline shrink-0"
          onClick={() => navigate("/guides")}
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </button>
      </div>
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Video liên quan
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
