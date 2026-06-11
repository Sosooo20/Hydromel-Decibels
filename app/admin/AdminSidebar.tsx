"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconArtist, IconDashboard, IconEvent, IconPoi, IconStage } from "./icons";

const navItems = [
  { label: "Tableau de bord", href: "/admin", icon: IconDashboard, exact: true },
  { label: "Scènes", href: "/admin/scenes", icon: IconStage },
  { label: "Artistes", href: "/admin/artistes", icon: IconArtist },
  { label: "Événements", href: "/admin/evenements", icon: IconEvent },
  { label: "Points d'intérêt", href: "/admin/points-interet", icon: IconPoi },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto rounded-xl border border-parchment-dark bg-parchment-light p-2 md:sticky md:top-24 md:w-60 md:flex-shrink-0 md:flex-col md:gap-1 md:self-start md:overflow-visible md:p-3">
      {navItems.map(({ label, href, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={`font-heading flex flex-shrink-0 items-center gap-3 rounded-lg border-l-4 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors ${
              active
                ? "border-gold bg-forest text-parchment-light"
                : "border-transparent text-brown-mid hover:border-gold/40 hover:bg-parchment hover:text-brown"
            }`}
          >
            <Icon className="flex-shrink-0" />
            <span className="whitespace-nowrap">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
