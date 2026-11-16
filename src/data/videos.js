export const videoTopics = ["Kỹ thuật", "Thiết bị", "Phần mềm", "Khác"];

// source: 'youtube' (dùng youtubeId) hoặc 'file' (dùng fileName trong public/videos/)
// Thêm video mới: thêm 1 dòng vào CUỐI danh sách
export const videos = [
  {
    id: 1,
    title:
      "Hướng dẫn đổ mực máy in Laser Canon 2900, HP 1020, HP 1022, HP 1010, HP 12A25",
    description:
      "Các bước hướng dẫn đổ mực máy in Laser Canon 2900, HP 1020, HP 1022, HP 1010, HP 12A25.",
    topic: "Kỹ thuật",
    source: "youtube",
    youtubeId: "PFJXmC--Us0", // 11 ký tự sau "v=" trong link YouTube
    duration: "08:55",
    updatedAt: "2026-11-16",
  },
  {
    id: 2,
    title: "Quy trình xử lý sự cố mạng",
    description:
      "Video nội bộ hướng dẫn kiểm tra và xử lý sự cố mạng văn phòng.",
    topic: "Kỹ thuật",
    source: "youtube",
    youtubeId: "-Kc3Uszm80c",
    duration: "03:47",
    updatedAt: "2026-11-16",
  },
];
