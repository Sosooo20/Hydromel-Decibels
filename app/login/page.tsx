"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type Tab = "login" | "register";

const inputClass =
  "font-heading w-full rounded-lg border border-parchment-dark bg-parchment-light px-4 py-3 text-sm text-brown outline-none placeholder:text-brown-mid/60 focus:border-gold";

const submitClass =
  "font-heading mt-2 w-full rounded-full bg-gold px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-forest transition-colors hover:bg-gold-light disabled:opacity-60";

const socialClass =
  "font-heading flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-parchment-dark bg-parchment-light px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brown-mid opacity-60";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function switchTab(next: Tab) {
    setTab(next);
    setError(null);
  }

  async function handleLogin(formData: FormData) {
    setError(null);
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        identifier: formData.get("identifier"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        setError("Nom de voyageur, email ou mot de passe incorrect.");
        setLoading(false);
        return;
      }

      router.push("/profil");
      router.refresh();
    } catch {
      setError("Une erreur est survenue. Réessayez.");
      setLoading(false);
    }
  }

  async function handleRegister(formData: FormData) {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          username: formData.get("username"),
          name: formData.get("name"),
          password: formData.get("password"),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Une erreur est survenue.");
        setLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        identifier: formData.get("username"),
        password: formData.get("password"),
        redirect: false,
      });

      setLoading(false);

      if (result?.error) {
        switchTab("login");
        return;
      }

      router.push("/profil");
      router.refresh();
    } catch {
      setError("Une erreur est survenue. Réessayez.");
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12"
     style={{
        backgroundImage: "url('/parchemin-bg.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="w-full max-w-md rounded-2xl border border-parchment-dark bg-parchment-light p-8">
        <div className="mb-6 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gold" />
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              Le Sceau de l&apos;Aventurier
            </span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h1 className="font-display text-2xl font-bold text-brown md:text-3xl">
            {tab === "login" ? "Bon retour, Voyageur" : "Rejoignez la Quête"}
          </h1>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-1 rounded-full bg-parchment p-1">
          <button
            type="button"
            onClick={() => switchTab("login")}
            style={{ borderRadius: tab === "login" ? "20px" : "999px" }}
            className={`font-heading rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
              tab === "login"
                ? "bg-forest text-parchment-light"
                : "text-brown-mid hover:text-brown"
            }`}
          >
            Se Connecter
          </button>
          <button
            type="button"
            onClick={() => switchTab("register")}
            style={{ borderRadius: tab === "register" ? "20px" : "999px" }}
            className={`font-heading rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
              tab === "register"
                ? "bg-forest text-parchment-light"
                : "text-brown-mid hover:text-brown"
            }`}
          >
            S&apos;inscrire
          </button>
        </div>

        {error && (
          <p className="font-heading mb-4 rounded-lg bg-red-100 px-4 py-2 text-center text-xs text-red-700">
            {error}
          </p>
        )}

        {tab === "login" ? (
          <form action={handleLogin} className="flex flex-col gap-3">
            <input
              name="identifier"
              type="text"
              placeholder="Nom de Voyageur ou Email"
              required
              className={inputClass}
            />
            <input
              name="password"
              type="password"
              placeholder="Mot de Passe"
              required
              className={inputClass}
            />
            <button type="submit" disabled={loading} className={submitClass}>
              {loading ? "Ouverture du portail..." : "Se Connecter"}
            </button>
          </form>
        ) : (
          <form action={handleRegister} className="flex flex-col gap-3">
            <input name="name" type="text" placeholder="Nom" required className={inputClass} />
            <input
              name="username"
              type="text"
              placeholder="Nom de Voyageur"
              required
              minLength={3}
              maxLength={30}
              pattern="[a-zA-Z0-9_-]+"
              title="Lettres, chiffres, tirets et underscores uniquement"
              className={inputClass}
            />
            <input name="email" type="email" placeholder="Email" required className={inputClass} />
            <input
              name="password"
              type="password"
              placeholder="Mot de Passe"
              required
              minLength={6}
              className={inputClass}
            />
            <button type="submit" disabled={loading} className={submitClass}>
              {loading ? "Forge du sceau..." : "S'inscrire"}
            </button>
          </form>
        )}

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-parchment-dark" />
        </div>
      </div>
    </section>
  );
}
