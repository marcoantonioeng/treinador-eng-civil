/* Treinador Engenharia Civil — service worker: guarda o app no aparelho para funcionar sem internet. */
var VERSAO = 'treinador-af5f89f82d';
var ARQUIVOS = ['./', './index.html', './manifest.webmanifest', './icones/icone-192.png', './icones/icone-512.png',
  './icones/icone-maskable-512.png', './icones/apple-touch-icon.png', './icones/favicon-32.png'];

self.addEventListener('install', function (ev) {
  ev.waitUntil(caches.open(VERSAO).then(function (c) { return c.addAll(ARQUIVOS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (ev) {
  ev.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== VERSAO && k !== 'treinador-fontes'; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (ev) {
  var req = ev.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  // Fontes do Google: usa a cópia guardada e atualiza em segundo plano.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    ev.respondWith(caches.open('treinador-fontes').then(function (c) {
      return c.match(req).then(function (salvo) {
        var rede = fetch(req).then(function (r) { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; }).catch(function () { return salvo; });
        return salvo || rede;
      });
    }));
    return;
  }
  if (url.origin !== self.location.origin) return;
  // A página: tenta a rede primeiro (para receber atualizações) e cai na cópia guardada sem internet.
  // no-cache: confere com o servidor em vez de usar a cópia do navegador, que o GitHub Pages deixa valer 10 min.
  if (req.mode === 'navigate') {
    ev.respondWith(fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }).then(function (r) {
      var copia = r.clone(); caches.open(VERSAO).then(function (c) { c.put('./index.html', copia); });
      return r;
    }).catch(function () { return caches.match('./index.html'); }));
    return;
  }
  ev.respondWith(caches.match(req).then(function (salvo) { return salvo || fetch(req); }));
});
