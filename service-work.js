const CACHE_NAME = 'paises-cache-v1';
const urlsToCache = [
  '/',
  '/index.html', // O arquivo HTML principal
  '/css/bootstrap.css', // Estilos CSS
  '/css/style.css', // Estilos CSS
  '/script.js', // Seu script JS principal
  'https://kit.fontawesome.com/1c98dd5571.js', // FontAwesome
  'https://code.jquery.com/jquery-3.7.1.min.js', // jQuery
  'https://unpkg.com/axios@1.6.7/dist/axios.min.js' // Axios
];

// Instalando o service worker e adicionando recursos ao cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptando requisições e retornando recursos do cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Recurso encontrado no cache
        if (response) {
          return response;
        }
        // Recurso não encontrado no cache, buscar da rede
        return fetch(event.request);
      })
  );
});

// Atualizando o service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});