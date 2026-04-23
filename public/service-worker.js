const CACHE_VERSION = "20260423a";
const SHELL_CACHE = `agri-menu-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `agri-menu-runtime-${CACHE_VERSION}`;
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./src/styles.css?v=20260423a",
  "./generated/main.runtime.20260423a.js",
  "./src/fonts/montserrat-latin-variable.woff2",
  "./src/fonts/lulo-clean-bold.woff2",
  "./src/fonts/housky-demo.woff2",
  "./src/fonts/factually-handwriting.woff2",
  "./src/fonts/sign-painter.woff2",
  "./menu-assets/sgb-molino-black.png?v=20260423a",
  "./menu-assets/instagram-logo.webp?v=20260423a",
  "./farfalla-bianca.webp?v=20260423a",
  "./format-carousel/bbq-picnic.png?v=20260423a",
  "./format-carousel/bbq-stelle.png?v=20260423a",
  "./format-carousel/cinema.png?v=20260423a",
  "./format-carousel/country.png?v=20260423a",
  "./format-carousel/dam.png?v=20260423a",
  "./format-carousel/ig-agrieventi.png?v=20260423a",
  "./format-carousel/agrieventi-logo.png?v=20260423a",
  "./format-carousel/bbq-hub.png?v=20260423a",
  "./pwa/apple-touch-icon.png",
  "./pwa/favicon-32.png",
  "./pwa/icon-192.png",
  "./pwa/icon-512.png",
  "./pwa/icon-512-maskable.png",
  "./data/menu-data.json",
  "./data/sheet-config.json",
  "./menu-data.json",
  "./sheet-config.json",
  "./menu-data-fallback.json",
  "./sheet-config-fallback.json"
];

function isCacheableResponse(response) {
  return Boolean(response && response.ok && (response.type === "basic" || response.type === "default"));
}

async function warmShellCache() {
  const cache = await caches.open(SHELL_CACHE);

  await Promise.all(
    APP_SHELL.map(async (asset) => {
      try {
        const response = await fetch(asset, { cache: "no-store" });
        if (!isCacheableResponse(response)) {
          return;
        }

        await cache.put(asset, response.clone());
      } catch (error) {
        // Skip optional shell assets rather than failing the whole install.
      }
    })
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(warmShellCache().then(() => self.skipWaiting()));
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
          if (isCacheableResponse(response)) {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put("./index.html", copy));
          }
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
        if (isCacheableResponse(response)) {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
