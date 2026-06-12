import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";

export default async function StandDetail({
  params,
}: {
  params: Promise<{ standId: string }>;
}) {
  const { standId } = await params;

  const stand = await prisma.pointOfInterest.findUnique({
    where: { id: parseInt(standId) },
  });

  if (!stand || !["FOOD", "DRINK", "SHOP"].includes(stand.category)) notFound();

  const categoryLabel =
    stand.category === "FOOD" ? "Nourriture" :
    stand.category === "DRINK" ? "Boissons" : "Boutique";

  return (
    <div className="detail-page">

      {/* ─── Bandeau ─── */}
      <div className="detail-hero">
        <div className="detail-hero__bg">
          {stand.imageUrl && (
            <Image
              src={stand.imageUrl}
              alt={stand.name}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
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
          <span className="preview-tag">{categoryLabel}</span>
          <h1 className="detail-hero__title">{stand.name}</h1>
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
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
