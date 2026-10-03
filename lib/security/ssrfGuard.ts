/**
 * SSRF (Server-Side Request Forgery) protection for external outbound requests (webhooks).
 * Blocks internal network probes, cloud metadata endpoints, and non-HTTPS URLs in production.
 */

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  "::1",
  "0.0.0.0",
  "169.254.169.254", // AWS / GCP / Azure metadata endpoint
  "metadata.google.internal",
  "instance-data",
]);

const PRIVATE_IP_PREFIXES = [
  "10.",
  "127.",
  "169.254.",
  "192.168.",
  "172.16.",
  "172.17.",
  "172.18.",
  "172.19.",
  "172.20.",
  "172.21.",
  "172.22.",
  "172.23.",
  "172.24.",
  "172.25.",
  "172.26.",
  "172.27.",
  "172.28.",
  "172.29.",
  "172.30.",
  "172.31.",
  "fc00:",
  "fe80:",
];

export type SSRFValidationResult =
  | { ok: true; url: URL }
  | { ok: false; error: string };

export function validateOutboundUrl(
  rawUrl: string,
  allowLocalInDev = true
): SSRFValidationResult {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return { ok: false, error: "invalid_url_format" };
  }

  const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";

  // In production, strictly enforce HTTPS
  if (!isDev && parsed.protocol !== "https:") {
    return { ok: false, error: "protocol_must_be_https" };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false, error: "unsupported_protocol" };
  }

  const hostname = parsed.hostname.toLowerCase();

  if (allowLocalInDev && isDev && (hostname === "localhost" || hostname === "127.0.0.1")) {
    return { ok: true, url: parsed };
  }

  if (BLOCKED_HOSTNAMES.has(hostname)) {
    return { ok: false, error: "blocked_hostname_or_metadata" };
  }

  for (const prefix of PRIVATE_IP_PREFIXES) {
    if (hostname.startsWith(prefix)) {
      return { ok: false, error: "blocked_private_ip_range" };
    }
  }

  return { ok: true, url: parsed };
}
