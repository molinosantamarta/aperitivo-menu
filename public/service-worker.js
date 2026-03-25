const CACHE_VERSION = "20260325g";
const SHELL_CACHE = `agri-menu-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `agri-menu-runtime-${CACHE_VERSION}`;
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./src/styles.css?v=20260325h",
  "./generated/main.runtime.js?v=20260325h",
  "./menu-assets/sgb-molino-black.png?v=20260325h",
  "./menu-assets/instagram-logo.webp?v=20260325h",
  "./farfalla-bianca.gif?v=20260325h",
  "./pwa/apple-touch-icon.png",
  "./pwa/favicon-32.png",
  "./pwa/icon-192.png",
  "./pwa/icon-512.png",
  "./pwa/icon-512-maskable.png",
  "./data/menu-data.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith("agri-menu-") && key !== SHELL_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(async () => {
          const runtimeMatch = await caches.match("./index.html");
          if (runtimeMatch) {
            return runtimeMatch;
          }

          return caches.match("./");
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});
