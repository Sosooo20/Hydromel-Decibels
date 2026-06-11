"use client";

import { useState } from "react";
import Link from "next/link";
import type { Artist, Event, Stage } from "@/app/generated/prisma/client";
import { formatTimeRange } from "@/lib/format";

type EventWithArtist = Event & { artist: Artist | null };
type StageWithEvents = Stage & { events: EventWithArtist[] };

export default function StageTabs({ stages }: { stages: StageWithEvents[] }) {
  const [activeId, setActiveId] = useState(stages[0]?.id);
  const activeStage = stages.find((stage) => stage.id === activeId) ?? stages[0];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {stages.map((stage) => (
          <button
            key={stage.id}
            type="button"
            onClick={() => setActiveId(stage.id)}
            className={`font-heading rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors ${
              stage.id === activeStage?.id
                ? "bg-forest text-parchment-light"
                : "bg-parchment-light text-brown-mid hover:bg-parchment-dark"
            }`}
          >
            {stage.name}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {activeStage?.events.length === 0 && (
          <p className="font-heading text-center text-sm italic text-brown-mid">
            Aucune quête programmée sur cette scène pour le moment.
          </p>
        )}

        {activeStage?.events.map((event) => (
          <Link
            key={event.id}
            href={`/evenement/${event.slug}`}
            className="flex flex-col gap-3 rounded-xl border border-parchment-dark bg-parchment-light p-5 no-underline transition-colors hover:border-gold sm:flex-row sm:items-center"
          >
            <div className="font-display flex w-full flex-col items-start gap-1 sm:w-32 sm:flex-shrink-0">
              <span className="text-xs uppercase tracking-[0.2em] text-gold">{event.day}</span>
              <span className="text-sm font-bold text-brown">
                {formatTimeRange(event.startTime, event.endTime)}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <h3 className="font-display text-lg font-bold text-brown">{event.title}</h3>
              {event.artist && (
                <p className="font-heading text-[10px] uppercase tracking-[0.15em] text-brown-mid">
                  {event.artist.genre}
                </p>
              )}
              <p className="font-heading text-xs italic leading-relaxed text-brown-mid">
                {event.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
