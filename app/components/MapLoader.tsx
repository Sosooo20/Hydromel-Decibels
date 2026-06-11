"use client";

import dynamic from "next/dynamic";
import type { PointOfInterest } from "@/app/generated/prisma/client";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="font-heading flex h-[60vh] w-full items-center justify-center rounded-xl border border-parchment-dark bg-parchment-light text-sm uppercase tracking-[0.2em] text-brown-mid">
      Chargement de la carte...
    </div>
  ),
});

export default function MapLoader({ points }: { points: PointOfInterest[] }) {
  return <MapView points={points} />;
}
