import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Événements", href: "/evenement" },
  { label: "Carte", href: "/carte" },
];

const legalLinks = [
  { label: "Mentions légales", href: "#" },
  { label: "Confidentialité", href: "#" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-forest)", color: "var(--color-parchment-light)" }}>

      {/* Ligne or de séparation */}
      <div style={{ height: "2px", background: "var(--color-gold)", opacity: 0.4 }} />

      {/* Corps du footer */}
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "3.5rem 1.5rem 2rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem" }}>

          {/* ─── Branding ─── */}
          <div style={{ flex: "2 1 260px" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{
                width: "2.5rem", height: "2.5rem",
                background: "var(--color-brown)",
                border: "1px solid var(--color-gold)",
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: "4px",
                flexShrink: 0,
              }}>
                  <div className="w-8 h-8 rounded-sm bg-forest flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <Image src="/Logo.png" alt="Logo" width={32} height={32} className="object-cover" />
                  </div>
              </div>
              <span style={{
                fontFamily: "var(--font-cinzel, Georgia, serif)",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "var(--color-parchment-light)",
              }}>
                Hydromel et Décibels
              </span>
            </div>

            {/* Tagline */}
            <p style={{
              fontFamily: "var(--font-cinzel, Georgia, serif)",
              fontSize: "0.8rem",
              lineHeight: 1.7,
              color: "var(--color-parchment-dark)",
              maxWidth: "28ch",
              marginBottom: "1.75rem",
            }}>
              Le festival où les mélodies ancestrales rencontrent l&apos;énergie du métal moderne.
              Carcassonne, chaque automne.
            </p>

          </div>

          {/* ─── Navigation ─── */}
          <div style={{ flex: "1 1 140px" }}>
            <p style={footerHeadingStyle}>Navigation</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={footerLinkStyle}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Infos pratiques ─── */}
          <div style={{ flex: "1 1 180px" }}>
            <p style={footerHeadingStyle}>Infos pratiques</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <span style={footerLinkStyle}>{link.label}</span>
                </li>
              ))}
            </ul>
            {/* Adresse */}
            <p style={{ ...footerLinkStyle, marginTop: "1.25rem", fontStyle: "italic", cursor: "default" }}>
              Cité de Carcassonne<br />11000 Carcassonne, France
            </p>
          </div>

        </div>
      </div>

      {/* ─── Bas de page ─── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "1.25rem 1.5rem" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
          <span style={{
            fontFamily: "var(--font-cinzel, Georgia, serif)",
            fontSize: "0.65rem",
            color: "var(--color-parchment-dark)",
            letterSpacing: "0.08em",
          }}>
            © {new Date().getFullYear()} Hydromel et Décibels — Tous droits réservés
          </span>
          <span style={{
            fontFamily: "var(--font-cinzel, Georgia, serif)",
            fontSize: "0.65rem",
            color: "var(--color-gold)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>
            Que la Saga commence
          </span>
        </div>
      </div>

    </footer>
  );
}

// ─── Styles partagés ──────────────────────────────────────────────────────────


const footerHeadingStyle: React.CSSProperties = {
  fontFamily: "var(--font-cinzel, Georgia, serif)",
  fontSize: "0.65rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  fontWeight: 700,
  color: "var(--color-gold)",
  marginBottom: "1rem",
};

const footerLinkStyle: React.CSSProperties = {
  fontFamily: "var(--font-cinzel, Georgia, serif)",
  fontSize: "0.8rem",
  color: "var(--color-parchment-dark)",
  textDecoration: "none",
  lineHeight: 1.5,
};
