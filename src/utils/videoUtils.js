export const getVideoSrc = (v) => `/videos/${encodeURIComponent(v.fileName)}`;

export const getThumbnail = (v) => {
  if (v.source === "youtube")
    return `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`;
  return v.thumbnail ? `/thumbnails/${encodeURIComponent(v.thumbnail)}` : null;
};
