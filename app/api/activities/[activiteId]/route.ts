import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ activiteId: string }> }
) {
  const { activiteId } = await params;

  const activite = await prisma.activity.findUnique({
    where: { id: activiteId },
  });

  if (!activite) {
    return NextResponse.json({ error: "Activité introuvable" }, { status: 404 });
  }

  return NextResponse.json(activite);
}
