"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { fromDatetimeLocal } from "./datetime";

const eventSchema = z.object({
  title: z.string().min(2).max(150),
  slug: z
    .string()
    .min(2)
    .max(150)
    .regex(/^[a-z0-9-]+$/, "Lettres minuscules, chiffres et tirets uniquement"),
  type: z.enum(["CONCERT", "ACTIVITY", "FEAST"]),
  description: z.string().min(1),
  imageUrl: z.string().url().optional().or(z.literal("")),
  day: z.string().min(2).max(50),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  prize: z.string().optional().or(z.literal("")),
  artistId: z.string().optional(),
  stageId: z.string().min(1),
});

function parseForm(formData: FormData) {
  const parsed = eventSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    type: formData.get("type"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl") || "",
    day: formData.get("day"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    prize: formData.get("prize") || "",
    artistId: formData.get("artistId") || "",
    stageId: formData.get("stageId"),
  });

  return {
    title: parsed.title,
    slug: parsed.slug,
    type: parsed.type,
    description: parsed.description,
    imageUrl: parsed.imageUrl || null,
    day: parsed.day,
    startTime: fromDatetimeLocal(parsed.startTime),
    endTime: fromDatetimeLocal(parsed.endTime),
    prize: parsed.prize || null,
    artistId: parsed.artistId ? Number(parsed.artistId) : null,
    stageId: Number(parsed.stageId),
  };
}

export async function createEvent(formData: FormData) {
  const data = parseForm(formData);

  await prisma.event.create({ data });

  revalidatePath("/admin/evenements");
  redirect("/admin/evenements");
}

export async function updateEvent(id: number, formData: FormData) {
  const data = parseForm(formData);

  await prisma.event.update({ where: { id }, data });

  revalidatePath("/admin/evenements");
  redirect("/admin/evenements");
}

export async function deleteEvent(id: number) {
  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/evenements");
}
