"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const artistSchema = z.object({
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Lettres minuscules, chiffres et tirets uniquement"),
  name: z.string().min(2).max(150),
  genre: z.string().min(2).max(150),
  description: z.string().min(1),
  imageUrl: z.string().url().optional().or(z.literal("")),
  featured: z.coerce.boolean(),
});

function parseForm(formData: FormData) {
  const parsed = artistSchema.parse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    genre: formData.get("genre"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl") || "",
    featured: formData.get("featured") === "on",
  });

  return {
    slug: parsed.slug,
    name: parsed.name,
    genre: parsed.genre,
    description: parsed.description,
    imageUrl: parsed.imageUrl || null,
    featured: parsed.featured,
  };
}

export async function createArtist(formData: FormData) {
  const data = parseForm(formData);

  await prisma.artist.create({ data });

  revalidatePath("/admin/artistes");
  redirect("/admin/artistes");
}

export async function updateArtist(id: number, formData: FormData) {
  const data = parseForm(formData);

  await prisma.artist.update({ where: { id }, data });

  revalidatePath("/admin/artistes");
  redirect("/admin/artistes");
}

export async function deleteArtist(id: number) {
  await prisma.artist.delete({ where: { id } });
  revalidatePath("/admin/artistes");
}
