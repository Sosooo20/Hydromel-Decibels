import Link from "next/link";
import prisma from "@/lib/prisma";
import { IconArtist, IconEvent, IconPoi, IconStage, IconUsers } from "./icons";

export default async function AdminDashboard() {
  const [stages, artists, events, pois, users] = await Promise.all([
    prisma.stage.count(),
    prisma.artist.count(),
    prisma.event.count(),
    prisma.pointOfInterest.count(),
    prisma.user.count(),
  ]);

  const cards = [
    { label: "Scènes", value: stages, href: "/admin/scenes", icon: IconStage },
    { label: "Artistes", value: artists, href: "/admin/artistes", icon: IconArtist },
    { label: "Événements", value: events, href: "/admin/evenements", icon: IconEvent },
    { label: "Points d'intérêt", value: pois, href: "/admin/points-interet", icon: IconPoi },
    { label: "Aventuriers inscrits", value: users, href: null, icon: IconUsers },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        const content = (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-parchment-dark bg-parchment-light p-6 text-center transition-colors hover:border-gold hover:shadow-sm">
            <Icon className="text-gold" />
            <span className="font-display text-3xl font-bold text-brown">{card.value}</span>
            <span className="font-heading text-[10px] uppercase tracking-[0.15em] text-brown-mid">
              {card.label}
            </span>
          </div>
        );

        return card.href ? (
          <Link key={card.label} href={card.href} className="no-underline">
            {content}
          </Link>
        ) : (
          <div key={card.label}>{content}</div>
        );
      })}
    </div>
  );
}
