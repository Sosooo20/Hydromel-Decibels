import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";

export default async function EvenementDetail({
  params,
}: {
  params: Promise<{ evenementId: string }>;
}) {
  const { evenementId } = await params;

  const evenement = await prisma.event.findUnique({
    where: { id: Number(evenementId) },
    include: { stage: true, artist: true },
  });

  if (!evenement) notFound();

  const typeLabel = evenement.type === "CONCERT" ? "Concert" : "Activité";

  const heureDebut = new Date(evenement.startTime).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const heureFin = new Date(evenement.endTime).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="detail-page">

      {/* ─── Bandeau ─── */}
      <div className="detail-hero">
        <div className="detail-hero__bg">
          {evenement.artist?.imageUrl && (
            <Image
              src={evenement.artist.imageUrl}
              alt={evenement.title}
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
          )}
        </div>
        <div className="detail-hero__overlay" />
        <div className="detail-hero__content">
          <Link href="/evenement" className="detail-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Retour aux événements
          </Link>
          <span className="preview-tag">{typeLabel}</span>
          <h1 className="detail-hero__title">{evenement.title}</h1>
        </div>
      </div>

      {/* ─── Contenu ─── */}
      <div className="detail-body">
        <div className="detail-body__inner">

          {/* Description */}
          <div className="detail-section">
            <div className="section-label">
              <div className="section-label__line" />
              <span className="section-label__text">À propos</span>
            </div>
            <p className="detail-description">{evenement.description}</p>
          </div>

          {/* Infos pratiques */}
          <div className="detail-section">
            <div className="section-label">
              <div className="section-label__line" />
              <span className="section-label__text">Informations</span>
            </div>
            <div className="detail-info-grid">
              <div className="detail-info-card">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <p className="detail-info-card__label">Date</p>
                <p className="detail-info-card__value">{evenement.day}</p>
              </div>
              <div className="detail-info-card">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <p className="detail-info-card__label">Horaire</p>
                <p className="detail-info-card__value">{heureDebut} – {heureFin}</p>
              </div>
              <div className="detail-info-card">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="detail-info-card__label">Scène</p>
                <p className="detail-info-card__value">{evenement.stage.name}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="detail-cta">
            <button className="detail-cta__btn" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
              S&apos;inscrire à cet événement
            </button>
            <p className="detail-cta__note">Les inscriptions ouvriront bientôt</p>
          </div>

        </div>
      </div>
    </div>
  );
}
