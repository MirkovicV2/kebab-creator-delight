import allergens from "./allergens.json";
import type { AllergenDefinition } from "./types";

export type * from "./types";
export { default as restaurantInfo } from "./restaurant.json";
export { menuImageMap } from "./images";
export { getMenuProduct, getMenuProducts, menuCategories, menuDatabase, menuProducts } from "./database";

export const allergenDefinitions = allergens.definitions as AllergenDefinition[];
export const allergenDisclaimer = allergens.disclaimer;
