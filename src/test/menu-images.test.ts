import { describe, expect, it } from "vitest";

import { menuProducts } from "@/features/menu/data";

function getProduct(productId: string) {
  const product = menuProducts.find((entry) => entry.id === productId);

  expect(product, `Producto no encontrado: ${productId}`).toBeDefined();
  return product!;
}

describe("menu images", () => {
  it("reuses the normal kebab and shawarma photos for normal falafel wraps", () => {
    expect(getProduct("turkish-specialties-kebab-falafel").image).toBe(getProduct("turkish-specialties-kebab").image);
    expect(getProduct("turkish-specialties-shawarma-falafel").image).toBe(getProduct("turkish-specialties-shawarma").image);
  });

  it("reuses the menu kebab and shawarma photos for menu falafel wraps", () => {
    expect(getProduct("menus-menu-kebab-falafel").image).toBe(getProduct("menus-menu-kebab").image);
    expect(getProduct("menus-menu-shawarma-falafel").image).toBe(getProduct("menus-menu-shawarma").image);
  });

  it("uses no-fries photos on normal kebab and shawarma, and keeps fries photos for menus", () => {
    expect(getProduct("turkish-specialties-kebab").image).toContain("kebab-normal.png");
    expect(getProduct("turkish-specialties-shawarma").image).toContain("shawarma-normal.png");
    expect(getProduct("menus-menu-kebab").image).toContain("kebab.jpg");
    expect(getProduct("menus-menu-shawarma").image).toContain("shawarma.jpg");
    expect(getProduct("turkish-specialties-kebab").image).not.toBe(getProduct("menus-menu-kebab").image);
    expect(getProduct("turkish-specialties-shawarma").image).not.toBe(getProduct("menus-menu-shawarma").image);
  });

  it("removes the Deja Vu photo from falafel variants", () => {
    expect(getProduct("plates-plato-deja-vu").image).toBeTruthy();
    expect(getProduct("menus-menu-deja-vu").image).toBeTruthy();
    expect(getProduct("plates-plato-deja-vu-falafel").image).toBeNull();
    expect(getProduct("menus-menu-deja-vu-falafel").image).toBeNull();
  });

  it("uses the new combi photo on generic combi products", () => {
    expect(getProduct("plates-combi-simple").image).toContain("combi.png");
    expect(getProduct("plates-combi-doble").image).toContain("combi.png");
    expect(getProduct("menus-menu-combi-simple").image).toContain("combi.png");
    expect(getProduct("menus-menu-combi-doble").image).toContain("combi.png");
  });

  it("uses the falafel plate photo on combi falafel products", () => {
    expect(getProduct("plates-combi-simple-falafel").image).toContain("falafel.jpg");
    expect(getProduct("plates-combi-doble-falafel").image).toContain("falafel.jpg");
    expect(getProduct("menus-menu-combi-simple-falafel").image).toContain("falafel.jpg");
    expect(getProduct("menus-menu-combi-doble-falafel").image).toContain("falafel.jpg");
  });

  it("uses the patatas mixtas photo on the new ration", () => {
    expect(getProduct("rations-patatas-mixtas-bravas-o-alioli").image).toContain("patatas-bravas");
  });

  it("uses the specific Zumit photo on every smoothie", () => {
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

    for (const smoothieId of smoothieIds) {
      expect(getProduct(`smoothies-${smoothieId}`).image).toContain(`smoothie-${smoothieId}.png`);
    }
  });
});
