"use client";

import { useEffect, useState } from "react";

const UNITS = [
  { key: "days", label: "Jours" },
  { key: "hours", label: "Heures" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Secondes" },
] as const;

type Remaining = Record<(typeof UNITS)[number]["key"], number>;

const ZERO: Remaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function getRemaining(target: number): Remaining {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [remaining, setRemaining] = useState<Remaining>(ZERO);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const update = () => setRemaining(getRemaining(target));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex gap-2 sm:gap-4">
      {UNITS.map((unit) => (
        <div
          key={unit.key}
          className="flex flex-col items-center gap-1 min-w-[3.75rem] sm:min-w-[4.5rem] rounded-lg border border-gold/40 bg-forest/70 px-3 py-2 sm:px-5 sm:py-3"
        >
          <span className="font-display text-xl sm:text-3xl font-bold text-gold tabular-nums">
            {String(remaining[unit.key]).padStart(2, "0")}
          </span>
          <span className="font-heading text-[8px] sm:text-[10px] tracking-[0.2em] uppercase text-parchment">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
