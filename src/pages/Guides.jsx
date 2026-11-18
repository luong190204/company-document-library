import { useEffect, useMemo, useState } from "react";
import { Download, Eye, FileText, Search, X } from "lucide-react";
import * as XLSX from "xlsx";
import Breadcrumb from "../components/common/Breadcrumb.jsx";
import VideoCard from "../components/common/VideoCard.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import { videos, videoTopics } from "../data/videos.js";
import { normalizeText } from "../utils/fileUtils.js";

const guideDocs = [
  {
    id: "doc-ucm6xxx",
    title: "Hướng dẫn cấu hình UCM6XXX",
    description: "Tài liệu hướng dẫn cấu hình tổng đài IP Grandstream UCM6XXX.",
    topic: "Thiết bị",
    fileName: "Hướng dẫn cầu hình UCM6XXX new.pdf",
    fileType: "PDF",
    fileSize: "1,17 MB",
    updatedAt: "2026-11-18",
  },
  {
    id: "doc-grp260x",
    title: "Hướng dẫn cấu hình điện thoại GRP260x",
    description:
      "Tài liệu hướng dẫn cấu hình điện thoại IP Grandstream GRP260x.",
    topic: "Thiết bị",
    fileName: "Hướng dẫn cấu hình điện thoại GRP260x.pdf",
    fileType: "PDF",
    fileSize: "612 KB",
    updatedAt: "2026-11-18",
  },
  {
    id: "doc-tong-dai",
    title: "Tổng đài ĐT",
    description: "Tài liệu thông tin và cấu hình hệ thống tổng đài điện thoại.",
    topic: "Khác",
    fileName: "Tổng đài ĐT.xlsx",
    fileType: "XLSX",
    fileSize: "14,8 KB",
    updatedAt: "2026-11-18",
  },
];

function FilePreviewModal({ doc, onClose }) {
  const [sheets, setSheets] = useState({});
  const [sheetNames, setSheetNames] = useState([]);
  const [activeSheet, setActiveSheet] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileUrl = `/mock-files/${encodeURIComponent(doc.fileName)}`;
  const isPdf = doc.fileType === "PDF";

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (isPdf) return;
    let cancelled = false;

    async function loadExcel() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(fileUrl);
        if (!res.ok)
          throw new Error(
            "Không tìm thấy file trong thư mục public/mock-files",
          );
        const buffer = await res.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "array" });
        const parsed = {};
        workbook.SheetNames.forEach((name) => {
          parsed[name] = XLSX.utils.sheet_to_json(workbook.Sheets[name], {
            header: 1,
            defval: "",
          });
        });
        if (!cancelled) {
          setSheets(parsed);
          setSheetNames(workbook.SheetNames);
          setActiveSheet(workbook.SheetNames[0] || "");
        }
      } catch (err) {
        if (!cancelled)
          setError(err.message || "Không thể đọc nội dung file Excel.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadExcel();
    return () => {
      cancelled = true;
    };
  }, [fileUrl, isPdf]);

  const currentRows = sheets[activeSheet] || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6">
          <div className="min-w-0 pr-4">
            <h3 className="truncate text-base font-bold text-slate-900 sm:text-lg">
              {doc.title}
            </h3>
            <p className="truncate text-xs text-slate-500">
              {doc.fileName} • {doc.fileSize}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={fileUrl}
              download={doc.fileName}
              className="inline-flex items-center gap-1.5 rounded-lg bg-navy-700 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-navy-800 sm:text-sm"
            >
              <Download className="h-4 w-4" />
              Tải về
            </a>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              aria-label="Đóng"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Nội dung hiển thị */}
        <div className="flex-1 overflow-auto bg-slate-50">
          {isPdf ? (
            <iframe
              src={fileUrl}
              title={doc.title}
              className="h-full w-full border-0"
            />
          ) : loading ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              Đang tải dữ liệu bảng tính...
            </div>
          ) : error ? (
            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
              <p className="text-sm font-medium text-red-600">{error}</p>
              <p className="mt-1 text-xs text-slate-500">
                Kiểm tra lại file đã được copy vào thư mục public/mock-files
                chưa.
              </p>
            </div>
          ) : (
            <div className="p-4">
              {sheetNames.length > 1 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {sheetNames.map((name) => (
                    <button
                      key={name}
                      onClick={() => setActiveSheet(name)}
                      className={`rounded-md px-3 py-1 text-xs font-medium ${
                        activeSheet === name
                          ? "bg-navy-700 text-white"
                          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}

              <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <tbody className="divide-y divide-slate-200">
                    {currentRows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={
                          rIdx === 0
                            ? "bg-slate-100 font-semibold"
                            : "hover:bg-slate-50"
                        }
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="whitespace-nowrap border-r border-slate-200 px-3 py-2 text-slate-800 last:border-r-0"
                          >
                            {cell !== null && cell !== undefined
                              ? String(cell)
                              : ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GuideDocCard({ doc, onPreview }) {
  const isPdf = doc.fileType === "PDF";
  return (
    <div
      onClick={() => onPreview(doc)}
      className="card flex cursor-pointer flex-col justify-between p-4 transition-shadow hover:shadow-md"
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ${
              isPdf
                ? "bg-red-50 text-red-700"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            {doc.fileType}
          </span>
          <span className="text-xs text-slate-400">{doc.fileSize}</span>
        </div>
        <h3 className="font-semibold text-slate-900 hover:text-navy-700">
          {doc.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">
          {doc.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-xs text-slate-500">{doc.topic}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(doc);
            }}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-navy-600 hover:text-navy-700"
          >
            <Eye className="h-3.5 w-3.5" />
            Xem
          </button>
          <a
            href={`/mock-files/${encodeURIComponent(doc.fileName)}`}
            download={doc.fileName}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 rounded-lg bg-navy-700 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-navy-800"
          >
            <Download className="h-3.5 w-3.5" />
            Tải
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Guides() {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState("");
  const [previewDoc, setPreviewDoc] = useState(null);

  const allItems = useMemo(() => {
    const videoItems = videos.map((v) => ({ ...v, itemType: "video" }));
    const docItems = guideDocs.map((d) => ({ ...d, itemType: "doc" }));
    return [...videoItems, ...docItems];
  }, []);

  const filtered = useMemo(() => {
    const keyword = normalizeText(q);
    return allItems
      .filter((item) => !topic || item.topic === topic)
      .filter(
        (item) =>
          !keyword ||
          normalizeText(`${item.title} ${item.description}`).includes(keyword),
      )
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [allItems, q, topic]);

  const groupedSections = useMemo(() => {
    const topicsToShow = topic ? [topic] : videoTopics;
    return topicsToShow
      .map((t) => ({
        topic: t,
        items: filtered.filter((item) => item.topic === t),
      }))
      .filter((group) => group.items.length > 0);
  }, [filtered, topic]);

  const chip = (active) =>
    `rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
      active
        ? "border-navy-700 bg-navy-700 text-white"
        : "border-slate-300 bg-white text-slate-700 hover:border-navy-600"
    }`;

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
            placeholder="Tìm video hoặc tài liệu hướng dẫn..."
            aria-label="Tìm hướng dẫn"
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
        Có <strong className="text-slate-900">{filtered.length}</strong> hướng
        dẫn
      </p>

      {groupedSections.length === 0 ? (
        <EmptyState title="Không tìm thấy hướng dẫn phù hợp" />
      ) : (
        <div className="space-y-8">
          {groupedSections.map((group) => (
            <section key={group.topic}>
              <h2 className="mb-3 border-b border-slate-200 pb-2 text-lg font-bold text-slate-800">
                {group.topic}{" "}
                <span className="text-sm font-normal text-slate-500">
                  ({group.items.length})
                </span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) =>
                  item.itemType === "video" ? (
                    <VideoCard key={item.id} video={item} />
                  ) : (
                    <GuideDocCard
                      key={item.id}
                      doc={item}
                      onPreview={setPreviewDoc}
                    />
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      )}

      {previewDoc && (
        <FilePreviewModal
          doc={previewDoc}
          onClose={() => setPreviewDoc(null)}
        />
      )}
    </div>
  );
}
