// yokBangun Service Worker - Progressive Web App
const CACHE_NAME = "yokbangun-pwa-v1";
const STATIC_ASSETS = [
  "/",
  "/icon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-512.png",
  "/icons/apple-touch-icon.png",
  "/manifest.webmanifest",
];

// Install: Cache initial shell and take control immediately
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
      .catch((err) => console.warn("[SW] Cache prefetch error:", err))
  );
});

// Activate: Clean up old caches and claim clients
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch: Strategy based on request type
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and external origins
  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // Skip API routes, feed, and webhook submissions
  if (url.pathname.startsWith("/api/") || url.pathname === "/feed.xml") {
    return;
  }

  // For HTML navigation requests: Network First, Fallback to Cache
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = await caches.match("/");
          return fallback || new Response("Offline - yokBangun", { status: 503, headers: { "Content-Type": "text/html" } });
        })
    );
    return;
  }

  // For static assets (CSS, JS chunks, images): Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
