// public/sw.js
const CACHE_VERSION = "v2.0.0";
const CACHE_NAME = `julio-saude-${CACHE_VERSION}`;

// Assets essenciais para funcionar offline
const PRECACHE_URLS = [
  "/",
  "/manifest.json",
  "/icons/app-icon.svg"
];

// Instalar e cachear assets essenciais
self.addEventListener("install", (event) => {
  console.log("[SW] Instalando service worker...");
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Cacheando assets essenciais");
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log("[SW] Instalação completa");
        return self.skipWaiting(); // Ativar imediatamente
      })
      .catch((error) => {
        console.error("[SW] Erro na instalação:", error);
      })
  );
});

// Ativar e limpar caches antigos
self.addEventListener("activate", (event) => {
  console.log("[SW] Ativando service worker...");
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith("julio-saude-") && name !== CACHE_NAME)
            .map((name) => {
              console.log("[SW] Removendo cache antigo:", name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log("[SW] Ativação completa");
        return self.clients.claim(); // Controlar todas as páginas imediatamente
      })
  );
});

// Estratégia de cache: Network First com fallback para Cache
self.addEventListener("fetch", (event) => {
  const { request } = event;
  
  // Ignorar requisições não-GET
  if (request.method !== "GET") return;
  
  // Ignorar requisições de extensões do navegador
  if (request.url.startsWith("chrome-extension://")) return;
  
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Se a resposta for válida, cachear uma cópia
        if (response && response.status === 200) {
          const responseClone = response.clone();
          
          caches.open(CACHE_NAME).then((cache) => {
            // Cachear apenas assets estáticos e páginas
            if (
              request.url.includes("/_next/") ||
              request.url.endsWith(".js") ||
              request.url.endsWith(".css") ||
              request.url.endsWith(".json") ||
              request.destination === "document"
            ) {
              cache.put(request, responseClone);
            }
          });
        }
        
        return response;
      })
      .catch(() => {
        // Se falhar (offline), tentar servir do cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            console.log("[SW] Servindo do cache:", request.url);
            return cachedResponse;
          }
          
          // Se for uma navegação e não tiver cache, retornar página offline
          if (request.destination === "document") {
            return caches.match("/");
          }
          
          // Caso contrário, retornar erro
          return new Response("Offline - conteúdo não disponível", {
            status: 503,
            statusText: "Service Unavailable"
          });
        });
      })
  );
});
