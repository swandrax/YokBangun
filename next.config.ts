import type { NextConfig } from "next";

/**
 * Locale routing without middleware.
 *
 * - Bahasa Indonesia (default) is served WITHOUT a prefix:  /services
 * - English is served under /en:                              /en/services
 *
 * Internally every page lives in app/[locale]/..., so "/services" is rewritten
 * to "/id/services". Config-level rewrites/redirects are supported by Vercel and
 * by the Cloudflare adapters (OpenNext / vinext), which keeps routing portable
 * and avoids the Node.js proxy runtime that is still experimental on Workers.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 430, 640, 768, 1024, 1280, 1440, 1920],
  },
  async redirects() {
    return [
      // Canonicalise the explicit default-locale prefix.
      { source: "/id", destination: "/", permanent: true },
      { source: "/id/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        { source: "/", destination: "/id" },
        {
          source: "/:path((?!en(?:/|$)|id(?:/|$)|api/|_next/).+)",
          destination: "/id/:path",
        },
      ],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
