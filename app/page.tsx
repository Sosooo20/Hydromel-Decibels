import prisma from "@/lib/prisma";
import HeroBanner from "./components/HeroBanner";
import MythSection from "./components/MythSection";
import EventsPreview from "./components/EventsPreview";

export default async function Home() {
  const events = await prisma.event.findMany({
    take: 3,
    orderBy: { startTime: "asc" },
    include: { artist: true, stage: true },
  });

  return (
    <>
      <HeroBanner />
      <MythSection />
      <EventsPreview events={events} />
    </>
  );
}
