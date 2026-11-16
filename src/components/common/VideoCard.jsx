import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { getThumbnail } from "../../utils/videoUtils.js";

export default function VideoCard({ video }) {
  const thumb = getThumbnail(video);
  return (
    <Link
      to={`/guides/${video.id}`}
      className="card group overflow-hidden transition hover:-translate-y-0.5 hover:border-navy-600 hover:shadow-md"
    >
      <div className="relative aspect-video bg-navy-900">
        {thumb && (
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-navy-800 transition-transform group-hover:scale-110">
            <Play className="h-5 w-5 fill-current" />
          </span>
        </span>
        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
          {video.duration}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900">{video.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {video.description}
        </p>
        <p className="mt-2 text-xs font-medium text-navy-700">{video.topic}</p>
      </div>
    </Link>
  );
}
