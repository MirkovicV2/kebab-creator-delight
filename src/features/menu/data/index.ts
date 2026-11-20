import allergens from "./allergens.json";
import restaurantInfo from "./restaurant.json";
import type { AllergenDefinition } from "./types";

export type * from "./types";
export { restaurantInfo };
export { menuImageMap } from "./images";
export { getMenuProduct, getMenuProducts, menuCategories, menuDatabase, menuProducts } from "./database";

export const allergenDefinitions = allergens.definitions as AllergenDefinition[];
export const allergenDisclaimer = allergens.disclaimer;

export const restaurantPhones = [
  { label: "Móvil", number: restaurantInfo.mobilePhone, pattern: /^(\d{3})(\d{3})(\d{3})$/, format: "$1 $2 $3" },
  { label: "Fijo", number: restaurantInfo.phone, pattern: /^(\d{2})(\d{3})(\d{2})(\d{2})$/, format: "$1 $2 $3 $4" },
].filter(({ number }) => number).map(({ label, number, pattern, format }) => ({
  label,
  href: `tel:+34${number}`,
  display: number.replace(pattern, format),
}));

export const primaryRestaurantPhone = restaurantPhones[0];
