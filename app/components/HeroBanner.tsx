import Link from "next/link";
import CountdownTimer from "./CountdownTimer";

const FESTIVAL_START = "2026-10-16T14:00:00+02:00";

export default function HeroBanner() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[75vh] text-center overflow-hidden">

      {/* Fond — remplacer par une image via next/image */}
      <div className="absolute inset-0 bg-gradient-to-b from-brown to-forest" />
      <div className="absolute inset-0 bg-forest/30" />

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-20 max-w-4xl mx-auto w-full">

        {/* Étiquette logo */}
        <div
          style={{ background: "var(--color-forest)", borderColor: "var(--color-gold)" }}
          className="border px-8 py-2"
        >
          <span className="font-heading text-[11px] tracking-[0.35em] uppercase text-parchment-light font-semibold">
            Hydromel et Décibels
          </span>
        </div>

        {/* Titre principal */}
        <h1
          className="font-decorative text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
          style={{ color: "var(--color-parchment-light)", fontFamily: "var(--font-cinzel-decorative, Georgia, serif)" }}
        >
          L&apos;Automne des Légendes
        </h1>

        {/* Citation */}
        <p
          className="font-heading text-sm md:text-base italic max-w-xl leading-relaxed"
          style={{ color: "var(--color-parchment)" }}
        >
          &ldquo;Quand le brouillard de l&apos;Aude rencontre l&apos;acier des guitares et la douceur de l&apos;hydromel.&rdquo;
        </p>

        {/* Compte à rebours */}
        <div className="mt-2 flex flex-col items-center gap-2">
          <span
            className="font-heading text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "var(--color-gold)" }}
          >
            Le Royaume s&apos;éveille dans
          </span>
          <CountdownTimer targetDate={FESTIVAL_START} />
        </div>

        {/* Boutons CTA */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/evenement"
            className="font-heading text-[11px] tracking-[0.25em] uppercase px-10 py-4 rounded-full transition-opacity hover:opacity-80 no-underline"
            style={{ background: "var(--color-brown)", color: "var(--color-parchment-light)" }}
          >
            Rejoindre l&apos;Aventure &raquo;
          </Link>
          <a
            href="#"
            className="font-heading text-[11px] tracking-[0.25em] uppercase px-10 py-4 rounded-full transition-opacity hover:opacity-80"
            style={{ border: "1px solid var(--color-parchment)", color: "var(--color-parchment-light)" }}
          >
            Télécharger l&apos;Application
          </a>
        </div>

      </div>
    </section>
  );
}
