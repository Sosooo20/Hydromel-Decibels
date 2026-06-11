import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient, EventType, PoiCategory } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Festival : vendredi 16 -> dimanche 18 octobre 2026
const FRI = "2026-10-16";
const SAT = "2026-10-17";
const SUN = "2026-10-18";

function at(day: string, time: string) {
  return new Date(`${day}T${time}:00+02:00`);
}

async function main() {
  // --- Scènes ---
  const dragon = await prisma.stage.upsert({
    where: { slug: "nid-du-dragon" },
    update: {},
    create: { name: "Le Nid du Dragon", slug: "nid-du-dragon" },
  });
  const taverne = await prisma.stage.upsert({
    where: { slug: "la-taverne" },
    update: {},
    create: { name: "La Taverne", slug: "la-taverne" },
  });
  const chateau = await prisma.stage.upsert({
    where: { slug: "le-chateau" },
    update: {},
    create: { name: "Le Château", slug: "le-chateau" },
  });

  // --- Artistes ---
  const aurora = await prisma.artist.upsert({
    where: { slug: "aurora" },
    update: { imageUrl: "/aurora.jpg" },
    create: {
      slug: "aurora",
      name: "AURORA",
      genre: "Art Pop / Folk",
      description:
        "La fée norvégienne aux mélodies célestes, entre murmures de forêt et éclats de lumière boréale.",
      imageUrl: "/aurora.jpg",
    },
  });
  const pomme = await prisma.artist.upsert({
    where: { slug: "pomme" },
    update: { imageUrl: "/pomme.jpg" },
    create: {
      slug: "pomme",
      name: "Pomme",
      genre: "Pop Folk",
      description:
        "Des chansons douces et lumineuses portées par une voix cristalline venue d'un autre siècle.",
      imageUrl: "/pomme.jpg",
    },
  });
  const dreamcatcher = await prisma.artist.upsert({
    where: { slug: "dreamcatcher" },
    update: { imageUrl: "/dreamcatcher.webp" },
    create: {
      slug: "dreamcatcher",
      name: "Dreamcatcher",
      genre: "K-Pop / Rock",
      description:
        "Sept guerrières venues d'Orient, mêlant rock électrique et chorégraphies ensorcelantes.",
      imageUrl: "/dreamcatcher.webp",
    },
  });
  const ateez = await prisma.artist.upsert({
    where: { slug: "ateez" },
    update: { imageUrl: "/ateez.webp" },
    create: {
      slug: "ateez",
      name: "ATEEZ",
      genre: "K-Pop / Theatrical",
      description:
        "Huit guerriers venus de Corée, maîtres d'un univers de pirates et de conquérants — une scène dévastatrice.",
      imageUrl: "/ateez.webp",
    },
  });
  const alestorm = await prisma.artist.upsert({
    where: { slug: "alestorm" },
    update: { imageUrl: "/alestorm.jpg" },
    create: {
      slug: "alestorm",
      name: "Alestorm",
      genre: "Pirate Metal",
      description:
        "Les pirates écossais du métal débarquent à Carcassonne — rhum, chopes et riffs à bord.",
      imageUrl: "/alestorm.jpg",
    },
  });
  const inExtremo = await prisma.artist.upsert({
    where: { slug: "in-extremo" },
    update: { imageUrl: "/in-extremo.jpg" },
    create: {
      slug: "in-extremo",
      name: "In Extremo",
      genre: "Medieval Rock",
      description:
        "Cornemuses, vielles à roue et guitares saturées : les chevaliers berlinois du rock médiéval.",
      imageUrl: "/in-extremo.jpg",
    },
  });
  const wardruna = await prisma.artist.upsert({
    where: { slug: "wardruna" },
    update: { imageUrl: "/wardruna.jpg" },
    create: {
      slug: "wardruna",
      name: "Wardruna",
      genre: "Norse Folk",
      description:
        "Einar Selvik convoque les runes et les anciens dieux dans un silence qui fait trembler la nuit.",
      imageUrl: "/wardruna.jpg",
    },
  });

  // --- Événements ---
  await prisma.event.upsert({
    where: { slug: "aurora-vendredi" },
    update: {},
    create: {
      slug: "aurora-vendredi",
      title: "AURORA",
      type: EventType.CONCERT,
      description:
        "La fée norvégienne aux mélodies célestes, entre murmures de forêt et éclats de lumière boréale.",
      day: "Vendredi",
      startTime: at(FRI, "14:00"),
      endTime: at(FRI, "15:30"),
      artistId: aurora.id,
      stageId: chateau.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "wardruna-vendredi" },
    update: {},
    create: {
      slug: "wardruna-vendredi",
      title: "Wardruna",
      type: EventType.CONCERT,
      description:
        "Einar Selvik convoque les runes et les anciens dieux dans un silence qui fait trembler la nuit.",
      day: "Vendredi",
      startTime: at(FRI, "17:00"),
      endTime: at(FRI, "18:30"),
      artistId: wardruna.id,
      stageId: dragon.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "alestorm-vendredi" },
    update: {},
    create: {
      slug: "alestorm-vendredi",
      title: "Alestorm",
      type: EventType.CONCERT,
      description:
        "Les pirates écossais du métal débarquent à Carcassonne — rhum, chopes et riffs à bord.",
      day: "Vendredi",
      startTime: at(FRI, "20:00"),
      endTime: at(FRI, "22:00"),
      artistId: alestorm.id,
      stageId: chateau.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "pomme-samedi" },
    update: {},
    create: {
      slug: "pomme-samedi",
      title: "Pomme",
      type: EventType.CONCERT,
      description:
        "Des chansons douces et lumineuses portées par une voix cristalline venue d'un autre siècle.",
      day: "Samedi",
      startTime: at(SAT, "16:00"),
      endTime: at(SAT, "17:30"),
      artistId: pomme.id,
      stageId: taverne.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "in-extremo-samedi" },
    update: {},
    create: {
      slug: "in-extremo-samedi",
      title: "In Extremo",
      type: EventType.CONCERT,
      description:
        "Cornemuses, vielles à roue et guitares saturées : les chevaliers berlinois du rock médiéval.",
      day: "Samedi",
      startTime: at(SAT, "19:00"),
      endTime: at(SAT, "21:00"),
      artistId: inExtremo.id,
      stageId: chateau.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "dreamcatcher-dimanche" },
    update: {},
    create: {
      slug: "dreamcatcher-dimanche",
      title: "Dreamcatcher",
      type: EventType.CONCERT,
      description:
        "Sept guerrières venues d'Orient, mêlant rock électrique et chorégraphies ensorcelantes.",
      day: "Dimanche",
      startTime: at(SUN, "15:00"),
      endTime: at(SUN, "16:30"),
      artistId: dreamcatcher.id,
      stageId: dragon.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "ateez-dimanche" },
    update: {},
    create: {
      slug: "ateez-dimanche",
      title: "ATEEZ",
      type: EventType.CONCERT,
      description:
        "Huit guerriers venus de Corée, maîtres d'un univers de pirates et de conquérants — une scène dévastatrice.",
      day: "Dimanche",
      startTime: at(SUN, "18:00"),
      endTime: at(SUN, "20:00"),
      artistId: ateez.id,
      stageId: chateau.id,
    },
  });

  // ─── Stands — Ventes ──────────────────────────────────────────────────────
  await prisma.stand.deleteMany();
  await prisma.stand.createMany({
    data: [
      {
        name: "Vente de verres de vin",
        category: "VENTES",
        imageUrl: "/ventes-vins.jpg",
        openTime: "11:00",
        closeTime: "22:00",
      },
      {
        name: "Vente de charcuterie",
        category: "VENTES",
        imageUrl: "/charcuterie.jpg",
        description: "Saucisson, pâtés, rillettes, rosettes",
        openTime: "11:00",
        closeTime: "20:00",
      },
      {
        name: "Vente de verres de bières",
        category: "VENTES",
        imageUrl: "/ventes-bieres.jpeg",
        openTime: "11:00",
        closeTime: "22:00",
      },
      {
        name: "Bar à hydromel",
        category: "VENTES",
        imageUrl: "/hydromel.jpg",
        description: "Hydromels artisanaux de la région, servis frais ou chauds",
        openTime: "11:00",
        closeTime: "23:00",
      },
      {
        name: "Saucisses",
        category: "REPAS",
        imageUrl: "/chipolatas-barbecue.jpg",
        openTime: "12:00",
        closeTime: "21:00",
      },
      {
        name: "Merguez",
        category: "REPAS",
        imageUrl: "/merguez-barbecue.webp",
        openTime: "12:00",
        closeTime: "21:00",
      },
      {
        name: "Frites",
        category: "REPAS",
        imageUrl: "/frites.webp",
        openTime: "12:00",
        closeTime: "21:00",
      },
      {
        name: "Boissons",
        category: "REPAS",
        imageUrl: "/boissons.jpg",
        openTime: "11:00",
        closeTime: "22:00",
      },
    ],
  });

  // ─── Activités ────────────────────────────────────────────────────────────
  await prisma.activity.deleteMany();
  await prisma.activity.createMany({
    data: [
      {
        name: "Tir à l'Arc Royal",
        category: "Compétition",
        imageUrl: "/tir-a-arc-royal.jpg",
        description: "Défiez les meilleurs archers du royaume et tentez de remporter la faveur royale.",
        startTime: "16:00",
        endTime: "18:00",
      },
      {
        name: "Courses de sacs à patate",
        category: "Jeux pour enfants",
        imageUrl: "/course-en-sac.webp",
        startTime: "10:00",
        endTime: "12:00",
      },
      {
        name: "Tirs à l'arc",
        category: "Jeux pour enfants",
        imageUrl: "/tir-a-arc-enfant.jpg",
        startTime: "10:00",
        endTime: "18:00",
      },
      {
        name: "Petit tour de poney",
        category: "Jeux pour enfants",
        imageUrl: "/poney.jpg",
        startTime: "11:00",
        endTime: "17:00",
      },
      {
        name: "Spectacle de chevaliers",
        category: "Jeux pour enfants",
        imageUrl: "/spectacle-chevaliers.jpg",
        description: "Combat de chevaliers en armure — un spectacle médiéval épique pour petits et grands.",
        startTime: "15:00",
        endTime: "16:00",
      },
    ],
  });

  // --- Points d'intérêt (Cité de Carcassonne) ---
  const pois: {
    name: string;
    category: PoiCategory;
    description: string;
    lat: number;
    lng: number;
  }[] = [
    {
      name: "Le Château (scène principale)",
      category: PoiCategory.STAGE,
      description: "La grande scène du Château Comtal, cœur des concerts du soir.",
      lat: 43.1962,
      lng: 2.3636,
    },
    {
      name: "Le Nid du Dragon",
      category: PoiCategory.STAGE,
      description: "Scène nichée près de la Basilique Saint-Nazaire.",
      lat: 43.1958,
      lng: 2.3651,
    },
    {
      name: "La Taverne",
      category: PoiCategory.STAGE,
      description: "Scène conviviale de la Place Marcou pour les ateliers et concerts folk.",
      lat: 43.1957,
      lng: 2.364,
    },
    {
      name: "Porte Narbonnaise",
      category: PoiCategory.ENTRANCE,
      description: "Entrée principale de la cité et contrôle des billets.",
      lat: 43.2068,
      lng: 2.3676,
    },
    {
      name: "Stands des Lices Hautes",
      category: PoiCategory.FOOD,
      description: "Mets d'époque cuisinés au feu de bois.",
      lat: 43.1965,
      lng: 2.366,
    },
    {
      name: "Fontaine d'Hydromel",
      category: PoiCategory.DRINK,
      description: "Hydromel artisanal brassé par la Guilde des Brasseurs.",
      lat: 43.1975,
      lng: 2.3645,
    },
    {
      name: "La Boutique du Forgeur",
      category: PoiCategory.SHOP,
      description: "Tuniques, chopes et reliques gravées à l'effigie du royaume.",
      lat: 43.196,
      lng: 2.363,
    },
    {
      name: "Latrines Royales",
      category: PoiCategory.TOILET,
      description: "Sanitaires accessibles à tous les voyageurs.",
      lat: 43.1968,
      lng: 2.3655,
    },
    {
      name: "Campement des Pèlerins",
      category: PoiCategory.CAMPING,
      description: "Zone de campement pour les voyageurs venus de loin.",
      lat: 43.199,
      lng: 2.37,
    },
    {
      name: "Tente d'Information",
      category: PoiCategory.INFO,
      description: "Hérauts du royaume, objets perdus et premiers secours.",
      lat: 43.1964,
      lng: 2.3648,
    },
  ];

  for (const poi of pois) {
    const existing = await prisma.pointOfInterest.findFirst({
      where: { name: poi.name },
    });
    if (!existing) {
      await prisma.pointOfInterest.create({ data: poi });
    }
  }

  // --- Utilisateurs ---
  const adminPassword = await bcrypt.hash("admin1234", 10);
  await prisma.user.upsert({
    where: { email: "admin@hydromel.fr" },
    update: {},
    create: {
      email: "admin@hydromel.fr",
      username: "admin",
      name: "Le Connétable",
      password: adminPassword,
      role: "ADMIN",
      rank: "Connétable du Royaume",
    },
  });

  const userPassword = await bcrypt.hash("password123", 10);
  const gauthier = await prisma.user.upsert({
    where: { email: "gauthier@hydromel.fr" },
    update: {},
    create: {
      email: "gauthier@hydromel.fr",
      username: "gauthier-le-brave",
      name: "Gauthier le Brave",
      password: userPassword,
      role: "USER",
      rank: "Chevalier du Mead",
      pieceDor: 850,
      festivals: 4,
    },
  });

  const meadWorkshop = await prisma.event.findUnique({
    where: { slug: "the-mead-workshop-samedi" },
  });
  const ateezEvent = await prisma.event.findUnique({
    where: { slug: "ateez-dimanche" },
  });

  if (meadWorkshop) {
    await prisma.favorite.upsert({
      where: { userId_eventId: { userId: gauthier.id, eventId: meadWorkshop.id } },
      update: {},
      create: { userId: gauthier.id, eventId: meadWorkshop.id, reminder: false },
    });
  }
  if (ateezEvent) {
    await prisma.favorite.upsert({
      where: { userId_eventId: { userId: gauthier.id, eventId: ateezEvent.id } },
      update: {},
      create: { userId: gauthier.id, eventId: ateezEvent.id, reminder: true },
    });
  }

  console.log("Seed terminé.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
