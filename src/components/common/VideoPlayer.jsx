import { getVideoSrc, getThumbnail } from "../../utils/videoUtils.js";

export default function VideoPlayer({ video }) {
  if (video.source === "youtube") {
    return (
      <div className="aspect-video overflow-hidden rounded-xl bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }
  return (
    <video
      controls
      preload="metadata"
      poster={getThumbnail(video) ?? undefined}
      className="aspect-video w-full rounded-xl bg-black"
    >
      <source src={getVideoSrc(video)} type="video/mp4" />
      Trình duyệt không hỗ trợ phát video.
    </video>
  );
}
