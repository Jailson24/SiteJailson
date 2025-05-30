const CACHE_NAME = "cei-cache-v4";
const urlsToCache = [
  "./",
  "./index.html",
  "./sobremim.html",
  "./designgrafico.html",
  "./programacao.html",
  "./redessociais.html",
  "./contato.html",
  "./offline.html",
  "./style.css",
  "./variables.css",
  "./script.js",
  "./manifest.json",
  "./sitemap.xml",
  "./public/img/logo.png",
  "./public/img/fundo.jpg",
  "./public/img/fundo-sobre.jpg",
  "./public/img/fundo-louvor.jpg",
  "./public/img/fundo-ministerios.jpg",
  "./public/img/fundo-midias.jpg",
  "./public/img/fundo-contato.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => caches.match("./offline.html"))
      );
    })
  );
});
