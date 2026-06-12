import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";

export default async function EvenementsPage() {
  const [artistes, stands, activities] = await Promise.all([
    prisma.artist.findMany({ orderBy: { name: "asc" }, include: { events: { take: 1 } } }),
    prisma.pointOfInterest.findMany({
      where: { category: { in: ["FOOD", "DRINK", "SHOP"] } },
      orderBy: { name: "asc" },
    }),
    prisma.activity.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="events-page"
     style={{
        backgroundImage: "url('/parchemin-bg.avif')",
        backgroundSize: "contain",
        backgroundPosition: "center",
    
      }}>
      <div className="container-page"
      >

        {/* En-tête */}
        <div className="events-page__header">
          <div className="section-label">
            <div className="section-label__line bg-black" />
            <span className="section-label__text text-black">La Programmation</span>
          </div>
          <h1 className="events-page__title">Les Ménestrels du Royaume</h1>
          <p className="events-page__count">
            {artistes.length} artiste{artistes.length > 1 ? "s" : ""} au programme
          </p>
        </div>

        {/* Grille d'artistes */}
        {artistes.length === 0 ? (
          <p className="events-page__empty">
            Aucun artiste pour le moment. Revenez bientôt…
          </p>
        ) : (
          <div className="row g-4">
            {artistes.map((artiste) => {
              const eventId = artiste.events[0]?.id;
              const card = (
                <div className="event-card">
                  <div className="event-card__image" style={{ position: "relative", overflow: "hidden" }}>
                    {artiste.imageUrl ? (
                      <Image src={artiste.imageUrl} alt={artiste.name} fill style={{ objectFit: "cover" }} />
                    ) : (
                      <span className="event-card__image-placeholder">Image ici</span>
                    )}
                  </div>
                  <div className="event-card__body">
                    <span className="preview-tag">{artiste.genre}</span>
                    <h2 className="event-card__title">{artiste.name}</h2>
                    <p className="event-card__description">{artiste.description}</p>
                  </div>
                </div>
              );
              return (
                <div key={artiste.id} className="col-12 col-md-6 col-lg-4">
                  {eventId ? (
                    <Link href={`/evenement/${eventId}`} className="event-card__link">{card}</Link>
                  ) : card}
                </div>
              );
            })}
          </div>
        )}

        <div className="events-page__header pt-4">
          <p className="events-page__count">
            {stands.length} stand{stands.length > 1 ? "s" : ""} au programme
          </p>
        </div>

        {/* Grille de stands */}
        {stands.length === 0 ? (
          <p className="events-page__empty">
            Aucun stand pour le moment. Revenez bientôt…
          </p>
        ) : (
          <div className="row g-4">
            {stands.map((stand) => {
              const categoryLabel =
                stand.category === "FOOD" ? "Nourriture" :
                stand.category === "DRINK" ? "Boissons" : "Boutique";
              return (
                <div key={stand.id} className="col-12 col-md-6 col-lg-4">
                  <Link href={`/stand/${stand.id}`} className="event-card__link">
                  <div className="event-card">

                    <div className="event-card__image" style={{ position: "relative", overflow: "hidden" }}>
                      {stand.imageUrl ? (
                        <Image src={stand.imageUrl} alt={stand.name} fill style={{ objectFit: "cover" }} />
                      ) : (
                        <span className="event-card__image-placeholder">Image ici</span>
                      )}
                    </div>

                    <div className="event-card__body">
                      <span className="preview-tag">{categoryLabel}</span>
                      <h2 className="event-card__title">{stand.name}</h2>
                      <p className="event-card__description">{stand.description}</p>
                    </div>

                  </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        <div className="events-page__header pt-4">
          <p className="events-page__count">
            {activities.length} activité{activities.length > 1 ? "s" : ""} au programme
          </p>
        </div>

        {/* Grille d'activités */}
        {activities.length === 0 ? (
          <p className="events-page__empty">
            Aucune activité pour le moment. Revenez bientôt…
          </p>
        ) : (
          <div className="row g-4">
            {activities.map((activity) => (
              <div key={activity.id} className="col-12 col-md-6 col-lg-4">
                <Link href={`/activite/${activity.id}`} className="event-card__link">
                  <div className="event-card">

                    <div className="event-card__image" style={{ position: "relative", overflow: "hidden" }}>
                      {activity.imageUrl ? (
                        <Image src={activity.imageUrl} alt={activity.name} fill style={{ objectFit: "cover" }} />
                      ) : (
                        <span className="event-card__image-placeholder">Image ici</span>
                      )}
                      {activity.startTime && activity.endTime && (
                        <div className="event-card__time-badge">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {activity.startTime} – {activity.endTime}
                        </div>
                      )}
                    </div>

                    <div className="event-card__body">
                      <span className="preview-tag">{activity.category}</span>
                      <h2 className="event-card__title">{activity.name}</h2>
                      <p className="event-card__description">{activity.description}</p>
                    </div>

                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
