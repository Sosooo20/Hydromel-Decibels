import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Début du seeding...");

  // ─── Nettoyage ────────────────────────────────────────────────────────────
  await prisma.eventRegistration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.stand.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.user.deleteMany();

  // ─── Artistes / Événements ────────────────────────────────────────────────
  await prisma.event.createMany({
    data: [
      {
        name: "AURORA",
        genre: "Folk / Dream Pop",
        description:
          "Chanteuse norvégienne à la voix céleste, AURORA mêle folk, électronique atmosphérique et textes poétiques pour une expérience hors du temps.",
        date: new Date("2025-10-10T14:00:00"),
        startTime: "14:00",
        endTime: "15:30",
        location: "Scène Principale",
      },
      {
        name: "Pomme",
        genre: "Chanson Folk / Indie Pop",
        description:
          "Auteure-compositrice française à la plume délicate, Pomme distille une folk intimiste et des mélodies qui réchauffent les cœurs.",
        date: new Date("2025-10-10T16:30:00"),
        startTime: "16:30",
        endTime: "18:00",
        location: "Scène Principale",
      },
      {
        name: "Dreamcatcher",
        genre: "K-Pop / Rock",
        description:
          "Groupe coréen au concept dark fantasy unique, Dreamcatcher fusionne rock, métal et K-pop pour une performance épique et visuellement saisissante.",
        date: new Date("2025-10-10T20:00:00"),
        startTime: "20:00",
        endTime: "22:00",
        location: "Scène Principale",
      },
    ],
  });
  console.log("  ✅ Événements créés (AURORA, Pomme, Dreamcatcher)");

  // ─── Stands — Ventes ──────────────────────────────────────────────────────
  await prisma.stand.createMany({
    data: [
      {
        name: "Vente de verres de vin",
        category: "VENTES",
      },
      {
        name: "Vente de charcuterie",
        category: "VENTES",
        description: "Saucisson, pâtés, rillettes, rosettes",
      },
      {
        name: "Vente de fromages",
        category: "VENTES",
      },
      {
        name: "Vente de verres de bières",
        category: "VENTES",
      },
      {
        name: "Bar à hydromel",
        category: "VENTES",
        description: "Hydromels artisanaux de la région, servis frais ou chauds",
      },
    ],
  });
  console.log("  ✅ Stands Ventes créés");

  // ─── Stands — Repas ───────────────────────────────────────────────────────
  await prisma.stand.createMany({
    data: [
      { name: "Saucisses", category: "REPAS" },
      { name: "Merguez", category: "REPAS" },
      { name: "Frites", category: "REPAS" },
      { name: "Boissons", category: "REPAS" },
    ],
  });
  console.log("  ✅ Stands Repas créés");

  // ─── Activités ────────────────────────────────────────────────────────────
  await prisma.activity.createMany({
    data: [
      {
        name: "Courses de sacs à patate",
        category: "Jeux pour enfants",
      },
      {
        name: "Tirs à l'arc",
        category: "Jeux pour enfants",
      },
      {
        name: "Petit tour de poney",
        category: "Jeux pour enfants",
      },
      {
        name: "Spectacle de chevaliers",
        category: "Jeux pour enfants",
        description: "Combat de chevaliers en armure — un spectacle médiéval épique pour petits et grands.",
      },
    ],
  });
  console.log("  ✅ Activités créées");

  console.log("\n🎉 Seeding terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant le seeding :", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
