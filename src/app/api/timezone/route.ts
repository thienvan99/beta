import { lookupIanaTimeZone } from "@/lib/timezone-lookup.server";

export const runtime = "nodejs";

type TimeZoneRequest = {
  latitude?: unknown;
  longitude?: unknown;
};

export async function POST(request: Request) {
  let body: TimeZoneRequest;

  try {
    body = (await request.json()) as TimeZoneRequest;
  } catch {
    return Response.json(
      { error: "Dữ liệu tọa độ không hợp lệ." },
      { status: 400 },
    );
  }

  if (typeof body.latitude !== "number" || typeof body.longitude !== "number") {
    return Response.json(
      { error: "Dữ liệu tọa độ không hợp lệ." },
      { status: 400 },
    );
  }

  const timeZone = lookupIanaTimeZone(body.latitude, body.longitude);

  if (!timeZone) {
    return Response.json(
      {
        error:
          "Không xác định được múi giờ từ tọa độ. Vui lòng nhập IANA timezone hợp lệ.",
      },
      { status: 422 },
    );
  }

  return Response.json({ timeZone });
}
