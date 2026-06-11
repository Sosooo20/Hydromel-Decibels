import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";
import CountdownTimer from "./components/CountdownTimer";
const FESTIVAL_START = "2026-10-16T14:00:00+02:00";

export default async function Home() {
  const [evenements, stands, activities] = await Promise.all([
    prisma.event.findMany({ orderBy: { startTime: "asc" }, include: { artist: true } }),
    prisma.stand.findMany({ orderBy: { name: "asc" } }),
    prisma.activity.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO BANNER
      ═══════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero__bg-gradient" />
        <div className="hero__bg-overlay" />

        <div className="hero__content">
          <div className="">
            <Image src="/logo.png" width={250} height={250} alt="logo hydromel et decibel"/>
          </div>
          
          <h1
            className="font-decorative text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            style={{ color: "var(--color-parchment-light)", fontFamily: "var(--font-cinzel-decorative, Georgia, serif)" }}
          >
            L&apos;Automne des Légendes
          </h1>

          <p className="hero__quote">
            &ldquo;Quand le brouillard de l&apos;Aude rencontre l&apos;acier des guitares
            et la douceur de l&apos;hydromel.&rdquo;
          </p>
          {/* Compte à rebours */}
                  <div className="mt-2 flex flex-col items-center gap-2">
                    <span
                      className="font-heading text-[10px] tracking-[0.3em] uppercase"
                      style={{ color: "white" }}
                    >
                      Le Royaume s&apos;éveille dans
                    </span>
                    <CountdownTimer targetDate={FESTIVAL_START} />
                  </div>
         
          <div className="hero__cta">
            <Link href="/evenement" className="btn-hero-primary">
              Rejoindre l&apos;Aventure &raquo;
            </Link>
            <Link href="#" className="btn-hero-outline">
              Télécharger l&apos;Application
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MYTH SECTION
      ═══════════════════════════════════════════ */}
      <section className="myth-section">
        <div className="container-page">
          <div className="row align-items-center g-5">

            {/* Colonne gauche */}
            <div className="col-12 col-lg-6">
              <div className="section-label">
                <div className="section-label__line" />
                <span className="section-label__text">Le Mythe</span>
              </div>

              <h2 className="myth-section__title">
                Une Fusion Épique de Folk et de Fantasy
              </h2>

              <p className="myth-section__body">
                Au cœur de la cité de Carcassonne, là où les pierres murmurent encore
                des récits de croisades et de troubadours, naît une expérience hors du
                temps.{" "}
                <strong>Hydromel et Décibels</strong>{" "}
                n&apos;est pas qu&apos;un festival&nbsp;; c&apos;est un portail vers un
                royaume où les mélodies ancestrales du folk s&apos;enflamment au contact
                de l&apos;énergie brute du métal moderne.
              </p>

              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <div className="feature-card">
                    <svg className="feature-card__icon" width="28" height="28" viewBox="0 0 24 24"
                      fill="none" stroke="var(--color-brown)" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                      <line x1="6" y1="1" x2="6" y2="4" />
                      <line x1="10" y1="1" x2="10" y2="4" />
                      <line x1="14" y1="1" x2="14" y2="4" />
                    </svg>
                    <p className="feature-card__title">Banquets Royaux</p>
                    <p className="feature-card__text">
                      Hydromel artisanal et mets d&apos;époque cuisinés au feu de bois.
                    </p>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="feature-card">
                    <svg className="feature-card__icon" width="28" height="28" viewBox="0 0 24 24"
                      fill="none" stroke="var(--color-brown)" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    <p className="feature-card__title">Quêtes Narratives</p>
                    <p className="feature-card__text">
                      Vivez votre propre saga à travers des jeux de rôle grandeur nature.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite — emplacement image */}
            <div className="col-12 col-lg-6">
              <div className="myth-section__image-wrap">
                <div className="myth-section__placeholder">
                    <Image src="/festival.webp" width={530} height={300} alt="festival"/>
                </div>
                <div className="myth-section__badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-gold)">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.3L12 17l-6.2 4.2 2.4-7.3L2 9.4h7.6z" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EVENTS PREVIEW
      ═══════════════════════════════════════════ */}
      <section className="events-section">
        <div className="container-page">

          <div className="section-header">
            <div className="section-label">
              <div className="section-label__line" />
              <span className="section-label__text">La Programmation</span>
              <div className="section-label__line" />
            </div>
            <h2 className="section-header__title">Les Ménestrels du Royaume</h2>
          </div>

          <div className="row g-4">

            {/* Événements */}
            {evenements.slice(0, 1).map((event) => (
              <div key={event.id} className="col-12 col-md-4">
                <Link href={`/evenement/${event.id}`} className="event-card__link">
                <div className="preview-card">
                  <div className="preview-card__image" style={{ position: "relative", overflow: "hidden" }}>
                    {event.artist?.imageUrl ? (
                      <Image src={event.artist.imageUrl} alt={event.title} fill style={{ objectFit: "cover" }} />
                    ) : (
                      <span>Image ici</span>
                    )}
                  </div>
                  <div className="preview-card__body">
                    <span className="preview-tag">
                      {event.type === "CONCERT" ? "Concert" : "Activité"}
                    </span>
                    <h3 className="preview-card__title">{event.title}</h3>
                    <p className="preview-card__description">{event.description}</p>
                    <div className="preview-card__date">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {event.day}
                    </div>
                    <div className="preview-card__time">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {new Date(event.startTime).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      {" – "}
                      {new Date(event.endTime).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
                </Link>
              </div>
            ))}

            {/* Stands */}
            {stands.slice(0, 1).map((stand) => (
              <div key={stand.id} className="col-12 col-md-4">
                <div className="preview-card">
                  <div className="preview-card__image" style={{ position: "relative", overflow: "hidden" }}>
                    {stand.imageUrl ? (
                      <Image src={stand.imageUrl} alt={stand.name} fill style={{ objectFit: "cover" }} />
                    ) : (
                      <span>Image ici</span>
                    )}
                  </div>
                  <div className="preview-card__body">
                    <span className="preview-tag">
                      {stand.category === "VENTES" ? "Ventes" : "Repas"}
                    </span>
                    <h3 className="preview-card__title">{stand.name}</h3>
                    <p className="preview-card__description">{stand.description}</p>
                    {stand.openTime && stand.closeTime && (
                      <div className="preview-card__time">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        Ouvert {stand.openTime} – {stand.closeTime}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

              {/* Activités */}
              {activities.slice(0, 1).map((activite) => (
                  <div key={activite.id} className="col-12 col-md-4">
                      <Link href={`/activite/${activite.id}`} className="event-card__link">
                      <div className="preview-card">
                          <div className="preview-card__image" style={{ position: "relative", overflow: "hidden" }}>
                            {activite.imageUrl ? (
                              <Image src={activite.imageUrl} alt={activite.name} fill style={{ objectFit: "cover" }} />
                            ) : (
                              <span>Image ici</span>
                            )}
                          </div>
                          <div className="preview-card__body">
                            <span className="preview-tag">{activite.category}</span>
                            <h3 className="preview-card__title">{activite.name}</h3>
                            <p className="preview-card__description">{activite.description}</p>
                            {activite.startTime && activite.endTime && (
                              <div className="preview-card__time">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                                {activite.startTime} – {activite.endTime}
                              </div>
                            )}
                          </div>
                      </div>
                      </Link>
                  </div>
              ))}

          </div>

          <div className="section-footer">
            <Link href="/evenement" className="btn-voir-plus">
              Voir plus &raquo;
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
