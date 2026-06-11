import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import prisma from "@/lib/prisma";
import QrPass from "@/app/components/QrPass";
import FavoriteQuestList from "@/app/components/FavoriteQuestList";

export default async function ProfilPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(session.user.id) },
    include: {
      favorites: {
        orderBy: { event: { startTime: "asc" } },
        include: { event: { include: { artist: true, stage: true } } },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const stats = [
    { label: "Festivals", value: user.festivals },
    { label: "Pièces d'Or", value: user.pieceDor },
  ];

  return (
    <section
      className="py-12"
      style={{
        backgroundImage: "url('/parchemin-bg.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-gold" />
          <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            Carnet de l&apos;Aventurier
          </span>
          <div className="h-px w-8 bg-gold" />
        </div>
        <h1 className="font-display mb-1 text-center text-2xl font-bold text-brown md:text-3xl">
          {user.name ?? user.username}
        </h1>
        <p className="font-heading mb-8 text-center text-[11px] uppercase tracking-[0.2em] text-brown-mid">
          {user.rank}
        </p>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-xl border border-parchment-dark bg-parchment-light p-4 text-center"
            >
              <span className="font-display text-2xl font-bold text-gold">{stat.value}</span>
              <span className="font-heading text-[10px] uppercase tracking-[0.15em] text-brown-mid">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Mes Trésors */}
        <div className="mb-10">
          <h2 className="font-display mb-4 text-lg font-bold text-brown">Mes Trésors</h2>
          <QrPass
            token={`HYDROMEL-PASS-${user.id}-${user.username}`}
            name={user.name ?? user.username}
            rank={user.rank}
          />
        </div>

        {/* Mes Quêtes Musicales */}
        <div className="mb-10">
          <h2 className="font-display mb-4 text-lg font-bold text-brown">
            Mes Quêtes Musicales
          </h2>
          <FavoriteQuestList
            favorites={user.favorites.map((favorite) => ({
              eventId: favorite.eventId,
              reminder: favorite.reminder,
              event: favorite.event,
            }))}
          />
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="font-heading w-full rounded-full border border-parchment-dark px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-brown-mid transition-colors hover:border-gold hover:text-brown"
          >
            Se déconnecter
          </button>
        </form>
      </div>
    </section>
  );
}
