"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QrPass({
  token,
  name,
  rank,
}: {
  token: string;
  name: string;
  rank: string;
}) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    QRCode.toDataURL(token, {
      margin: 1,
      width: 240,
      color: { dark: "#1A2610", light: "#F2E3C0" },
    }).then((url) => {
      if (!cancelled) setDataUrl(url);
    });

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="rounded-2xl border-2 border-dashed border-gold bg-parchment-light p-6 text-center">
      <span className="font-heading text-[10px] uppercase tracking-[0.3em] text-gold">
        Pass du Festival
      </span>
      <h3 className="font-display mt-1 mb-4 text-lg font-bold text-brown">{name}</h3>

      <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-lg bg-white p-3">
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dataUrl} alt="QR code du pass" className="h-full w-full" />
        ) : (
          <span className="font-heading text-xs text-brown-mid">Génération...</span>
        )}
      </div>

      <p className="font-heading mt-4 text-[11px] uppercase tracking-[0.2em] text-brown-mid">
        {rank}
      </p>
    </div>
  );
}
