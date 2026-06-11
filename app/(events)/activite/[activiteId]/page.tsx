import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function ActiviteDetail({
  params,
}: {
  params: Promise<{ activiteId: string }>;
}) {
  const { activiteId } = await params;

  const activite = await prisma.activity.findUnique({
    where: { id: activiteId },
  });

  if (!activite) notFound();

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
          <span className="preview-tag">{activite.category}</span>
          <h1 className="detail-hero__title">{activite.name}</h1>
          {activite.startTime && activite.endTime && (
            <div className="detail-hero__meta">
              <div className="detail-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {activite.startTime} – {activite.endTime}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Contenu ─── */}
      <div className="detail-body">
        <div className="detail-body__inner">

          {activite.description && (
            <div className="detail-section">
              <div className="section-label">
                <div className="section-label__line" />
                <span className="section-label__text">À propos</span>
              </div>
              <p className="detail-description">{activite.description}</p>
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
                <p className="detail-info-card__value">{activite.category}</p>
              </div>
              {activite.startTime && activite.endTime && (
                <div className="detail-info-card">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <p className="detail-info-card__label">Horaire</p>
                  <p className="detail-info-card__value">{activite.startTime} – {activite.endTime}</p>
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
              S&apos;inscrire à cette activité
            </button>
            <p className="detail-cta__note">Les inscriptions ouvriront bientôt</p>
          </div>

        </div>
      </div>
    </div>
  );
}
