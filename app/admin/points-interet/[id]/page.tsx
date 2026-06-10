import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import PoiForm from "../PoiForm";
import { updatePoi } from "../actions";

export default async function EditPoiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const point = await prisma.pointOfInterest.findUnique({ where: { id: Number(id) } });

  if (!point) {
    notFound();
  }

  return (
    <div>
      <h2 className="font-display mb-6 text-lg font-bold text-brown">
        Modifier le point d&apos;intérêt
      </h2>
      <PoiForm point={point} action={updatePoi.bind(null, point.id)} submitLabel="Enregistrer" />
    </div>
  );
}
