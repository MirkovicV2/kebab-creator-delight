export type OrderModeId = "pickup" | "delivery" | "dinein";
export type ModifierSelectionType = "single" | "multiple";
export type CategoryTone = "gold" | "ember" | "olive" | "sand" | "copper" | "stone";
export type AllergenId = "gluten" | "milk" | "egg" | "fish" | "sesame" | "soy" | "nuts" | "celery" | "mustard";
export type AllergenLevel = "contains" | "may-contain";
export type MenuImageKey =
  | "hero"
  | "kebab"
  | "menu-kebab"
  | "doner"
  | "shawarma"
  | "menu-shawarma"
  | "combi"
  | "lahmacun"
  | "falafel"
  | "adana"
  | "terrace"
  | "salad"
  | "salad-cesar"
  | "salad-rulo"
  | "salad-ventresca"
  | "salad-crispy-chicken"
  | "plate-deja-vu"
  | "combined-plate"
  | "wings"
  | "croquetas"
  | "fingers"
  | "oreja"
  | "patatas-bravas"
  | "patatas-locas"
  | "salchipapas"
  | "nuggets"
  | "huevos-rotos"
  | "burger"
  | "burger-simple"
  | "burger-deja-vu-simple"
  | "burger-deja-vu-deluxe"
  | "burger-dracula"
  | "burger-rulo"
  | "bocadillo"
  | "sandwich"
  | "rations"
  | "dessert"
  | "dessert-profiteroles"
  | "dessert-cheesecake"
  | "smoothies-header"
  | "smoothie-tropical-heaven"
  | "smoothie-caribbean-passion"
  | "smoothie-berries-paradise"
  | "smoothie-colada-jungle"
  | "smoothie-vitality"
  | "smoothie-red-bliss"
  | "smoothie-green-power"
  | "smoothie-sunny-splash"
  | "smoothie-dragon-fruit-mix"
  | "smoothie-squeeze-nature"
  | "smoothie-delightful"
  | "smoothie-blue-lightning"
  | "drinks"
  | "generic";

export interface RestaurantInfo {
  name: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  city: string;
  mapsQuery: string;
  website: string;
  instagramProfileUrl?: string;
  lightwidgetEmbedUrl?: string;
  openingHours: { day: string; time: string }[];
  serviceAreas: string[];
}

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
  selectionType: ModifierSelectionType;
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
  tone: CategoryTone;
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

export interface MenuProductSeed extends Omit<MenuProduct, "categoryId" | "image"> {
  imageKey: MenuImageKey | null;
}

export interface MenuCatalogCategory extends MenuCategory {
  products: MenuProductSeed[];
}

export interface OrderMode {
  id: OrderModeId;
  name: string;
  description: string;
  eta: string;
  note: string;
}

export interface ExperienceHighlight {
  title: string;
  description: string;
  value: string;
}

export interface OrderingStep {
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  quote: string;
  detail: string;
}
