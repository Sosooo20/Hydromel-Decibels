import Link from "next/link";
import type { Event, Stage } from "@/app/generated/prisma/client";
import { formatTimeRange } from "@/lib/format";

type ActivityWithStage = Event & { stage: Stage };

export default function ActivitiesGrid({ activities }: { activities: ActivityWithStage[] }) {
  if (activities.length === 0) return null;

  return (
    <section className="bg-parchment-light py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-gold" />
          <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Quêtes Annexes
          </span>
          <div className="h-px w-8 bg-gold" />
        </div>
        <h2 className="font-display mb-10 text-center text-2xl font-bold text-brown md:text-3xl">
          Le Grimoire des Activités
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {activities.map((activity) => (
            <Link
              key={activity.id}
              href={`/evenement/${activity.slug}`}
              className="flex flex-col gap-2 rounded-xl border border-parchment-dark bg-parchment p-5 no-underline transition-colors hover:border-gold"
            >
              <span className="font-heading w-fit rounded-full bg-forest px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-parchment-light">
                {activity.stage.name}
              </span>
              <h3 className="font-display text-lg font-bold text-brown">{activity.title}</h3>
              <p className="font-heading flex-1 text-xs italic leading-relaxed text-brown-mid">
                {activity.description}
              </p>
              <div className="font-heading flex items-center gap-2 text-xs font-semibold text-gold">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {activity.day} · {formatTimeRange(activity.startTime, activity.endTime)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
