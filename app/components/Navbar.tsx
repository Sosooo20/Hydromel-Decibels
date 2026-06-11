import Link from "next/link";
import { auth } from "@/lib/auth";

function LogoEmblem() {
  return (
    <div className="w-8 h-8 rounded-sm bg-forest flex items-center justify-center flex-shrink-0">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L14.5 9H22L16 13.5L18.5 21L12 17L5.5 21L8 13.5L2 9H9.5Z"
          fill="var(--color-gold)"
          stroke="var(--color-gold-light)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}

const navLinks = [
  { label: "Légende", href: "/" },
  { label: "Artistes", href: "/evenement" },
  { label: "Festin", href: "/festin" },
  { label: "Carte", href: "/carte" },
];

export default async function Navbar() {
  const session = await auth();
  const profileHref = session?.user ? "/profil" : "/login";
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-40 bg-parchment-light border-b border-parchment-dark">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Mobile only — hamburger */}
        <button className="md:hidden text-brown flex-shrink-0" aria-label="Menu">
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
            <path
              d="M1 1h20M1 9h20M1 17h20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          {/* Emblem visible on desktop only */}
          <span className="hidden md:flex">
            <LogoEmblem />
          </span>
          <span className="font-heading text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase text-brown">
            Hydromel et Décibels
          </span>
        </Link>

        {/* Desktop only — nav links */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading text-[11px] tracking-[0.15em] uppercase text-brown hover:text-gold transition-colors no-underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Accès admin — visible uniquement pour le rôle ADMIN */}
          {isAdmin && (
            <Link
              href="/admin"
              aria-label="Salle du Conseil (admin)"
              className="w-8 h-8 rounded-full bg-forest flex items-center justify-center flex-shrink-0"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </Link>
          )}

          {/* Profile avatar — always visible */}
          <Link
            href={profileHref}
            aria-label="Mon profil"
            className="w-8 h-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-forest)">
              <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9a7 7 0 0 1 14 0H5z" />
            </svg>
          </Link>
        </div>

      </div>
    </header>
  );
}
