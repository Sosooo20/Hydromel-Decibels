import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  email: z.email(),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_-]+$/, "Lettres, chiffres, tirets et underscores uniquement"),
  name: z.string().min(2).max(100),
  password: z.string().min(6).max(100),
});

export async function POST(req: NextRequest) {
  const parsed = registerSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }
  const { email, username, name, password } = parsed.data;
  const hashed = await bcrypt.hash(password, 10); // 🔒 jamais en clair

  try {
    const user = await prisma.user.create({
      data: { email, username, name, password: hashed },
    });

    return NextResponse.json(
      { id: user.id, email: user.email, username: user.username },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Cet email ou ce nom de voyageur est déjà utilisé" },
      { status: 409 },
    );
  }
}