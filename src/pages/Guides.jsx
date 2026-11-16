import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Breadcrumb from "../components/common/Breadcrumb.jsx";
import VideoCard from "../components/common/VideoCard.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import { videos, videoTopics } from "../data/videos.js";
import { normalizeText } from "../utils/fileUtils.js";

export default function Guides() {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState("");

  const filtered = useMemo(() => {
    const keyword = normalizeText(q);
    return videos
      .filter((v) => !topic || v.topic === topic)
      .filter(
        (v) =>
          !keyword ||
          normalizeText(`${v.title} ${v.description}`).includes(keyword),
      )
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [q, topic]);

  const chip = (active) =>
    `rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${active ? "border-navy-700 bg-navy-700 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-navy-600"}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Hướng dẫn kỹ thuật" },
        ]}
      />
      <h1 className="text-2xl font-bold text-slate-900">Hướng dẫn kỹ thuật</h1>

      <div className="card mt-6 space-y-3 p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            className="input pl-9"
            placeholder="Tìm video hướng dẫn..."
            aria-label="Tìm video"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button className={chip(!topic)} onClick={() => setTopic("")}>
            Tất cả
          </button>
          {videoTopics.map((t) => (
            <button
              key={t}
              className={chip(topic === t)}
              onClick={() => setTopic(topic === t ? "" : t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 mt-6 text-sm text-slate-600">
        Có <strong className="text-slate-900">{filtered.length}</strong> video
      </p>
      {filtered.length === 0 ? (
        <EmptyState title="Không tìm thấy video" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      )}
    </div>
  );
}
