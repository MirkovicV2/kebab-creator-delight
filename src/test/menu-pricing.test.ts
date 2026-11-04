import { describe, expect, it } from "vitest";

import { menuCatalog, menuProducts } from "@/features/menu/data";
import { calculateSelectionPrice, getDefaultSelections } from "@/features/menu/lib/menu";

function getProduct(productId: string) {
  const product = menuProducts.find((item) => item.id === productId);

  expect(product, `No se encontro el producto ${productId}`).toBeDefined();
  return product!;
}

function getSelectedUnitPrice(productId: string, optionName: string) {
  const product = getProduct(productId);
  const selections = getDefaultSelections(product);
  const versionGroup = product.modifierGroups.find((group) => group.options.some((option) => option.name === optionName));

  expect(versionGroup, `No se encontro una opcion ${optionName} en ${productId}`).toBeDefined();

  const selectedOption = versionGroup!.options.find((option) => option.name === optionName);
  expect(selectedOption, `No se encontro la opcion ${optionName} en ${productId}`).toBeDefined();

  selections[versionGroup!.id] = [selectedOption!.id];

  return product.price + calculateSelectionPrice(product, selections);
}

describe("menu pricing", () => {
  it.each([
    ["turkish-specialties-kebab", "turkish-specialties-kebab-falafel", 6],
    ["turkish-specialties-shawarma", "turkish-specialties-shawarma-falafel", 7],
    ["plates-combi-simple", "plates-combi-simple-falafel", 8.2],
    ["plates-combi-doble", "plates-combi-doble-falafel", 11.5],
    ["plates-plato-deja-vu", "plates-plato-deja-vu-falafel", 11.5],
    ["menus-menu-kebab", "menus-menu-kebab-falafel", 10.5],
    ["menus-menu-shawarma", "menus-menu-shawarma-falafel", 10.5],
    ["menus-menu-combi-simple", "menus-menu-combi-simple-falafel", 10.2],
    ["menus-menu-combi-doble", "menus-menu-combi-doble-falafel", 11.5],
    ["menus-menu-deja-vu", "menus-menu-deja-vu-falafel", 13.5],
  ])(
    "keeps %s aligned with its falafel version",
    (groupedProductId: string, standaloneProductId: string, expectedPrice: number) => {
      const groupedProduct = getProduct(groupedProductId);
      const standaloneProduct = getProduct(standaloneProductId);

      expect(groupedProduct.priceLabel).toContain("Falafel");
      expect(getSelectedUnitPrice(groupedProductId, "Falafel")).toBeCloseTo(expectedPrice, 2);
      expect(standaloneProduct.price).toBeCloseTo(expectedPrice, 2);
    },
  );
  it("keeps menu platos combinados at 14,50", () => {
    expect(getProduct("menus-menu-platos-combinados").price).toBeCloseTo(14.5, 2);
  });

  it("sets every Zumit smoothie at 5,90", () => {
    const smoothieCategory = menuCatalog.find((category) => category.id === "smoothies");

    expect(smoothieCategory?.products).toHaveLength(12);

    for (const product of smoothieCategory!.products) {
      expect(product.price, product.id).toBeCloseTo(5.9, 2);
    }
  });

  it("sets the desserts milkshake at 5,90", () => {
    expect(getProduct("desserts-milkshake").price).toBeCloseTo(5.9, 2);
  });

  it("also shows every Zumit smoothie in desserts at 5,90", () => {
    const dessertsCategory = menuCatalog.find((category) => category.id === "desserts");
    const dessertSmoothies = dessertsCategory?.products.filter((product) => product.id.startsWith("desserts-") && product.imageKey?.startsWith("smoothie-"));

    expect(dessertSmoothies).toHaveLength(12);

    for (const product of dessertSmoothies!) {
      expect(product.price, product.id).toBeCloseTo(5.9, 2);
    }
  });

  it("shows fries as standalone portions and removes them from kebab extras", () => {
    const rationsCategory = menuCatalog.find((category) => category.id === "rations");

    expect(rationsCategory?.products.slice(0, 3).map((product) => product.id)).toEqual([
      "rations-patatas-mixtas-bravas-o-alioli",
      "rations-racion-de-patatas-fritas",
      "rations-media-racion-de-patatas-fritas",
    ]);

    for (const productId of ["turkish-specialties-kebab", "turkish-specialties-shawarma"]) {
      const product = getProduct(productId);
      const optionNames = product.modifierGroups.flatMap((group) => group.options.map((option) => option.name));

      expect(optionNames).not.toContain("Patatas mixtas, bravas o alioli");
    }

    for (const productId of [
      "rations-racion-de-patatas-fritas",
      "turkish-specialties-racion-de-patatas-fritas",
    ]) {
      expect(getProduct(productId).price).toBeCloseTo(5, 2);
    }

    for (const productId of [
      "rations-media-racion-de-patatas-fritas",
      "turkish-specialties-media-racion-de-patatas-fritas",
    ]) {
      expect(getProduct(productId).price).toBeCloseTo(2.5, 2);
    }
  });
});
