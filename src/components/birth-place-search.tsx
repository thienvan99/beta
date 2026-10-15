"use client";

import { useEffect, useRef, useState } from "react";
import { searchBirthPlaces, type BirthPlace } from "@/lib/place-search";

export function BirthPlaceSearch({ selected, onSelect, onClear }: {
  selected: BirthPlace | null;
  onSelect: (place: BirthPlace) => void;
  onClear: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BirthPlace[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const generation = useRef(0);
  const lastRequest = useRef(0);
  const cache = useRef(new Map<string, BirthPlace[]>());
  const firstResult = useRef<HTMLButtonElement>(null);
  const queryInput = useRef<HTMLInputElement>(null);
  useEffect(() => () => { generation.current++; controller.current?.abort(); }, []);

  async function search() {
    const text = query.trim();
    if (text.length < 3) { setStatus("Nhập ít nhất 3 ký tự, kèm tỉnh/thành và quốc gia."); return; }
    const cached = cache.current.get(text);
    if (!cached && Date.now() - lastRequest.current < 2000) {
      setStatus("Vui lòng đợi một chút trước khi tìm lại."); return;
    }
    const request = ++generation.current;
    controller.current?.abort();
    const abort = new AbortController();
    controller.current = abort;
    setLoading(true);
    setStatus("Đang tìm nơi sinh…");
    setResults([]);
    const timeout = setTimeout(() => abort.abort(), 12_000);
    try {
      if (!cached) lastRequest.current = Date.now();
      const places = cached ?? await searchBirthPlaces(text, abort.signal);
      if (request !== generation.current) return;
      if (cache.current.size >= 20) cache.current.clear();
      cache.current.set(text, places);
      setResults(places);
      setStatus(places.length ? "Chọn đúng nơi sinh bên dưới; kiểm tra tỉnh/thành và quốc gia." : "Chưa tìm thấy. Thử tên bệnh viện hoặc tên đường kèm tỉnh/thành, quốc gia; hoặc nhập tọa độ thủ công.");
    } catch {
      if (request === generation.current) setStatus("Chưa kết nối được dịch vụ tìm địa chỉ. Giữ nguyên thông tin và thử lại, hoặc nhập tọa độ thủ công bên dưới.");
    } finally {
      clearTimeout(timeout);
      if (request === generation.current) setLoading(false);
    }
  }

  return <section aria-labelledby="birth-place-label">
    <label id="birth-place-label" htmlFor="birth-place-query" className="text-sm font-semibold text-[#2d4140]">Nơi sinh</label>
    <p id="birth-place-help" className="mt-2 text-base leading-6 text-[#526560]">Nhập tên bệnh viện, địa chỉ hoặc thành phố nơi bạn sinh, rồi bấm Tìm địa chỉ. Ví dụ: Bệnh viện Từ Dũ, TP. Hồ Chí Minh, Việt Nam.</p>
    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
      <input ref={queryInput} id="birth-place-query" value={query} maxLength={200} autoComplete="off"
        placeholder="Tên bệnh viện, đường, tỉnh/thành…"
        aria-describedby="birth-place-help birth-place-privacy" aria-controls="birth-place-results"
        className="min-w-0 flex-1 rounded-md border border-[#cad3d0] bg-white px-3 py-3 text-base text-[#182a29] focus-visible:outline-3 focus-visible:outline-[#1c6d68]"
        onChange={event => {
          generation.current++; controller.current?.abort(); setLoading(false);
          setQuery(event.target.value); setResults([]); setStatus(""); onClear();
        }}
        onKeyDown={event => {
          if (event.key === "Enter") { event.preventDefault(); void search(); }
          if (event.key === "ArrowDown" && results.length) { event.preventDefault(); firstResult.current?.focus(); }
        }} />
      <button type="button" onClick={() => void search()} disabled={loading}
        className="min-h-11 rounded-md bg-[#1c6d68] px-4 py-3 font-semibold text-white focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#153433] disabled:opacity-60">
        {loading ? "Đang tìm…" : "Tìm địa chỉ"}
      </button>
    </div>
    <p id="birth-place-privacy" className="mt-2 text-sm leading-6 text-[#526560]">Khi bấm Tìm, nội dung ô này được gửi tới Photon để tra cứu. Không nhập họ tên hay thông tin riêng tư; ngày giờ sinh không được gửi. Dữ liệu địa điểm: <a className="underline" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</a> · <a className="underline" href="https://photon.komoot.io" target="_blank" rel="noreferrer">Photon</a>.</p>
    <p role="status" aria-live="polite" className="mt-2 text-sm leading-6 text-[#315450]">{status}</p>
    <ul id="birth-place-results" aria-label="Kết quả tìm nơi sinh" className="mt-2 space-y-2">
      {results.map((place, index) => <li key={place.id}>
        <button ref={index === 0 ? firstResult : undefined} type="button"
          className="w-full rounded-md border border-[#cad3d0] bg-white p-3 text-left text-base text-[#213c39] hover:bg-[#f0f7f5] focus-visible:outline-3 focus-visible:outline-[#1c6d68]"
          onClick={() => { generation.current++; controller.current?.abort(); onSelect(place); setQuery(place.label); setResults([]); setStatus(""); queryInput.current?.focus(); }}>
          {place.label}
          {place.precision === "locality" && <span className="mt-1 block text-sm text-[#526560]">Vị trí đại diện khu vực, không phải địa chỉ chính xác.</span>}
        </button>
      </li>)}
    </ul>
    {selected && <div role="status" className="mt-3 rounded-md border border-[#c7ddd6] bg-[#f0f7f5] p-3 text-base text-[#315450]">
      <p className="font-semibold">Đã chọn nơi sinh</p><p className="mt-1 break-words">{selected.label}</p>
      <p className="mt-2 text-sm">{selected.precision === "locality" ? "Đây là vị trí đại diện khu vực. Hãy tìm bệnh viện hoặc địa chỉ cụ thể hơn nếu bạn biết." : "Kiểm tra lại vị trí trên bản đồ; kết quả tìm kiếm không bảo đảm đúng số nhà hay vị trí sinh thực tế."}</p>
      <a className="mt-2 inline-block underline focus-visible:outline-3" target="_blank" rel="noreferrer" href={`https://www.openstreetmap.org/?mlat=${selected.latitude}&mlon=${selected.longitude}#map=16/${selected.latitude}/${selected.longitude}`}>Kiểm tra vị trí trên bản đồ</a>
    </div>}
  </section>;
}
