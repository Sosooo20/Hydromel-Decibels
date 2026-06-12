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

  // ─── Stands → Points d'intérêt ───────────────────────────────────────────
  const standPois: {
    name: string;
    category: PoiCategory;
    description: string;
    imageUrl: string;
    lat: number;
    lng: number;
  }[] = [
    {
      name: "Vente de verres de vin",
      category: PoiCategory.DRINK,
      description: "Ouvert 11h–22h. Sélection de vins rouges, blancs et rosés des vignobles occitans. Verre de vin : 3 €. Bouteille à emporter : à partir de 8 €. Dégustation découverte (3 verres) : 8 €.",
      imageUrl: "/ventes-vins.jpg",
      lat: 43.1964,
      lng: 2.3662,
    },
    {
      name: "Vente de charcuterie",
      category: PoiCategory.SHOP,
      description: "Ouvert 11h–20h. Spécialités charcutières artisanales du Languedoc. Saucisson sec : 4 €/100 g. Pâté campagnard : 3 € la part. Rillettes maison : 3,50 €. Rosette : 5 €/100 g. Plateau découverte (4 produits) : 14 €.",
      imageUrl: "/charcuterie.jpg",
      lat: 43.1962,
      lng: 2.3660,
    },
    {
      name: "Vente de fromages",
      category: PoiCategory.SHOP,
      description: "Ouvert 11h–20h. Fromages affinés de la région occitane. Roquefort AOP : 5 €/100 g. Tome des Pyrénées : 4 €/100 g. Pélardon (chèvre) : 3 € la pièce. Cabécou : 2,50 € la pièce. Plateau dégustation (4 fromages + pain) : 12 €.",
      imageUrl: "/fromages.jpg",
      lat: 43.1961,
      lng: 2.3663,
    },
    {
      name: "Vente de verres de bières",
      category: PoiCategory.DRINK,
      description: "Ouvert 11h–22h. Bières artisanales brassées pour le festival. Blonde légère : 3 €. Ambrée houblonnée : 3,50 €. Brune aux épices médiévales : 4 €. Bière sans alcool : 2,50 €. Formule 3 bières au choix : 9 €.",
      imageUrl: "/ventes-bieres.jpeg",
      lat: 43.1963,
      lng: 2.3657,
    },
    {
      name: "Bar à hydromel",
      category: PoiCategory.DRINK,
      description: "Ouvert 11h–23h. Hydromels artisanaux de la région, servis frais ou chauds. Hydromel classique (verre) : 4 €. Hydromel aux fruits rouges : 4,50 €. Hydromel épicé chaud : 5 €. Chope souvenir du festival : 12 € (inclut une première chope).",
      imageUrl: "/hydromel.jpg",
      lat: 43.1966,
      lng: 2.3658,
    },
    {
      name: "Saucisses",
      category: PoiCategory.FOOD,
      description: "Ouvert 12h–21h. Saucisses et chipolatas grillées au feu de bois. Chipolata dans son pain : 3,50 €. Saucisse de Toulouse : 4 €. Formule saucisse + boisson : 6 €. Servies avec moutarde, ketchup et oignons caramélisés.",
      imageUrl: "/chipolatas-barbecue.jpg",
      lat: 43.1968,
      lng: 2.3663,
    },
    {
      name: "Merguez",
      category: PoiCategory.FOOD,
      description: "Ouvert 12h–21h. Merguez artisanales grillées à la braise, épicées selon la tradition. Merguez dans son pain : 3,50 €. Duo de merguez avec pain et salade : 6 €. Formule merguez + frites + boisson : 9 €.",
      imageUrl: "/merguez-barbecue.webp",
      lat: 43.1969,
      lng: 2.3660,
    },
    {
      name: "Frites",
      category: PoiCategory.FOOD,
      description: "Ouvert 12h–21h. Frites fraîches coupées à la main, cuites dans l'huile de tournesol. Portion classique : 3 €. Grande portion : 4,50 €. Frites au fromage fondu : 5 €. Frites au lard et oignons : 5,50 €. Sauce au choix incluse.",
      imageUrl: "/frites.webp",
      lat: 43.1970,
      lng: 2.3658,
    },
    {
      name: "Boissons",
      category: PoiCategory.DRINK,
      description: "Ouvert 11h–22h. Boissons fraîches et chaudes pour tous les festivaliers. Eau minérale : 1,50 €. Soda : 2,50 €. Jus de fruits : 2,50 €. Café / thé : 2 €. Chocolat chaud épicé : 3 €. Limonade artisanale : 3 €.",
      imageUrl: "/boissons.jpg",
      lat: 43.1967,
      lng: 2.3655,
    },
  ];

  for (const poi of standPois) {
    const existing = await prisma.pointOfInterest.findFirst({
      where: { name: poi.name },
    });
    if (!existing) {
      await prisma.pointOfInterest.create({ data: poi });
    } else {
      await prisma.pointOfInterest.update({ where: { id: existing.id }, data: poi });
    }
  }

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
    imageUrl?: string;
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
      name: "La Boutique du Forgeur",
      category: PoiCategory.SHOP,
      description: "Tuniques, chopes et reliques gravées à l'effigie du royaume.",
      imageUrl: "/boutique.jpg",
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
    } else {
      await prisma.pointOfInterest.update({ where: { id: existing.id }, data: poi });
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
