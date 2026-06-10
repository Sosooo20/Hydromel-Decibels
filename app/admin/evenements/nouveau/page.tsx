import prisma from "@/lib/prisma";
import EventForm from "../EventForm";
import { createEvent } from "../actions";

export default async function NewEventPage() {
  const [artists, stages] = await Promise.all([
    prisma.artist.findMany({ orderBy: { name: "asc" } }),
    prisma.stage.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <h2 className="font-display mb-6 text-lg font-bold text-brown">Nouvel événement</h2>
      <EventForm artists={artists} stages={stages} action={createEvent} submitLabel="Créer" />
    </div>
  );
}
