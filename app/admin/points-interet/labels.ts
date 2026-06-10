import type { PoiCategory } from "@/app/generated/prisma/client";

export const CATEGORY_LABELS: Record<PoiCategory, string> = {
  STAGE: "Scène",
  FOOD: "Nourriture",
  DRINK: "Boissons",
  SHOP: "Boutique",
  TOILET: "Toilettes",
  ENTRANCE: "Entrée",
  CAMPING: "Camping",
  INFO: "Information",
};
