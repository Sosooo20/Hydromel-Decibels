import Link from "next/link";

const events = [
  {
    id: 1,
    genre: "Nordic Folk Metal",
    name: "Echoes of Valhalla",
    description: "A storm of strings and thunder from the frozen peaks of the north.",
    time: "14:00 – 15:30",
  },
  {
    id: 2,
    genre: "Celtic Tavern Punk",
    name: "The Barley Bards",
    description: "Rhythmic ballads that turn every stranger into a leather-clad brother.",
    time: "16:30 – 18:00",
  },
  {
    id: 3,
    genre: "Epic Power Metal",
    name: "Iron Citadel",
    description: "The walls shall tremble and the hallowed shall bow before this citadel.",
    time: "20:00 – 22:00",
  },
];

export default function EventsPreview() {
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

        {/* Grille de 3 cartes */}
        <div className="row g-4">
          {events.map((event) => (
            <div key={event.id} className="col-12 col-md-4">
              <div style={{
                borderRadius: "1rem",
                overflow: "hidden",
                background: "var(--color-parchment-light)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}>

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

                  {/* Tag genre */}
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
                    {event.genre}
                  </span>

                  {/* Nom de l'événement */}
                  <h3 style={{
                    fontFamily: "var(--font-cinzel, Georgia, serif)",
                    color: "var(--color-brown)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    margin: 0,
                  }}>
                    {event.name}
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
                    {event.time}
                  </div>

                </div>
              </div>
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
