"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    const installHandler = () => {
      console.log("PWA installable !");
    };

    window.addEventListener("beforeinstallprompt", installHandler);

    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      // En dev, on désinscrit tout SW existant pour éviter de servir des
      // réponses (notamment les fetchs RSC) mises en cache lors de tests précédents.
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });
      return () => {
        window.removeEventListener(
            "beforeinstallprompt",
            installHandler
        );
      };
    }

    /*navigator.serviceWorker.register("/sw.js").catch(() => {
      // Échec silencieux : la PWA reste utilisable en ligne sans le service worker.
    });*/

    navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("SW enregistré"))
        .catch(console.error);

    return () => {
      window.removeEventListener(
          "beforeinstallprompt",
          installHandler
      );
    };
  }, []);

  return null;
}
