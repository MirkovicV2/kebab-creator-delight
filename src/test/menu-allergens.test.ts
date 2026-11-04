import { describe, expect, it } from "vitest";

import { menuProducts, type AllergenId } from "@/features/menu/data";

const smoothieIds = [
  "tropical-heaven",
  "caribbean-passion",
  "berries-paradise",
  "colada-jungle",
  "vitality",
  "red-bliss",
  "green-power",
  "sunny-splash",
  "dragon-fruit-mix",
  "squeeze-nature",
  "delightful",
  "blue-lightning",
];

const expectedAllergensByProductId: Record<string, AllergenId[]> = {
  "salads-ensalada-cesar": ["gluten", "milk", "egg"],
  "salads-ensalada-rulo-de-cabra": ["gluten", "milk"],
  "salads-ensalada-ventresca": ["fish"],
  "salads-ensalada-de-pollo-crujiente": ["gluten", "milk"],

  "turkish-specialties-kebab": ["gluten"],
  "turkish-specialties-kebab-falafel": ["gluten"],
  "turkish-specialties-shawarma": ["gluten"],
  "turkish-specialties-shawarma-falafel": ["gluten"],
  "turkish-specialties-racion-de-patatas-fritas": ["gluten"],
  "turkish-specialties-media-racion-de-patatas-fritas": ["gluten"],
  "plates-combi-simple": [],
  "plates-combi-simple-falafel": [],
  "plates-combi-doble": [],
  "plates-combi-doble-falafel": [],
  "plates-plato-deja-vu": [],
  "plates-plato-deja-vu-falafel": [],

  "rations-patatas-mixtas-bravas-o-alioli": ["egg"],
  "rations-racion-de-patatas-fritas": [],
  "rations-media-racion-de-patatas-fritas": [],
  "rations-salchipapas": [],
  "rations-papas-locas": ["milk"],
  "rations-alitas-de-pollo": [],
  "rations-nuggets": ["gluten"],
  "rations-nuggets-1-2-racion": ["gluten"],
  "rations-croquetas-de-jamon": ["gluten", "milk", "egg"],
  "rations-croquetas-de-jamon-1-2-racion": ["gluten", "milk", "egg"],
  "rations-fingers": ["gluten", "milk"],
  "rations-fingers-1-2-racion": ["gluten", "milk"],
  "rations-huevos-rotos": ["egg"],
  "rations-huevos-rotos-1-2-racion": ["egg"],
  "rations-oreja-a-la-plancha": [],

  "hamburgers-simple": ["gluten", "milk"],
  "hamburgers-deja-vu-simple": ["gluten", "milk"],
  "hamburgers-rulo-de-cabra": ["gluten", "milk"],
  "hamburgers-deja-vu": ["gluten", "milk", "egg"],
  "hamburgers-deja-vu-deluxe": ["gluten", "milk", "egg"],
  "hamburgers-dracula": ["gluten", "milk"],

  "combined-plates-plato-combinado": ["egg"],

  "menus-menu-kebab": ["gluten"],
  "menus-menu-kebab-falafel": ["gluten"],
  "menus-menu-shawarma": ["gluten"],
  "menus-menu-shawarma-falafel": ["gluten"],
  "menus-menu-platos-combinados": ["egg"],
  "menus-menu-combi-simple": [],
  "menus-menu-combi-simple-falafel": [],
  "menus-menu-combi-doble": [],
  "menus-menu-combi-doble-falafel": [],
  "menus-menu-deja-vu": [],
  "menus-menu-deja-vu-falafel": [],
  "menus-hamburguesa-simple": ["gluten", "milk"],
  "menus-hamburguesa-deja-vu-simple": ["gluten", "milk"],
  "menus-hamburguesa-rulo-de-cabra": ["gluten", "milk"],
  "menus-hamburguesa-deja-vu": ["gluten", "milk", "egg"],
  "menus-hamburguesa-deja-vu-deluxe": ["gluten", "milk", "egg"],
  "menus-hamburguesa-dracula": ["gluten", "milk"],

  "desserts-profiteroles": ["gluten", "milk", "egg"],
  "desserts-bola-de-helado": ["milk"],
  "desserts-tarta-de-queso": ["milk", "egg"],
  "desserts-milkshake": ["gluten", "milk"],

  "drinks-agua-500-ml": [],
  "drinks-agua-con-gas": [],
  "drinks-refresco": [],
  "drinks-copa-de-cerveza": ["gluten"],
  "drinks-tercio": ["gluten"],
  "drinks-jarra-de-cerveza": ["gluten"],
  "drinks-cerveza-especial": ["gluten"],
  "drinks-copa-de-vino": [],
  "drinks-botella-de-vino": [],
  "drinks-tinto-de-verano": [],
  "drinks-cafe": [],
  "drinks-infusiones": [],
  "drinks-latas-para-llevar": [],
};

for (const smoothieId of smoothieIds) {
  expectedAllergensByProductId[`desserts-${smoothieId}`] = [];
  expectedAllergensByProductId[`smoothies-${smoothieId}`] = [];
}

function getDeclaredAllergens(productId: string) {
  const product = menuProducts.find((entry) => entry.id === productId);

  expect(product, `Producto no encontrado: ${productId}`).toBeDefined();

  return (product?.allergens ?? []).filter((allergen) => allergen.level === "contains").map((allergen) => allergen.id);
}

describe("menu allergens", () => {
  it("keeps every visible product covered by the allergen audit", () => {
    const expectedIds = Object.keys(expectedAllergensByProductId).sort();
    const actualIds = menuProducts.map((product) => product.id).sort();

    expect(actualIds).toEqual(expectedIds);
  });

  it("matches the reviewed allergen expectations product by product", () => {
    for (const [productId, expectedAllergens] of Object.entries(expectedAllergensByProductId)) {
      const declaredAllergens = getDeclaredAllergens(productId);

      expect(declaredAllergens, `Alergenos inesperados en ${productId}`).toHaveLength(expectedAllergens.length);
      expect(declaredAllergens, `Alergenos incorrectos en ${productId}`).toEqual(expectedAllergens);
    }
  });
});
