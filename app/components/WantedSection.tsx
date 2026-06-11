import Link from "next/link";
import type { Artist, Event } from "@/app/generated/prisma/client";

type FeaturedArtist = Artist & { events: Event[] };

export default function WantedSection({ artists }: { artists: FeaturedArtist[] }) {
  if (artists.length === 0) return null;

  return (
    <section className="bg-parchment py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-gold" />
          <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Avis de Recherche
          </span>
          <div className="h-px w-8 bg-gold" />
        </div>
        <h2 className="font-display mb-10 text-center text-2xl font-bold text-brown md:text-3xl">
          Les Légendes les Plus Recherchées
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {artists.map((artist) => {
            const event = artist.events[0];
            return (
              <div
                key={artist.id}
                className="w-full max-w-xs rounded-sm border-2 border-dashed border-brown-mid bg-parchment-light p-5 text-center shadow-md"
              >
                <p className="font-display mb-2 text-xs uppercase tracking-[0.3em] text-brown-mid">
                  Avis de Recherche
                </p>

                <div className="mb-4 flex aspect-square items-center justify-center rounded-sm bg-forest">
                  <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-parchment-dark">
                    Portrait
                  </span>
                </div>

                <h3 className="font-display mb-1 text-lg font-bold text-brown">{artist.name}</h3>
                <p className="font-heading mb-3 text-[10px] uppercase tracking-[0.15em] text-brown-mid">
                  {artist.genre}
                </p>
                <p className="font-heading mb-4 text-xs italic leading-relaxed text-brown-mid">
                  {artist.description}
                </p>

                {artist.bounty != null && (
                  <div className="mb-3 inline-block rounded-full bg-brown px-4 py-2 font-heading text-xs uppercase tracking-[0.2em] text-parchment-light">
                    Prime&nbsp;: {artist.bounty} Lutins d&apos;Or
                  </div>
                )}

                {event && (
                  <Link
                    href={`/evenement/${event.slug}`}
                    className="block font-heading text-[11px] uppercase tracking-[0.2em] text-gold hover:text-gold-light"
                  >
                    Voir la quête &raquo;
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
