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
  const echoes = await prisma.artist.upsert({
    where: { slug: "echoes-of-valhalla" },
    update: {},
    create: {
      slug: "echoes-of-valhalla",
      name: "Echoes of Valhalla",
      genre: "Nordic Folk Metal",
      description:
        "Une tempête de cordes et de tonnerre venue des cimes gelées du nord.",
    },
  });
  const barleyBards = await prisma.artist.upsert({
    where: { slug: "the-barley-bards" },
    update: {},
    create: {
      slug: "the-barley-bards",
      name: "The Barley Bards",
      genre: "Celtic Tavern Punk",
      description:
        "Des ballades rythmées qui transforment chaque inconnu en frère de taverne.",
    },
  });
  const ironCitadel = await prisma.artist.upsert({
    where: { slug: "iron-citadel" },
    update: {},
    create: {
      slug: "iron-citadel",
      name: "Iron Citadel",
      genre: "Epic Power Metal",
      description:
        "Les murailles trembleront et l'hydromel coulera comme des rivières.",
    },
  });
  const gunnar = await prisma.artist.upsert({
    where: { slug: "gunnar-marteau-fou" },
    update: {},
    create: {
      slug: "gunnar-marteau-fou",
      name: "Gunnar Marteau-Fou",
      genre: "Viking Metal",
      description:
        "Le marteau lève, la meute hurle : Gunnar mène la charge jusqu'à l'aube.",
    },
  });
  const sages = await prisma.artist.upsert({
    where: { slug: "les-sages-de-lhydromel" },
    update: {},
    create: {
      slug: "les-sages-de-lhydromel",
      name: "Les Sages de l'Hydromel",
      genre: "Celtic Punk",
      description:
        "Trois générations de troubadours réunies pour un dernier banquet endiablé.",
    },
  });
  const skald = await prisma.artist.upsert({
    where: { slug: "skald-of-thunder" },
    update: {},
    create: {
      slug: "skald-of-thunder",
      name: "Skald of Thunder",
      genre: "Epic Folk Metal",
      description:
        "Le barde-tonnerre raconte les sagas oubliées sur un tapis de riffs saturés.",
    },
  });
  const morrigane = await prisma.artist.upsert({
    where: { slug: "morrigane-coeur-de-braise" },
    update: {},
    create: {
      slug: "morrigane-coeur-de-braise",
      name: "Morrigane Cœur-de-Braise",
      genre: "Voix de Légende",
      description:
        "Recherchée dans tout le royaume pour des chants capables de réveiller les morts... et les foules.",
      bounty: 1500,
      featured: true,
    },
  });

  // --- Événements ---
  await prisma.event.upsert({
    where: { slug: "echoes-of-valhalla-vendredi" },
    update: {},
    create: {
      slug: "echoes-of-valhalla-vendredi",
      title: "Echoes of Valhalla",
      type: EventType.CONCERT,
      description:
        "Une tempête de cordes et de tonnerre venue des cimes gelées du nord.",
      day: "Vendredi",
      startTime: at(FRI, "14:00"),
      endTime: at(FRI, "15:30"),
      artistId: echoes.id,
      stageId: dragon.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "the-barley-bards-vendredi" },
    update: {},
    create: {
      slug: "the-barley-bards-vendredi",
      title: "The Barley Bards",
      type: EventType.CONCERT,
      description:
        "Des ballades rythmées qui transforment chaque inconnu en frère de taverne.",
      day: "Vendredi",
      startTime: at(FRI, "16:30"),
      endTime: at(FRI, "18:00"),
      artistId: barleyBards.id,
      stageId: taverne.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "iron-citadel-vendredi" },
    update: {},
    create: {
      slug: "iron-citadel-vendredi",
      title: "Iron Citadel",
      type: EventType.CONCERT,
      description:
        "Les murailles trembleront et l'hydromel coulera comme des rivières.",
      day: "Vendredi",
      startTime: at(FRI, "20:00"),
      endTime: at(FRI, "22:00"),
      artistId: ironCitadel.id,
      stageId: chateau.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "skald-of-thunder-vendredi" },
    update: {},
    create: {
      slug: "skald-of-thunder-vendredi",
      title: "Skald of Thunder",
      type: EventType.CONCERT,
      description:
        "Le barde-tonnerre raconte les sagas oubliées sur un tapis de riffs saturés.",
      day: "Vendredi",
      startTime: at(FRI, "21:00"),
      endTime: at(FRI, "22:30"),
      artistId: skald.id,
      stageId: chateau.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "gunnar-marteau-fou-vendredi" },
    update: {},
    create: {
      slug: "gunnar-marteau-fou-vendredi",
      title: "Gunnar Marteau-Fou",
      type: EventType.CONCERT,
      description:
        "Le marteau lève, la meute hurle : Gunnar mène la charge jusqu'à l'aube.",
      day: "Vendredi",
      startTime: at(FRI, "22:00"),
      endTime: at(FRI, "23:30"),
      artistId: gunnar.id,
      stageId: dragon.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "the-mead-workshop-samedi" },
    update: {},
    create: {
      slug: "the-mead-workshop-samedi",
      title: "The Mead Workshop",
      type: EventType.ACTIVITY,
      description:
        "Atelier de dégustation et d'initiation à la fabrication de l'hydromel artisanal.",
      day: "Samedi",
      startTime: at(SAT, "14:00"),
      endTime: at(SAT, "15:30"),
      stageId: taverne.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "tir-a-larc-royal-samedi" },
    update: {},
    create: {
      slug: "tir-a-larc-royal-samedi",
      title: "Tir à l'Arc Royal",
      type: EventType.ACTIVITY,
      description:
        "Défiez les meilleurs archers du royaume et tentez de remporter la faveur royale.",
      day: "Samedi",
      startTime: at(SAT, "16:00"),
      endTime: at(SAT, "18:00"),
      prize: "Médaille du Tireur d'Élite + 200 Lutins d'Or",
      stageId: chateau.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "morrigane-coeur-de-braise-samedi" },
    update: {},
    create: {
      slug: "morrigane-coeur-de-braise-samedi",
      title: "Morrigane Cœur-de-Braise",
      type: EventType.CONCERT,
      description:
        "Recherchée dans tout le royaume pour des chants capables de réveiller les morts... et les foules.",
      day: "Samedi",
      startTime: at(SAT, "19:00"),
      endTime: at(SAT, "20:30"),
      artistId: morrigane.id,
      stageId: chateau.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "les-sages-de-lhydromel-dimanche" },
    update: {},
    create: {
      slug: "les-sages-de-lhydromel-dimanche",
      title: "Les Sages de l'Hydromel",
      type: EventType.CONCERT,
      description:
        "Trois générations de troubadours réunies pour un dernier banquet endiablé.",
      day: "Dimanche",
      startTime: at(SUN, "18:00"),
      endTime: at(SUN, "19:30"),
      artistId: sages.id,
      stageId: taverne.id,
    },
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
      lutinsDor: 850,
      reliques: 2,
      questsDone: 12,
      festivals: 4,
    },
  });

  const skaldEvent = await prisma.event.findUnique({
    where: { slug: "skald-of-thunder-vendredi" },
  });
  const meadWorkshop = await prisma.event.findUnique({
    where: { slug: "the-mead-workshop-samedi" },
  });

  if (skaldEvent) {
    await prisma.favorite.upsert({
      where: { userId_eventId: { userId: gauthier.id, eventId: skaldEvent.id } },
      update: {},
      create: { userId: gauthier.id, eventId: skaldEvent.id, reminder: true },
    });
  }
  if (meadWorkshop) {
    await prisma.favorite.upsert({
      where: { userId_eventId: { userId: gauthier.id, eventId: meadWorkshop.id } },
      update: {},
      create: { userId: gauthier.id, eventId: meadWorkshop.id, reminder: false },
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
