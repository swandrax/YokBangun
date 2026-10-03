/**
 * Lightweight, in-memory sliding window rate limiter for Next.js Route Handlers.
 * Designed to prevent DDoS, brute-force spam, and webhook abuse.
 */

type RateLimitRecord = {
  timestamps: number[];
};

const store = new Map<string, RateLimitRecord>();

// Periodically clean up stale entries (every 5 minutes)
let lastCleanup = Date.now();
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

function cleanupStaleEntries(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, record] of store.entries()) {
    record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);
    if (record.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

export type RateLimitConfig = {
  maxRequests: number; // e.g. 5 requests
  windowMs: number;    // e.g. 60_000 (1 minute)
};

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
};

export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 5, windowMs: 60_000 }
): RateLimitResult {
  const now = Date.now();
  cleanupStaleEntries(config.windowMs);

  const record = store.get(identifier) ?? { timestamps: [] };

  // Filter timestamps within current sliding window
  const validTimestamps = record.timestamps.filter(
    (ts) => now - ts < config.windowMs
  );

  const oldestTimestamp = validTimestamps[0] ?? now;
  const resetMs = Math.max(0, config.windowMs - (now - oldestTimestamp));

  if (validTimestamps.length >= config.maxRequests) {
    record.timestamps = validTimestamps;
    store.set(identifier, record);
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      resetMs,
    };
  }

  validTimestamps.push(now);
  record.timestamps = validTimestamps;
  store.set(identifier, record);

  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - validTimestamps.length,
    resetMs,
  };
}

/**
 * Extracts a client identifier from standard request headers.
 */
export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp.trim();
  }
  return "127.0.0.1";
}
