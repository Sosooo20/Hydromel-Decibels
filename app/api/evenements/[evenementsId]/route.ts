import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ evenementsId: string }> }
) {
  const { evenementsId } = await params;

  const evenement = await prisma.event.findUnique({
    where: { id: Number(evenementsId) },
  });

  if (!evenement) {
    return NextResponse.json({ error: "Événement introuvable" }, { status: 404 });
  }

  return NextResponse.json(evenement);
}
