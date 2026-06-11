import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  const evenements = await prisma.event.findMany({
    orderBy: { startTime: "asc" },
  });

  return NextResponse.json(evenements);
}
