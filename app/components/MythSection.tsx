export default function MythSection() {
  return (
    <section style={{ background: "var(--color-parchment-light)", padding: "5rem 0 6rem" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="row align-items-center g-5">

          {/* ─── Colonne gauche ─── */}
          <div className="col-12 col-lg-6">

            {/* Label section */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ width: "2rem", height: "2px", background: "var(--color-gold)", flexShrink: 0 }} />
              <span style={{
                color: "var(--color-gold)",
                fontFamily: "var(--font-cinzel, Georgia, serif)",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}>
                Le Mythe
              </span>
            </div>

            {/* Titre */}
            <h2 style={{
              fontFamily: "var(--font-cinzel-decorative, Georgia, serif)",
              color: "var(--color-brown)",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: "1.25rem",
            }}>
              Une Fusion Épique de Folk et de Fantasy
            </h2>

            {/* Corps de texte */}
            <p style={{
              fontFamily: "var(--font-cinzel, Georgia, serif)",
              color: "var(--color-brown-mid)",
              fontSize: "0.875rem",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}>
              Au cœur de la cité de Carcassonne, là où les pierres murmurent encore des récits de
              croisades et de troubadours, naît une expérience hors du temps.{" "}
              <strong style={{ color: "var(--color-brown)" }}>Hydromel et Décibels</strong>{" "}
              n&apos;est pas qu&apos;un festival&nbsp;; c&apos;est un portail vers un royaume où les
              mélodies ancestrales du folk s&apos;enflamment au contact de l&apos;énergie brute du
              métal moderne.
            </p>

            {/* Cartes fonctionnalités */}
            <div className="row g-3">

              <div className="col-12 col-sm-6">
                <div style={{ background: "var(--color-parchment)", borderRadius: "0.75rem", padding: "1.25rem" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="var(--color-brown)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ marginBottom: "0.75rem", display: "block" }}>
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1="6" y1="1" x2="6" y2="4" />
                    <line x1="10" y1="1" x2="10" y2="4" />
                    <line x1="14" y1="1" x2="14" y2="4" />
                  </svg>
                  <p style={{ fontFamily: "var(--font-cinzel, Georgia, serif)", color: "var(--color-brown)", fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                    Banquets Royaux
                  </p>
                  <p style={{ fontFamily: "var(--font-cinzel, Georgia, serif)", color: "var(--color-brown-mid)", fontSize: "0.75rem", lineHeight: 1.6, margin: 0 }}>
                    Hydromel artisanal et mets d&apos;époque cuisinés au feu de bois.
                  </p>
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <div style={{ background: "var(--color-parchment)", borderRadius: "0.75rem", padding: "1.25rem" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="var(--color-brown)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ marginBottom: "0.75rem", display: "block" }}>
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  <p style={{ fontFamily: "var(--font-cinzel, Georgia, serif)", color: "var(--color-brown)", fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                    Quêtes Narratives
                  </p>
                  <p style={{ fontFamily: "var(--font-cinzel, Georgia, serif)", color: "var(--color-brown-mid)", fontSize: "0.75rem", lineHeight: 1.6, margin: 0 }}>
                    Vivez votre propre saga à travers des jeux de rôle grandeur nature.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ─── Colonne droite — emplacement image ─── */}
          <div className="col-12 col-lg-6">
            <div style={{ position: "relative", paddingBottom: "1.75rem" }}>

              {/* Zone image — remplacer par <Image> next/image */}
              <div style={{
                borderRadius: "1.25rem",
                overflow: "hidden",
                aspectRatio: "4 / 5",
                background: "var(--color-parchment-dark)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{
                  fontFamily: "var(--font-cinzel, Georgia, serif)",
                  color: "var(--color-brown-mid)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}>
                  Image ici
                </span>
              </div>

              {/* Badge étoile */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "3.25rem",
                height: "3.25rem",
                borderRadius: "50%",
                background: "var(--color-brown)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "3px solid var(--color-parchment-light)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-gold)">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.3L12 17l-6.2 4.2 2.4-7.3L2 9.4h7.6z" />
                </svg>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
