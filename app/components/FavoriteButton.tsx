"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function FavoriteButton({
  eventId,
  initialFavorited,
  isLoggedIn,
}: {
  eventId: number;
  initialFavorited: boolean;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [isPending, startTransition] = useTransition();

  function toggle() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const next = !favorited;
    setFavorited(next);

    startTransition(async () => {
      await fetch("/api/favorites", {
        method: next ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      className={`font-heading w-full rounded-full border px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors disabled:opacity-60 ${
        favorited
          ? "border-gold bg-gold text-forest hover:bg-gold-light"
          : "border-parchment-dark text-brown-mid hover:border-gold hover:text-brown"
      }`}
    >
      {favorited ? "★ Quête ajoutée" : "☆ Ajouter à mes quêtes"}
    </button>
  );
}
