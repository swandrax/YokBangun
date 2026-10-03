/**
 * Safe JSON body parser with strict size limits to prevent memory exhaustion DoS.
 */

export const MAX_BODY_BYTES = 64 * 1024; // 64 KB

export type SafeJsonResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: "payload_too_large" | "invalid_json" };

export async function parseSafeJson<T = unknown>(
  request: Request,
  maxBytes: number = MAX_BODY_BYTES
): Promise<SafeJsonResult<T>> {
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > maxBytes) {
    return { ok: false, error: "payload_too_large" };
  }

  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).length > maxBytes) {
      return { ok: false, error: "payload_too_large" };
    }
    const data = JSON.parse(text) as T;
    return { ok: true, data };
  } catch {
    return { ok: false, error: "invalid_json" };
  }
}
