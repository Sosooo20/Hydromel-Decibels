import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function StandDetail({
  params,
}: {
  params: Promise<{ standId: string }>;
}) {
  const { standId } = await params;

  const stand = await prisma.stand.findUnique({
    where: { id: standId },
  });

  if (!stand) notFound();

  const categoryLabel = stand.category === "VENTES" ? "Ventes" : "Repas";

  return (
    <div className="detail-page">

      {/* ─── Bandeau ─── */}
      <div className="detail-hero">
        <div className="detail-hero__bg" />
        <div className="detail-hero__overlay" />
        <div className="detail-hero__content">
          <Link href="/evenement" className="detail-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Retour aux événements
          </Link>
          <span className="preview-tag">{categoryLabel}</span>
          <h1 className="detail-hero__title">{stand.name}</h1>
          {stand.openTime && stand.closeTime && (
            <div className="detail-hero__meta">
              <div className="detail-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Ouvert de {stand.openTime} à {stand.closeTime}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Contenu ─── */}
      <div className="detail-body">
        <div className="detail-body__inner">

          {stand.description && (
            <div className="detail-section">
              <div className="section-label">
                <div className="section-label__line" />
                <span className="section-label__text">À propos</span>
              </div>
              <p className="detail-description">{stand.description}</p>
            </div>
          )}

          <div className="detail-section">
            <div className="section-label">
              <div className="section-label__line" />
              <span className="section-label__text">Informations</span>
            </div>
            <div className="detail-info-grid">
              <div className="detail-info-card">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                <p className="detail-info-card__label">Catégorie</p>
                <p className="detail-info-card__value">{categoryLabel}</p>
              </div>
              {stand.openTime && stand.closeTime && (
                <div className="detail-info-card">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <p className="detail-info-card__label">Horaires d&apos;ouverture</p>
                  <p className="detail-info-card__value">{stand.openTime} – {stand.closeTime}</p>
                </div>
              )}
            </div>
          </div>

          <div className="detail-cta">
            <button className="detail-cta__btn" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
              S&apos;inscrire à ce stand
            </button>
            <p className="detail-cta__note">Les inscriptions ouvriront bientôt</p>
          </div>

        </div>
      </div>
    </div>
  );
}
