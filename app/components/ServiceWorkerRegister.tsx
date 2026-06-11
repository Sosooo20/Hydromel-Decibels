"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      // En dev, on désinscrit tout SW existant pour éviter de servir des
      // réponses (notamment les fetchs RSC) mises en cache lors de tests précédents.
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Échec silencieux : la PWA reste utilisable en ligne sans le service worker.
    });
  }, []);

  return null;
}
