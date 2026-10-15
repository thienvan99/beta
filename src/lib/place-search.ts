export type BirthPlace = Readonly<{
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  precision: "locality" | "place";
  source: "photon";
}>;

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown> : null;
}

export function normalizePhotonResults(payload: unknown): BirthPlace[] {
  const features = record(payload)?.features;
  if (!Array.isArray(features)) throw new Error("Invalid place response");
  const places: BirthPlace[] = [];
  const seen = new Set<string>();
  for (const feature of features) {
    const item = record(feature);
    const geometry = record(item?.geometry);
    const properties = record(item?.properties);
    const coordinates = geometry?.coordinates;
    if (geometry?.type !== "Point" || !Array.isArray(coordinates) || !properties) continue;
    const [longitude, latitude] = coordinates;
    if (typeof latitude !== "number" || typeof longitude !== "number" ||
      !Number.isFinite(latitude) || !Number.isFinite(longitude) ||
      Math.abs(latitude) > 90 || Math.abs(longitude) > 180) continue;
    const street = [properties.housenumber, properties.street].filter(value => typeof value === "string" && value.trim()).join(" ");
    const parts = [properties.name, street, properties.district, properties.city, properties.county, properties.state, properties.country]
      .filter((value): value is string => typeof value === "string" && Boolean(value.trim()));
    const label = [...new Set(parts)].join(", ");
    if (!label) continue;
    const id = `${properties.osm_type ?? "place"}:${properties.osm_id ?? label}:${latitude}:${longitude}`;
    if (seen.has(id)) continue;
    seen.add(id);
    places.push({ id, label, latitude, longitude, source: "photon",
      precision: ["place", "boundary"].includes(String(properties.osm_key)) || ["city", "town", "village", "district", "county", "state", "country", "locality"].includes(String(properties.type)) ? "locality" : "place" });
    if (places.length === 5) break;
  }
  return places;
}

export async function searchBirthPlaces(query: string, signal: AbortSignal): Promise<BirthPlace[]> {
  const text = query.trim();
  if (text.length < 3 || text.length > 200) throw new Error("Invalid place query");
  const url = new URL("https://photon.komoot.io/api/");
  url.searchParams.set("q", text);
  url.searchParams.set("limit", "5");
  const response = await fetch(url, { signal, credentials: "omit", referrerPolicy: "origin" });
  if (!response.ok) throw new Error("Place service unavailable");
  return normalizePhotonResults(await response.json());
}
