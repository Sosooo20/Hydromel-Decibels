"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type { Artist, Event, Stage } from "@/app/generated/prisma/client";
import { formatTimeRange } from "@/lib/format";

export type FavoriteQuest = {
  eventId: number;
  reminder: boolean;
  event: Event & { artist: Artist | null; stage: Stage };
};

export default function FavoriteQuestList({ favorites }: { favorites: FavoriteQuest[] }) {
  const [items, setItems] = useState(favorites);
  const [isPending, startTransition] = useTransition();

  function toggleReminder(eventId: number, reminder: boolean) {
    setItems((prev) =>
      prev.map((item) => (item.eventId === eventId ? { ...item, reminder } : item)),
    );
    startTransition(async () => {
      await fetch("/api/favorites", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, reminder }),
      });
    });
  }

  function removeFavorite(eventId: number) {
    setItems((prev) => prev.filter((item) => item.eventId !== eventId));
    startTransition(async () => {
      await fetch("/api/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });
    });
  }

  if (items.length === 0) {
    return (
      <p className="font-heading rounded-xl border border-parchment-dark bg-parchment-light p-6 text-center text-sm italic text-brown-mid">
        Aucune quête ajoutée pour l&apos;instant. Parcourez{" "}
        <Link href="/evenement" className="text-gold hover:text-gold-light">
          la programmation
        </Link>{" "}
        pour marquer vos favoris.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map(({ eventId, reminder, event }) => (
        <div
          key={eventId}
          className="flex flex-col gap-3 rounded-xl border border-parchment-dark bg-parchment-light p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <Link
            href={`/evenement/${event.slug}`}
            className="flex flex-1 flex-col gap-1 no-underline"
          >
            <span className="font-display text-xs uppercase tracking-[0.2em] text-gold">
              {event.day} · {formatTimeRange(event.startTime, event.endTime)}
            </span>
            <span className="font-display text-base font-bold text-brown">{event.title}</span>
            <span className="font-heading text-[10px] uppercase tracking-[0.15em] text-brown-mid">
              {event.artist?.genre ?? event.stage.name}
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={isPending}
              onClick={() => toggleReminder(eventId, !reminder)}
              className={`font-heading rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors disabled:opacity-60 ${
                reminder
                  ? "bg-forest text-parchment-light"
                  : "bg-parchment text-brown-mid hover:bg-parchment-dark"
              }`}
            >
              {reminder ? "Rappel activé" : "Activer le rappel"}
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={() => removeFavorite(eventId)}
              aria-label="Retirer des quêtes"
              className="font-heading rounded-full border border-parchment-dark px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-brown-mid transition-colors hover:border-gold hover:text-brown disabled:opacity-60"
            >
              Retirer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
