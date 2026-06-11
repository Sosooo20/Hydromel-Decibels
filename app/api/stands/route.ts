import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
    const stands = await prisma.stand.findMany({
        orderBy: { name: "asc" },
    });

    return NextResponse.json(stands);
}
