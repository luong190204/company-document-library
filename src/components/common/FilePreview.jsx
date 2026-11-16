import { useEffect, useRef, useState } from "react";

const MAX_ROWS = 300; // giới hạn số dòng hiển thị cho file Excel lớn

/** Tải file về dạng buffer; ném lỗi nếu không tồn tại (dev server trả index.html khi thiếu file). */
async function loadBuffer(url) {
  const res = await fetch(url);
  const type = res.headers.get("content-type") || "";
  if (!res.ok || type.includes("text/html"))
    throw new Error("Không tìm thấy file");
  return res.arrayBuffer();
}

function Message({ children }) {
  return (
    <p className="rounded-xl bg-slate-100 p-6 text-sm text-slate-500">
      {children}
    </p>
  );
}

function PdfPreview({ url }) {
  const [available, setAvailable] = useState(null);
  useEffect(() => {
    loadBuffer(url).then(
      () => setAvailable(true),
      () => setAvailable(false),
    );
  }, [url]);
  if (available === null)
    return <div className="h-64 animate-pulse rounded-xl bg-slate-100" />;
  if (!available) return <Message>Chưa có file PDF để xem trước.</Message>;
  return (
    <iframe
      src={url}
      title="Xem trước tài liệu"
      className="h-[70vh] w-full rounded-xl border border-slate-200"
    />
  );
}

function DocxPreview({ url }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    (async () => {
      try {
        const buffer = await loadBuffer(url);
        const { renderAsync } = await import("docx-preview");
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = "";
        await renderAsync(buffer, containerRef.current, undefined, {
          inWrapper: true,
        });
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <>
      {status === "loading" && (
        <div className="h-64 animate-pulse rounded-xl bg-slate-100" />
      )}
      {status === "error" && (
        <Message>Không thể xem trước file Word. Hãy tải xuống để mở.</Message>
      )}
      <div
        ref={containerRef}
        className={`max-h-[75vh] overflow-auto rounded-xl border border-slate-200 bg-slate-200 ${status === "ready" ? "" : "hidden"}`}
      />
    </>
  );
}

function XlsxPreview({ url }) {
  const [sheets, setSheets] = useState(null);
  const [active, setActive] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setSheets(null);
    setError(false);
    setActive(0);
    (async () => {
      try {
        const buffer = await loadBuffer(url);
        const XLSX = await import("xlsx");
        const wb = XLSX.read(buffer, { type: "array" });
        const data = wb.SheetNames.map((name) => ({
          name,
          rows: XLSX.utils.sheet_to_json(wb.Sheets[name], {
            header: 1,
            defval: "",
            raw: false,
          }),
        }));
        if (!cancelled) setSheets(data);
      } catch {
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (error)
    return (
      <Message>Không thể xem trước file Excel. Hãy tải xuống để mở.</Message>
    );
  if (!sheets)
    return <div className="h-64 animate-pulse rounded-xl bg-slate-100" />;

  const { rows } = sheets[active];
  const shown = rows.slice(0, MAX_ROWS);
  const colCount = Math.max(0, ...shown.map((r) => r.length));

  return (
    <div className="card overflow-hidden">
      {sheets.length > 1 && (
        <div className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-slate-50 px-2 pt-2">
          {sheets.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setActive(i)}
              className={`whitespace-nowrap rounded-t-lg px-4 py-2 text-sm font-medium ${i === active ? "bg-white text-navy-700" : "text-slate-500 hover:text-navy-700"}`}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}
      <div className="max-h-[70vh] overflow-auto">
        {shown.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">Trang tính này trống.</p>
        ) : (
          <table className="min-w-full border-collapse text-sm">
            <tbody>
              {shown.map((row, r) => (
                <tr
                  key={r}
                  className={
                    r === 0
                      ? "sticky top-0 bg-slate-100 font-semibold"
                      : "hover:bg-navy-50/50"
                  }
                >
                  {Array.from({ length: colCount }, (_, c) => (
                    <td
                      key={c}
                      className="whitespace-nowrap border border-slate-200 px-3 py-1.5 text-slate-700"
                    >
                      {row[c] ?? ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {rows.length > MAX_ROWS && (
        <p className="border-t border-slate-200 px-4 py-2 text-xs text-slate-500">
          Chỉ hiển thị {MAX_ROWS} dòng đầu. Tải xuống để xem đầy đủ.
        </p>
      )}
    </div>
  );
}

const previews = { PDF: PdfPreview, DOCX: DocxPreview, XLSX: XlsxPreview };

export default function FilePreview({ doc }) {
  const Preview = previews[doc.fileType];
  if (!Preview)
    return (
      <Message>
        Định dạng này chưa hỗ trợ xem trước. Hãy tải xuống để mở.
      </Message>
    );
  return <Preview key={doc.fileUrl} url={doc.fileUrl} />;
}
