import { afterEach, describe, expect, it, vi } from "vitest";
import { normalizePhotonResults, searchBirthPlaces } from "./place-search";

const feature = { geometry: { type: "Point", coordinates: [106.68, 10.77] }, properties: {
  osm_type: "W", osm_id: 123, name: "Bệnh viện Từ Dũ", city: "Hồ Chí Minh", country: "Việt Nam", type: "house",
} };
afterEach(() => vi.unstubAllGlobals());
describe("address search boundary", () => {
  it("maps longitude/latitude correctly, deduplicates and retains address context", () => {
    const places = normalizePhotonResults({ features: [feature, feature] });
    expect(places).toHaveLength(1);
    expect(places[0]).toMatchObject({ latitude: 10.77, longitude: 106.68, label: "Bệnh viện Từ Dũ, Hồ Chí Minh, Việt Nam", precision: "place", source: "photon" });
  });
  it("rejects invalid coordinates instead of producing a usable birth location", () => {
    expect(normalizePhotonResults({ features: [{ ...feature, geometry: { type: "Point", coordinates: [181, 92] } }, { ...feature, geometry: { type: "Point", coordinates: ["106", 10] } }] })).toEqual([]);
    expect(() => normalizePhotonResults({ error: "bad response" })).toThrow();
  });
  it("flags administrative boundaries and cities as approximate, including type other", () => {
    expect(normalizePhotonResults({ features: [{ ...feature, properties: { ...feature.properties, type: "other", osm_key: "boundary" } }] })[0].precision).toBe("locality");
  });
  it("sends only a trimmed query and result limit, with no credentials or birth data", async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ features: [feature] }) });
    vi.stubGlobal("fetch", fetcher);
    const signal = new AbortController().signal;
    await searchBirthPlaces(" Hà Nội ", signal);
    const [url, options] = fetcher.mock.calls[0];
    expect([...url.searchParams]).toEqual([["q", "Hà Nội"], ["limit", "5"]]);
    expect(options).toEqual({ signal, credentials: "omit", referrerPolicy: "origin" });
  });
  it("rejects empty input before network access and surfaces provider failure", async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal("fetch", fetcher);
    await expect(searchBirthPlaces("ab", new AbortController().signal)).rejects.toThrow();
    expect(fetcher).not.toHaveBeenCalled();
    await expect(searchBirthPlaces("Hà Nội", new AbortController().signal)).rejects.toThrow("unavailable");
  });
});
