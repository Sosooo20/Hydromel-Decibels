// === Service Worker : exemple simple de cache "offline" ===
// Un service worker tourne en arrière-plan, séparé de la page.
// Ici on illustre les 3 grandes étapes : install -> activate -> fetch.

const CACHE = "mon-cache-v1";

// Les ressources qu'on veut disponibles hors-ligne
const RESSOURCES = ["/"];

// 1) INSTALL : on met les ressources en cache dès l'installation
self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(RESSOURCES)));
});

// 2) ACTIVATE : on supprime les vieux caches (anciennes versions)
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((names) =>
                Promise.all(
                    names
                        .filter((name) => name !== CACHE)
                        .map((name) => caches.delete(name)),
                ),
            ),
    );
});

// 3) FETCH : à chaque requête, on regarde d'abord dans le cache,
//    et si ce n'est pas là, on va chercher sur le réseau.
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        }),
    );
});