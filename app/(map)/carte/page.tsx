import prisma from "@/lib/prisma";
import MapLoader from "@/app/components/MapLoader";

export default async function CartePage() {
  const points = await prisma.pointOfInterest.findMany({ orderBy: { id: "asc" } });

  return (
    <section className="py-8"
    style={{
        backgroundImage: "url('/parchemin-bg.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-black" />
          <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-black">
            Carte du Royaume
          </span>
          <div className="h-px w-8 bg-black" />
        </div>
        <h1 className="font-display mb-6 text-center text-2xl font-bold text-brown md:text-3xl">
          La Cité de Carcassonne
        </h1>

        <MapLoader points={points} />
      </div>
    </section>
  );
}
