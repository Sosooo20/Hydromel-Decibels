"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-forest py-16">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h2 className="font-display mb-3 text-2xl font-bold text-parchment-light md:text-3xl">
          Recevez les Annonces du Royaume
        </h2>
        <p className="font-heading mb-6 text-sm text-parchment">
          Inscrivez-vous pour ne manquer aucune annonce d&apos;artiste, de quête ou de billetterie.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="font-heading flex-1 rounded-full bg-parchment-light px-4 py-3 text-sm text-brown outline-none placeholder:text-brown-mid/60 sm:max-w-xs"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="font-heading rounded-full bg-gold px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-forest transition-colors hover:bg-gold-light disabled:opacity-60"
          >
            {status === "loading" ? "Envoi..." : "S'inscrire"}
          </button>
        </form>
        {status === "success" && (
          <p className="font-heading mt-4 text-sm text-gold">
            Votre nom a été inscrit dans le grand registre !
          </p>
        )}
        {status === "error" && (
          <p className="font-heading mt-4 text-sm text-red-300">
            Une erreur est survenue. Réessayez plus tard.
          </p>
        )}
      </div>
    </section>
  );
}
