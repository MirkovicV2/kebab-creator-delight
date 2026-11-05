import type { menuImageMap } from "./images";

export type MenuImageKey = keyof typeof menuImageMap;
export type AllergenId = "gluten" | "milk" | "egg" | "fish" | "sesame" | "soy" | "nuts" | "celery" | "mustard";
export type AllergenLevel = "contains" | "may-contain";

export interface MenuOption {
  id: string;
  name: string;
  price?: number;
  description?: string;
  default?: boolean;
}

export interface MenuModifierGroup {
  id: string;
  name: string;
  description: string;
  selectionType: "single" | "multiple";
  required?: boolean;
  minSelections?: number;
  maxSelections?: number;
  options: MenuOption[];
}

export interface MenuCategory {
  id: string;
  name: string;
  shortName: string;
  description: string;
  note: string;
  tone: "gold" | "ember" | "olive" | "sand" | "copper" | "stone";
}

export interface AllergenDefinition {
  id: AllergenId;
  name: string;
  shortName: string;
  description: string;
}

export interface MenuAllergen {
  id: AllergenId;
  level: AllergenLevel;
}

export interface MenuProduct {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  longDescription: string;
  price: number;
  priceLabel?: string;
  image: string | null;
  featured?: boolean;
  bestseller?: boolean;
  vegetarian?: boolean;
  spicy?: boolean;
  tags: string[];
  allergens: MenuAllergen[];
  prepTime: string;
  highlight: string;
  modifierGroups: MenuModifierGroup[];
}

export interface MenuProductDocument extends Omit<MenuProduct,
  "categoryId" | "image" | "longDescription" | "tags" | "allergens" | "modifierGroups"
> {
  imageKey: MenuImageKey | null;
  longDescription?: string;
  tags?: string[];
  allergens?: MenuAllergen[];
  modifierGroups?: string[];
}

export interface MenuDatabaseSeed {
  categories: (MenuCategory & { products: MenuProductDocument[] })[];
  modifiers: MenuModifierGroup[];
}
