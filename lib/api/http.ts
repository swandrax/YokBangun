/**
 * Minimal HTTP layer for TanStack Query fetchers and mutations.
 *
 * NEXT_PUBLIC_API_BASE_URL lets the frontend talk to an external backend later.
 * When empty, same-origin Next.js Route Handlers under /api are used.
 */
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function apiUrl(path: string): string {
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

async function parse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const body = text ? (JSON.parse(text) as unknown) : undefined;
  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, response.status, body);
  }
  return body as T;
}

export async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(apiUrl(path), {
    ...init,
    headers: { Accept: "application/json", ...init?.headers },
  });
  return parse<T>(response);
}

export async function postJson<T>(path: string, data: unknown): Promise<T> {
  const response = await fetch(apiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  return parse<T>(response);
}
