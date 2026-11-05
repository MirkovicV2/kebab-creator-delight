import Loki from "lokijs";

import catalog from "./catalog.json";
import { menuImageMap } from "./images";
import type { MenuCategory, MenuDatabaseSeed, MenuProduct } from "./types";

// Published documents are the source of truth. Each visit uses the current
// catalog without a server or browser storage migrations.
export function createMenuDatabase(seed: MenuDatabaseSeed = catalog as MenuDatabaseSeed) {
  const documents = structuredClone(seed);
  const database = new Loki("deja-vu", { adapter: new Loki.LokiMemoryAdapter() });
  const categories = database.addCollection<MenuCategory>("categories", { unique: ["id"], disableMeta: true });
  const products = database.addCollection<MenuProduct>("products", {
    unique: ["id"], indices: ["categoryId"], disableMeta: true,
  });
  const modifiers = new Map(documents.modifiers.map((group) => [group.id, group]));

  for (const { products: productDocuments, ...category } of documents.categories) {
    categories.insert(category);
    for (const { imageKey, modifierGroups = [], ...document } of productDocuments) {
      if (imageKey && !menuImageMap[imageKey]) throw new Error(`Imagen desconocida: ${imageKey} (${document.id})`);
      products.insert({
        ...document,
        categoryId: category.id,
        image: imageKey ? menuImageMap[imageKey] : null,
        longDescription: document.longDescription ?? document.description,
        tags: document.tags ?? [],
        allergens: document.allergens ?? [],
        modifierGroups: modifierGroups.map((id) => {
          const group = modifiers.get(id);
          if (!group) throw new Error(`Grupo de opciones desconocido: ${id} (${document.id})`);
          return structuredClone(group);
        }),
      });
    }
  }

  // Loki queries may return index order; keep the menu's published order.
  const findProducts = (query: LokiQuery<MenuProduct>) => products.find(query).sort((a, b) => a.$loki - b.$loki);

  return {
    getCategories: () => categories.find(),
    getProducts: (categoryId?: string) => findProducts(categoryId ? { categoryId } : {}),
    getProduct: (id: string) => products.by("id", id) ?? undefined,
    getBestsellers: (limit = 7) => findProducts({ bestseller: true }).slice(0, limit),
  };
}

export const menuDatabase = createMenuDatabase();
export const menuCategories = menuDatabase.getCategories();
export const menuProducts = menuDatabase.getProducts();
export const getMenuProducts = menuDatabase.getProducts;
export const getMenuProduct = menuDatabase.getProduct;
