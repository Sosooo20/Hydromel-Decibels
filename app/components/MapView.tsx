"use client";

import "leaflet/dist/leaflet.css";
import { useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { PointOfInterest, PoiCategory } from "@/app/generated/prisma/client";

const CARCASSONNE_CENTER: [number, number] = [43.1962, 2.3636];

const CATEGORY_META: Record<PoiCategory, { label: string; color: string; icon: string }> = {
  STAGE: { label: "Scènes", color: "#3D2714", icon: "🎤" },
  FOOD: { label: "Nourriture", color: "#C9A84C", icon: "🍖" },
  DRINK: { label: "Boissons", color: "#6B4226", icon: "🍯" },
  SHOP: { label: "Boutiques", color: "#1A2610", icon: "🛒" },
  TOILET: { label: "Toilettes", color: "#2B3F18", icon: "🚻" },
  ENTRANCE: { label: "Entrées", color: "#1A2610", icon: "🚪" },
  CAMPING: { label: "Camping", color: "#2B3F18", icon: "⛺" },
  INFO: { label: "Information", color: "#C9A84C", icon: "ℹ️" },
};

function createIcon(category: PoiCategory) {
  const meta = CATEGORY_META[category];
  return L.divIcon({
    html: `<div style="
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      background: ${meta.color};
      border: 2px solid #F2E3C0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.35);
    "><span style="transform: rotate(45deg); font-size: 14px;">${meta.icon}</span></div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

export default function MapView({ points }: { points: PointOfInterest[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return points;
    return points.filter((point) => point.name.toLowerCase().includes(query));
  }, [points, search]);

  return (
    <div className="flex flex-col gap-4">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher un lieu (scène, hydromel, latrines...)"
        className="font-heading w-full rounded-full border border-parchment-dark bg-parchment-light px-5 py-3 text-sm text-brown outline-none placeholder:text-brown-mid/60 focus:border-gold"
      />

      <div className="overflow-hidden rounded-xl border border-parchment-dark">
        <MapContainer
          center={CARCASSONNE_CENTER}
          zoom={16}
          style={{ height: "60vh", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((point) => (
            <Marker key={point.id} position={[point.lat, point.lng]} icon={createIcon(point.category)}>
              <Popup>
                <strong>{point.name}</strong>
                {point.description && <p className="m-0 mt-1">{point.description}</p>}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="flex flex-wrap gap-3">
        {(Object.keys(CATEGORY_META) as PoiCategory[]).map((category) => {
          const meta = CATEGORY_META[category];
          return (
            <div key={category} className="font-heading flex items-center gap-2 text-xs text-black-mid">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full text-xs"
                style={{ background: meta.color }}
              >
                {meta.icon}
              </span>
              {meta.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
