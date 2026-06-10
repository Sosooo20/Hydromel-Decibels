"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const poiSchema = z.object({
  name: z.string().min(2).max(150),
  category: z.enum([
    "STAGE",
    "FOOD",
    "DRINK",
    "SHOP",
    "TOILET",
    "ENTRANCE",
    "CAMPING",
    "INFO",
  ]),
  description: z.string().optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
});

function parseForm(formData: FormData) {
  const parsed = poiSchema.parse({
    name: formData.get("name"),
    category: formData.get("category"),
    description: formData.get("description") || "",
    imageUrl: formData.get("imageUrl") || "",
    lat: formData.get("lat"),
    lng: formData.get("lng"),
  });

  return {
    name: parsed.name,
    category: parsed.category,
    description: parsed.description || null,
    imageUrl: parsed.imageUrl || null,
    lat: parsed.lat,
    lng: parsed.lng,
  };
}

export async function createPoi(formData: FormData) {
  const data = parseForm(formData);

  await prisma.pointOfInterest.create({ data });

  revalidatePath("/admin/points-interet");
  redirect("/admin/points-interet");
}

export async function updatePoi(id: number, formData: FormData) {
  const data = parseForm(formData);

  await prisma.pointOfInterest.update({ where: { id }, data });

  revalidatePath("/admin/points-interet");
  redirect("/admin/points-interet");
}

export async function deletePoi(id: number) {
  await prisma.pointOfInterest.delete({ where: { id } });
  revalidatePath("/admin/points-interet");
}
