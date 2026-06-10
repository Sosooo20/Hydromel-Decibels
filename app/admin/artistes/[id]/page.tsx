import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ArtistForm from "../ArtistForm";
import { updateArtist } from "../actions";

export default async function EditArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artist = await prisma.artist.findUnique({ where: { id: Number(id) } });

  if (!artist) {
    notFound();
  }

  return (
    <div>
      <h2 className="font-display mb-6 text-lg font-bold text-brown">Modifier l&apos;artiste</h2>
      <ArtistForm artist={artist} action={updateArtist.bind(null, artist.id)} submitLabel="Enregistrer" />
    </div>
  );
}
