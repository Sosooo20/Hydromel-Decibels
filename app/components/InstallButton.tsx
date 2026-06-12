"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
}

export default function InstallButton() {
    const [installPrompt, setInstallPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (
            event: Event,
        ) => {
            event.preventDefault();

            setInstallPrompt(
                event as BeforeInstallPromptEvent,
            );
        };

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt,
        );

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt,
            );
        };
    }, []);

    const handleInstall = async () => {
        if (!installPrompt) return;

        await installPrompt.prompt();

        const choice = await installPrompt.userChoice;

        if (choice.outcome === "accepted") {
            console.log("Installation acceptée");
        } else {
            console.log("Installation refusée");
        }

        setInstallPrompt(null);
    };

    // On masque le bouton si l'installation n'est pas disponible
    if (!installPrompt) {
        return (
            <div className="btn-hero-outline">
                Changer de navigateur pour télécharger la PWA
            </div>
        );
    }

    return (
        <button
            onClick={handleInstall}
            className="btn-hero-outline"
        >
            Télécharger l&apos;application
        </button>
    );
}