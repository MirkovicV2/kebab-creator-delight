import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import catalog from "@/features/menu/data/catalog.json";
import { createMenuDatabase } from "@/features/menu/data/database";
import { allergenDefinitions, getMenuProduct, getMenuProducts, menuCategories, menuDatabase, menuProducts } from "@/features/menu/data";
import type { MenuDatabaseSeed } from "@/features/menu/data";

describe("embedded menu database", () => {
  it("preserves the published category and product order when using indexed queries", () => {
    expect(menuProducts).toHaveLength(96);
    expect(menuCategories).toHaveLength(9);
    expect(menuCategories.map(({ id }) => id)).toEqual(catalog.categories.map(({ id }) => id));

    for (const category of catalog.categories) {
      expect(getMenuProducts(category.id).map(({ id }) => id)).toEqual(category.products.map(({ id }) => id));
    }
    expect(menuDatabase.getBestsellers().map(({ id }) => id)).toEqual(
      menuProducts.filter((product) => product.bestseller).slice(0, 7).map(({ id }) => id),
    );
  });

  it("returns empty results for unknown documents", () => {
    expect(getMenuProducts("missing-category")).toEqual([]);
    expect(getMenuProduct("missing-product")).toBeUndefined();
  });

  it("keeps all photo files, allergens and option references valid", () => {
    const allergenIds = new Set(allergenDefinitions.map(({ id }) => id));
    for (const product of menuProducts) {
      expect(product.image, product.id).not.toBeUndefined();
      expect(Number.isFinite(product.price) && product.price >= 0, product.id).toBe(true);
      expect(product.longDescription, product.id).toBeTruthy();
      if (product.image) {
        expect(existsSync(path.join(process.cwd(), "public", product.image.replace(import.meta.env.BASE_URL, ""))), product.id).toBe(true);
      }
      for (const allergen of product.allergens) expect(allergenIds.has(allergen.id), product.id).toBe(true);
      for (const group of product.modifierGroups) {
        expect(group.options.length, group.id).toBeGreaterThan(0);
        expect(new Set(group.options.map(({ id }) => id)).size, group.id).toBe(group.options.length);
      }
    }
  });

  it("rejects duplicate product identifiers and broken modifier references", () => {
    const duplicate = structuredClone(catalog) as MenuDatabaseSeed;
    duplicate.categories[0].products.push(duplicate.categories[0].products[0]);
    expect(() => createMenuDatabase(duplicate)).toThrow(/Duplicate key/);

    const broken = structuredClone(catalog) as MenuDatabaseSeed;
    broken.categories[0].products[0].modifierGroups = ["missing-modifier"];
    expect(() => createMenuDatabase(broken)).toThrow(/Grupo de opciones desconocido/);
  });

  it("starts from the published documents on every new visit", () => {
    const database = createMenuDatabase();
    const product = database.getProduct("turkish-specialties-kebab")!;
    product.price = 99;
    product.modifierGroups[0].options[0].name = "Changed";

    const fresh = createMenuDatabase().getProduct(product.id)!;
    expect(fresh.price).toBe(7);
    expect(fresh.modifierGroups[0].options[0].name).toBe("Pollo");
  });
});
