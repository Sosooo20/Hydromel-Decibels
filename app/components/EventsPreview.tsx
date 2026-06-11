import Link from "next/link";
import type { Artist, Event, Stage } from "@/app/generated/prisma/client";
import { formatTimeRange } from "@/lib/format";

type EventWithRelations = Event & { artist: Artist | null; stage: Stage };

export default function EventsPreview({ events }: { events: EventWithRelations[] }) {
  return (
    <section style={{ background: "var(--color-parchment)", padding: "5rem 0" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* En-tête centré */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div style={{ width: "2rem", height: "2px", background: "var(--color-gold)", flexShrink: 0 }} />
            <span style={{
              color: "var(--color-gold)",
              fontFamily: "var(--font-cinzel, Georgia, serif)",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}>
              La Programmation
            </span>
            <div style={{ width: "2rem", height: "2px", background: "var(--color-gold)", flexShrink: 0 }} />
          </div>
          <h2 style={{
            fontFamily: "var(--font-cinzel-decorative, Georgia, serif)",
            color: "var(--color-brown)",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 700,
            margin: 0,
          }}>
            Les Ménestrels du Royaume
          </h2>
        </div>

        {/* Grille de cartes */}
        <div className="row g-4">
          {events.map((event) => (
            <div key={event.id} className="col-12 col-md-4">
              <Link
                href={`/evenement/${event.slug}`}
                style={{
                  borderRadius: "1rem",
                  overflow: "hidden",
                  background: "var(--color-parchment-light)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >

                {/* Emplacement image — remplacer par <Image fill> next/image */}
                <div style={{
                  height: "200px",
                  background: "var(--color-forest)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{
                    color: "var(--color-parchment-dark)",
                    fontFamily: "var(--font-cinzel, Georgia, serif)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}>
                    Image ici
                  </span>
                </div>

                {/* Contenu */}
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>

                  {/* Tag genre / scène */}
                  <span style={{
                    alignSelf: "flex-start",
                    background: "var(--color-parchment-dark)",
                    color: "var(--color-brown)",
                    fontFamily: "var(--font-cinzel, Georgia, serif)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    padding: "0.25rem 0.75rem",
                    borderRadius: "999px",
                  }}>
                    {event.artist?.genre ?? event.stage.name}
                  </span>

                  {/* Nom de l'événement */}
                  <h3 style={{
                    fontFamily: "var(--font-cinzel, Georgia, serif)",
                    color: "var(--color-brown)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    margin: 0,
                  }}>
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontFamily: "var(--font-cinzel, Georgia, serif)",
                    color: "var(--color-brown-mid)",
                    fontSize: "0.8rem",
                    lineHeight: 1.65,
                    fontStyle: "italic",
                    flex: 1,
                    margin: 0,
                  }}>
                    {event.description}
                  </p>

                  {/* Horaire */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--color-gold)",
                    fontFamily: "var(--font-cinzel, Georgia, serif)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {event.day} · {formatTimeRange(event.startTime, event.endTime)}
                  </div>

                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Bouton Voir plus */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            href="/evenement"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-cinzel, Georgia, serif)",
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 600,
              padding: "1rem 3.5rem",
              borderRadius: "999px",
              background: "var(--color-brown)",
              color: "var(--color-parchment-light)",
              textDecoration: "none",
              border: "2px solid transparent",
              transition: "opacity 0.2s ease",
            }}
          >
            Voir plus &raquo;
          </Link>
        </div>

      </div>
    </section>
  );
}
