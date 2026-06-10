"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const stageSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Lettres minuscules, chiffres et tirets uniquement"),
});

export async function createStage(formData: FormData) {
  const data = stageSchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
  });

  await prisma.stage.create({ data });

  revalidatePath("/admin/scenes");
  redirect("/admin/scenes");
}

export async function updateStage(id: number, formData: FormData) {
  const data = stageSchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
  });

  await prisma.stage.update({ where: { id }, data });

  revalidatePath("/admin/scenes");
  redirect("/admin/scenes");
}

export async function deleteStage(id: number) {
  await prisma.stage.delete({ where: { id } });
  revalidatePath("/admin/scenes");
}
