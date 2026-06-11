"use client";

import { useState, useTransition } from "react";

export default function FavoriteButton({
  eventId,
  initialFavorite,
}: {
  eventId: number;
  initialFavorite: boolean;
}) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [isPending, startTransition] = useTransition();

  function addFavorite() {
    startTransition(async () => {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });

      if (res.ok) setIsFavorite(true);
    });
  }

  return (
    <button
      type="button"
      onClick={addFavorite}
      disabled={isFavorite || isPending}
      className={`detail-cta__btn ${isFavorite ? "" : "detail-cta__btn--active"}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
      {isFavorite ? "Ajouté aux favoris" : isPending ? "Ajout en cours..." : "Ajouter aux favoris"}
    </button>
  );
}
