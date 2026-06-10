import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import EventForm from "../EventForm";
import { updateEvent } from "../actions";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [event, artists, stages] = await Promise.all([
    prisma.event.findUnique({ where: { id: Number(id) } }),
    prisma.artist.findMany({ orderBy: { name: "asc" } }),
    prisma.stage.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!event) {
    notFound();
  }

  return (
    <div>
      <h2 className="font-display mb-6 text-lg font-bold text-brown">
        Modifier l&apos;événement
      </h2>
      <EventForm
        event={event}
        artists={artists}
        stages={stages}
        action={updateEvent.bind(null, event.id)}
        submitLabel="Enregistrer"
      />
    </div>
  );
}
