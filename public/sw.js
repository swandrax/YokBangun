// yokBangun Service Worker - Companion PWA Specification
const CACHE_VERSION = "yokbangun-pwa-v2";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DATA_CACHE = `${CACHE_VERSION}-data`;

const PRECACHE_ASSETS = [
  "/",
  "/offline.html",
  "/manifest.webmanifest",
  "/icon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-512.png",
  "/icons/apple-touch-icon.png",
];

// 1. Install Event: Precache offline shell & essential assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn("[SW] Precache failed:", err);
      })
  );
});

// 2. Activate Event: Clean up outdated caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== STATIC_CACHE && key !== DATA_CACHE) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

// Helper: Check if request is for static assets/fonts/illustrations
function isStaticAsset(url, request) {
  const pathname = url.pathname;
  return (
    request.destination === "font" ||
    request.destination === "image" ||
    request.destination === "style" ||
    request.destination === "script" ||
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/about/") ||
    pathname.startsWith("/brand/") ||
    pathname.startsWith("/videos/") ||
    pathname === "/icon.svg" ||
    url.hostname.includes("fonts.googleapis.com") ||
    url.hostname.includes("fonts.gstatic.com")
  );
}

// Helper: Check if request is for public cacheable content/API
function isPublicContentApi(url) {
  const pathname = url.pathname;
  return (
    pathname.startsWith("/api/v1/products") ||
    pathname.startsWith("/api/v1/case-studies") ||
    pathname === "/api/public-content.json"
  );
}

// 3. Fetch Event Routing
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Strategy A: Network-Only for contact form submissions (never fake success offline)
  if (
    request.method === "POST" &&
    (url.pathname === "/api/v1/contact" ||
      url.pathname === "/api/contact" ||
      url.pathname.includes("/contact"))
  ) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(
          JSON.stringify({
            ok: false,
            offline: true,
            error: "offline",
            message:
              "Anda sedang offline. Pengiriman formulir kontak dinonaktifkan tanpa koneksi internet.",
          }),
          {
            status: 503,
            statusText: "Service Unavailable (Offline)",
            headers: { "Content-Type": "application/json" },
          }
        );
      })
    );
    return;
  }

  // Skip other non-GET requests or unhandled schemes
  if (request.method !== "GET" || !url.protocol.startsWith("http")) {
    return;
  }

  // Strategy B: Cache-First for static assets, fonts, logo, and illustrations
  if (isStaticAsset(url, request)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) =>
        cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
        })
      )
    );
    return;
  }

  // Strategy C: Stale-While-Revalidate for public content APIs
  if (isPublicContentApi(url)) {
    event.respondWith(
      caches.open(DATA_CACHE).then((cache) =>
        cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        })
      )
    );
    return;
  }

  // Strategy D: Stale-While-Revalidate for navigation/public HTML pages, fallback to offline.html
  if (request.mode === "navigate") {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) =>
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(async () => {
            // First attempt to serve cached version of this page
            const cachedPage = await cache.match(request);
            if (cachedPage) return cachedPage;

            // Otherwise serve self-contained offline fallback
            const offlinePage = await cache.match("/offline.html");
            return (
              offlinePage ||
              new Response("Offline - yokBangun", {
                status: 503,
                headers: { "Content-Type": "text/html; charset=utf-8" },
              })
            );
          })
      )
    );
    return;
  }

  // Strategy E: Same-origin default Stale-While-Revalidate
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) =>
        cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        })
      )
    );
  }
});
