import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ standId: string }> }
) {
  const { standId } = await params;

  const stand = await prisma.stand.findUnique({
    where: { id: standId },
  });

  if (!stand) {
    return NextResponse.json({ error: "Stand introuvable" }, { status: 404 });
  }

  return NextResponse.json(stand);
}
