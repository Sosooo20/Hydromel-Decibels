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
  { label: "Contact", href: "#" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-forest)", color: "var(--color-parchment-light)" }}>

      {/* Ligne or de séparation */}
      <div style={{ height: "2px", background: "var(--color-gold)", opacity: 0.4 }} />

      {/* Corps du footer */}
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "3.5rem 1.5rem 2rem" }}>
        <div className="row g-5">

          {/* ─── Branding ─── */}
          <div className="col-12 col-md-5">
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

            {/* Réseaux sociaux */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" style={socialStyle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" style={socialStyle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube" style={socialStyle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--color-forest)" />
                </svg>
              </a>
            </div>
          </div>

          {/* ─── Navigation ─── */}
          <div className="col-6 col-md-3">
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
          <div className="col-6 col-md-4">
            <p style={footerHeadingStyle}>Infos pratiques</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} style={footerLinkStyle}>
                    {link.label}
                  </Link>
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

const socialStyle: React.CSSProperties = {
  width: "2.25rem",
  height: "2.25rem",
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--color-parchment-light)",
  textDecoration: "none",
  transition: "border-color 0.2s, color 0.2s",
};

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
