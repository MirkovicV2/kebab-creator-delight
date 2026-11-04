import type {
  AllergenId,
  CategoryTone,
  ExperienceHighlight,
  MenuAllergen,
  MenuCatalogCategory,
  MenuCategory,
  MenuImageKey,
  MenuModifierGroup,
  MenuProduct,
  MenuProductSeed,
  OrderMode,
  OrderingStep,
  RestaurantInfo,
  Testimonial,
} from "./types";
import {
  bocadilloFillingGroup,
  burgerProteinChoiceGroup,
  combinedPlateChoiceGroup,
  combiDoubleProteinGroup,
  combiSimpleProteinGroup,
  dejaVuProteinGroup,
  drinkGroup,
  kebabProteinGroup,
  legacyBurgerExtrasGroup,
  legacyPlateExtrasGroup,
  legacyTurkishExtrasGroup,
  menuCombiDoubleProteinGroup,
  menuCombiSimpleProteinGroup,
  menuDejaVuProteinGroup,
  menuProteinGroup,
  menuImageMap,
  sauceGroup,
  shawarmaProteinGroup,
  sideGroup,
} from "./shared";

export const restaurantInfo: RestaurantInfo = {
  name: "Bar DejaVu Kebab",
  phone: "917139980",
  whatsappNumber: "34917139980",
  address: "C/ Manuela Malasana con C/ Margarita Xirgu",
  city: "28523 Rivas-Vaciamadrid, Madrid",
  mapsQuery: "Bar DejaVu Kebab Rivas",
  website: "https://bar-dejavu-kebab.es",
  instagramProfileUrl: "https://www.instagram.com/dejavu_rivas/",
  lightwidgetEmbedUrl: "https://cdn.lightwidget.com/widgets/1954159dde735905a0655fda1a8bbb1d.html",
  openingHours: [
    { day: "Lunes", time: "Cerrado" },
    { day: "Martes", time: "19:00 - 22:45" },
    { day: "Miercoles", time: "19:00 - 22:45" },
    { day: "Jueves", time: "12:15 - 16:00 / 19:00 - 22:45" },
    { day: "Viernes", time: "12:15 - 16:00 / 19:00 - 23:00" },
    { day: "Sabado", time: "12:15 - 16:00 / 19:00 - 23:00" },
    { day: "Domingo", time: "12:15 - 16:00 / 19:00 - 22:45" },
  ],
  serviceAreas: ["Rivas Centro", "Covibar", "La Luna", "Pablo Iglesias"],
};

interface LegacyItem {
  id: string;
  title: string;
  description: string;
  price: string;
  imageKey?: MenuImageKey;
  featured?: boolean;
  bestseller?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  tags?: string[];
}

interface LegacySection {
  title: string;
  description: string;
  items: LegacyItem[];
}

interface LegacyCategorySeed {
  id: string;
  name: string;
  shortName: string;
  description: string;
  note: string;
  tone: CategoryTone;
  imageKey: MenuImageKey;
  prepTime: string;
  mainText: string;
  sections: LegacySection[];
}

const allergenOrder: AllergenId[] = ["gluten", "milk", "egg", "fish", "sesame", "soy", "nuts", "celery", "mustard"];

const containsAllergens = (...ids: AllergenId[]): MenuAllergen[] =>
  allergenOrder
    .filter((candidate) => ids.includes(candidate))
    .map((id) => ({
      id,
      level: "contains",
    }));

const kebabAllergens = containsAllergens("gluten");
const burgerAllergens = containsAllergens("gluten", "milk");
const burgerWithEggAllergens = containsAllergens("gluten", "milk", "egg");
const bocadilloAllergens = containsAllergens("gluten");
const combinedPlateAllergens = containsAllergens("egg");
const friedSnackAllergens = containsAllergens("gluten");
const fingersAllergens = containsAllergens("gluten", "milk");
const croquetteAllergens = containsAllergens("gluten", "milk", "egg");
const pastryDessertAllergens = containsAllergens("gluten", "milk", "egg");
const cheesecakeAllergens = containsAllergens("milk", "egg");
const layeredCakeAllergens = containsAllergens("gluten", "milk");
const frozenDessertAllergens = containsAllergens("milk");
const cookiesMilkshakeAllergens = containsAllergens("gluten", "milk");
const beerAllergens = containsAllergens("gluten");

function parsePrice(value: string) {
  const normalized = value.replace("Desde", "").replace(/[€\s]/g, "").replace(",", ".");
  return Number.parseFloat(normalized);
}

function cleanSectionTitle(value: string) {
  return value.replace(/\s*\(.+\)\s*/g, "").trim();
}

function joinNaturalList(values: string[]) {
  if (values.length === 0) {
    return "";
  }

  if (values.length === 1) {
    return values[0];
  }

  if (values.length === 2) {
    return `${values[0]} y ${values[1]}`;
  }

  return `${values.slice(0, -1).join(", ")} y ${values[values.length - 1]}`;
}

function compactHighlightPart(value: string) {
  const normalized = value.replace(/\.$/, "").trim();

  const replacements: Array<[RegExp, string]> = [
    [/^carne fresca de pollo\b.*$/i, "Pollo"],
    [/^filetes de ternera\b.*$/i, "Ternera"],
    [/^carne mixta\b.*$/i, "Carne mixta"],
    [/^doble de carne fresca de pollo\b.*$/i, "Doble de pollo"],
    [/^doble de filetes de ternera\b.*$/i, "Doble de ternera"],
    [/^doble de carne mixta\b.*$/i, "Doble mixto"],
    [/^doble de falafel\b.*$/i, "Doble de falafel"],
    [/^falafel\b.*$/i, "Falafel"],
    [/^patatas fritas\b.*$/i, "Patatas fritas"],
    [/^mix de quesos\b.*$/i, "Queso"],
    [/^queso rallado\b.*$/i, "Queso rallado"],
    [/^bacon crujiente\b.*$/i, "Bacon"],
    [/^rulo de cabra\b.*$/i, "Rulo de cabra"],
    [/^crema de modena\b.*$/i, "Modena"],
    [/^salsa cesar\b.*$/i, "Salsa cesar"],
    [/^cebolla frita\b.*$/i, "Cebolla frita"],
    [/^cebolla caramelizada\b.*$/i, "Cebolla caramelizada"],
    [/^patatas o arroz\b.*$/i, "Patatas o arroz"],
    [/^patatas o ensalada\b.*$/i, "Patatas o ensalada"],
    [/^repollo\b.*$/i, "Repollo"],
    [/^lechuga\b.*$/i, "Lechuga"],
    [/^tomate\b.*$/i, "Tomate"],
    [/^maiz\b.*$/i, "Maiz"],
    [/^huevo\b.*$/i, "Huevo"],
    [/^queso\b.*$/i, "Queso"],
    [/^bacon\b.*$/i, "Bacon"],
    [/^pollo crujiente\b.*$/i, "Pollo crujiente"],
    [/^pulled pork\b.*$/i, "Pulled pork"],
    [/^jamon\b.*$/i, "Jamon"],
    [/^pepinillos\b.*$/i, "Pepinillos"],
  ];

  for (const [pattern, replacement] of replacements) {
    if (pattern.test(normalized)) {
      return replacement;
    }
  }

  if (normalized.includes(" y ")) {
    const firstClause = normalized.split(/\s+y\s+/)[0].trim();

    if (firstClause.length > 0 && firstClause.length <= 18) {
      return firstClause;
    }
  }

  return normalized
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .join(" ");
}

function buildCompactHighlight(description: string, maxLength = 46) {
  const cleaned = description.replace(/\.$/, "").trim();

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  const parts = cleaned
    .split(",")
    .map((part) => compactHighlightPart(part))
    .filter(Boolean);

  if (parts.length > 1) {
    const selectedParts: string[] = [];

    for (const part of parts) {
      const candidate = joinNaturalList([...selectedParts, part]);

      if (candidate.length > maxLength) {
        break;
      }

      selectedParts.push(part);
    }

    if (selectedParts.length > 0) {
      return joinNaturalList(selectedParts);
    }
  }

  const compactSingle = compactHighlightPart(cleaned);

  if (compactSingle.length <= maxLength) {
    return compactSingle;
  }

  return cleaned
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6)
    .join(" ");
}

function buildFallbackDescription(category: LegacyCategorySeed, item: LegacyItem) {
  switch (category.id) {
    case "rations":
      return item.title + " para compartir en mesa o pedir para llevar.";
    case "bocadillos":
      return "Bocadillo de " + item.title.toLowerCase() + " servido al momento.";
    case "combined-plates":
      return item.title + " acompanado de ensalada, patatas fritas y huevo.";
    case "desserts":
      return category.mainText || "Postre de la casa disponible segun el servicio del dia.";
    case "drinks":
      return "Bebida disponible para mesa, recogida o llevar.";
    default:
      return category.mainText || item.title + " dentro de la carta actual del local.";
  }
}

function buildDescription(category: LegacyCategorySeed, item: LegacyItem) {
  return item.description || buildFallbackDescription(category, item);
}

function buildLongDescription(category: LegacyCategorySeed, section: LegacySection, description: string) {
  const parts = [description];

  for (const extra of [section.description, category.mainText]) {
    if (extra && !parts.includes(extra)) {
      parts.push(extra);
    }
  }

  return parts.join(" ");
}

function inferVegetarian(categoryId: string, item: LegacyItem) {
  const text = (item.title + " " + item.description).toLowerCase();

  if (/falafel/.test(text)) {
    return true;
  }

  if (categoryId === "drinks" && /agua|refresco|cafe|vino|cerveza|tinto/.test(text)) {
    return false;
  }

  return false;
}

function inferTags(category: LegacyCategorySeed, section: LegacySection, item: LegacyItem) {
  const tags = [...(item.tags ?? [])];
  const sectionTitle = cleanSectionTitle(section.title);

  if (sectionTitle && sectionTitle !== category.name && sectionTitle !== category.shortName) {
    tags.push(sectionTitle);
  }

  switch (category.id) {
    case "salads":
      tags.push("Fresco");
      break;
    case "turkish-specialties":
      tags.push("Kebab turco");
      break;
    case "plates":
      tags.push("Plato completo");
      break;
    case "rations":
      tags.push("Para compartir");
      break;
    case "hamburgers":
      tags.push("Con patatas");
      break;
    case "bocadillos":
      tags.push("Clasico");
      break;
    case "combined-plates":
      tags.push("Con huevo");
      break;
    case "menus":
      tags.push("Menu");
      break;
    case "desserts":
      tags.push("Postre");
      break;
    case "smoothies":
      tags.push("Natural");
      break;
    case "drinks":
      tags.push("Bebida");
      break;
    default:
      break;
  }

  if (item.price.startsWith("Desde")) {
    tags.push("Desde");
  }

  if (/(1\/2|media)\s*racion/i.test(item.title)) {
    tags.push("Media racion");
  }

  if (/falafel/i.test(item.title + " " + item.description)) {
    tags.push("Vegetariano");
  }

  if (item.featured) {
    tags.push("Destacado");
  }

  if (item.bestseller) {
    tags.push("Muy pedido");
  }

  return [...new Set(tags)].slice(0, 4);
}

function buildHighlight(category: LegacyCategorySeed, section: LegacySection, item: LegacyItem, description: string) {
  const sectionTitle = cleanSectionTitle(section.title);

  if (category.id === "menus" && sectionTitle) {
    return sectionTitle;
  }

  if (category.id === "desserts" && sectionTitle) {
    return sectionTitle;
  }

  return buildCompactHighlight(description);
}

function inferModifierGroups(category: LegacyCategorySeed, section: LegacySection, item: LegacyItem): MenuModifierGroup[] {
  const sectionTitle = cleanSectionTitle(section.title);

  if (/^(racion|media racion) de patatas fritas$/i.test(item.title)) {
    return [];
  }

  if (category.id === "turkish-specialties") {
    return [sauceGroup, legacyTurkishExtrasGroup];
  }

  if (category.id === "plates") {
    return [sideGroup, sauceGroup, legacyPlateExtrasGroup];
  }

  if (category.id === "hamburgers") {
    return [legacyBurgerExtrasGroup];
  }

  if (category.id === "rations" && /patatas|papas|salchipapas|huevos/i.test(item.title)) {
    return [sauceGroup];
  }

  if (category.id === "menus") {
    if (sectionTitle === "Menus Combi") {
      return [sideGroup, drinkGroup, sauceGroup];
    }

    if (sectionTitle === "Menus Kebabs" || sectionTitle === "Menus Shawarma") {
      return [drinkGroup, sauceGroup];
    }

    return [drinkGroup];
  }

  return [];
}

function inferAllergens(category: LegacyCategorySeed, item: LegacyItem): MenuAllergen[] {
  const text = (item.title + " " + item.description).toLowerCase();

  switch (category.id) {
    case "salads": {
      const contains = new Set<AllergenId>();

      if (/queso|rulo de cabra|mix de quesos/.test(text)) {
        contains.add("milk");
      }

      if (/salsa cesar|cesar/.test(text)) {
        contains.add("egg");
      }

      if (/ventresca|atun|anchoa/.test(text)) {
        contains.add("fish");
      }

      if (/picatostes|pollo crujiente|cebolla frita/.test(text)) {
        contains.add("gluten");
      }

      return containsAllergens(...Array.from(contains));
    }
    case "turkish-specialties":
      return kebabAllergens;
    case "plates":
      return [];
    case "rations":
      if (/alioli/.test(text)) {
        return containsAllergens("egg");
      }

      if (/croquetas/.test(text)) {
        return croquetteAllergens;
      }

      if (/fingers/.test(text)) {
        return /queso/.test(text) ? fingersAllergens : friedSnackAllergens;
      }

      if (/nuggets/.test(text)) {
        return friedSnackAllergens;
      }

      if (/huevos/.test(text)) {
        return combinedPlateAllergens;
      }

      if (/papas locas/.test(text)) {
        return containsAllergens("milk");
      }

      return [];
    case "hamburgers":
      return /\bhuevo\b/.test(text) ? burgerWithEggAllergens : burgerAllergens;
    case "bocadillos":
      return bocadilloAllergens;
    case "combined-plates":
      return combinedPlateAllergens;
    case "menus":
      if (/hamburguesa/.test(text)) {
        return /\bhuevo\b/.test(text) ? burgerWithEggAllergens : burgerAllergens;
      }

      if (/kebab|shawarma/.test(text)) {
        return kebabAllergens;
      }

      return [];
    case "desserts":
      if (/milkshake|batido/.test(text)) {
        return /cookies/.test(text) ? cookiesMilkshakeAllergens : frozenDessertAllergens;
      }

      if (/helado/.test(text)) {
        return frozenDessertAllergens;
      }

      if (/smoothie/.test(text) || item.imageKey?.startsWith("smoothie-")) {
        return [];
      }

      if (/tarta de queso/.test(text)) {
        return cheesecakeAllergens;
      }

      if (/tarta de la abuela|milhojas/.test(text)) {
        return layeredCakeAllergens;
      }

      if (/profiteroles/.test(text)) {
        return pastryDessertAllergens;
      }

      return pastryDessertAllergens;
    case "drinks":
      return /copa de cerveza|jarra de cerveza|cerveza especial|tercio/.test(text) ? beerAllergens : [];
    default:
      return [];
  }
}

function buildLegacyProduct(category: LegacyCategorySeed, section: LegacySection, item: LegacyItem): MenuProductSeed {
  const description = buildDescription(category, item);
  const vegetarian = item.vegetarian ?? inferVegetarian(category.id, item);

  return {
    id: category.id + "-" + item.id,
    name: item.title,
    description,
    longDescription: buildLongDescription(category, section, description),
    price: parsePrice(item.price),
    imageKey: item.imageKey ?? category.imageKey,
    featured: item.featured,
    bestseller: item.bestseller,
    vegetarian: vegetarian || undefined,
    spicy: item.spicy,
    tags: inferTags(category, section, item),
    allergens: inferAllergens(category, item),
    prepTime: category.prepTime,
    highlight: buildHighlight(category, section, item, description),
    modifierGroups: inferModifierGroups(category, section, item),
  };
}

const zumitSmoothieItems: LegacyItem[] = [
  {
    "id": "tropical-heaven",
    "title": "Tropical Heaven",
    "description": "Melon, mango, kiwi y pina.",
    "price": "5,90 EUR",
    "imageKey": "smoothie-tropical-heaven",
    "vegetarian": true,
    "tags": [
      "Hecho al momento"
    ],
    "featured": true
  },
  {
    "id": "caribbean-passion",
    "title": "Caribbean Passion",
    "description": "Mango, papaya y pina.",
    "price": "5,90 EUR",
    "imageKey": "smoothie-caribbean-passion",
    "vegetarian": true,
    "tags": [
      "Hecho al momento"
    ],
    "bestseller": true
  },
  {
    "id": "berries-paradise",
    "title": "Berries Paradise",
    "description": "Mango, cereza, arandano y fresa.",
    "price": "5,90 EUR",
    "imageKey": "smoothie-berries-paradise",
    "vegetarian": true,
    "tags": [
      "Hecho al momento"
    ]
  },
  {
    "id": "colada-jungle",
    "title": "Colada Jungle",
    "description": "Platano, coco y pina.",
    "price": "5,90 EUR",
    "imageKey": "smoothie-colada-jungle",
    "vegetarian": true,
    "tags": [
      "Hecho al momento"
    ]
  },
  {
    "id": "vitality",
    "title": "Vitality",
    "description": "Platano y fresa.",
    "price": "5,90 EUR",
    "imageKey": "smoothie-vitality",
    "vegetarian": true,
    "tags": [
      "Hecho al momento"
    ]
  },
  {
    "id": "red-bliss",
    "title": "Red Bliss",
    "description": "Platano, arandano y frambuesa.",
    "price": "5,90 EUR",
    "imageKey": "smoothie-red-bliss",
    "vegetarian": true,
    "tags": [
      "Hecho al momento"
    ]
  },
  {
    "id": "green-power",
    "title": "Green Power",
    "description": "Pepino, col rizada, pina y espinaca.",
    "price": "5,90 EUR",
    "imageKey": "smoothie-green-power",
    "vegetarian": true,
    "tags": [
      "Hecho al momento"
    ]
  },
  {
    "id": "sunny-splash",
    "title": "Sunny Splash",
    "description": "Mango, limon, pina y fruta de la pasion.",
    "price": "5,90 EUR",
    "imageKey": "smoothie-sunny-splash",
    "vegetarian": true,
    "tags": [
      "Hecho al momento"
    ]
  },
  {
    "id": "dragon-fruit-mix",
    "title": "Dragon Fruit Mix",
    "description": "Mango, fresa y pitaya.",
    "price": "5,90 EUR",
    "imageKey": "smoothie-dragon-fruit-mix",
    "vegetarian": true,
    "tags": [
      "Hecho al momento"
    ]
  },
  {
    "id": "squeeze-nature",
    "title": "Squeeze Nature",
    "description": "Mango, zanahoria, pina y fruta de la pasion.",
    "price": "5,90 EUR",
    "imageKey": "smoothie-squeeze-nature",
    "vegetarian": true,
    "tags": [
      "Hecho al momento"
    ]
  },
  {
    "id": "delightful",
    "title": "Delightful",
    "description": "Platano, arandano, mango y acai.",
    "price": "5,90 EUR",
    "imageKey": "smoothie-delightful",
    "vegetarian": true,
    "tags": [
      "Hecho al momento"
    ]
  },
  {
    "id": "blue-lightning",
    "title": "Blue Lightning",
    "description": "Mango, platano, pina, melocoton, coco y espirulina azul.",
    "price": "5,90 EUR",
    "imageKey": "smoothie-blue-lightning",
    "vegetarian": true,
    "tags": [
      "Hecho al momento"
    ]
  }
];

const legacyMenuCatalog: LegacyCategorySeed[] = [
  {
    "id": "salads",
    "name": "Ensaladas",
    "shortName": "Ensaladas",
    "description": "Ensaladas completas con pollo, ventresca, queso y alinos clasicos.",
    "note": "Frescas",
    "tone": "olive",
    "imageKey": "salad",
    "prepTime": "8 min",
    "mainText": "",
    "sections": [
      {
        "title": "",
        "description": "",
        "items": [
          {
            "id": "ensalada-cesar",
            "title": "Ensalada Cesar",
            "description": "Lechuga, pollo, maiz, queso rallado, tomate, picatostes y salsa cesar.",
            "price": "12,90 €",
            "imageKey": "salad-cesar"
          },
          {
            "id": "ensalada-rulo-de-cabra",
            "title": "Ensalada Rulo de Cabra",
            "description": "Lechuga, tomate, rulo de cabra, bacon crujiente, cebolla frita y crema de modena.",
            "price": "12,90 €",
            "imageKey": "salad-rulo"
          },
          {
            "id": "ensalada-ventresca",
            "title": "Ensalada Ventresca",
            "description": "Ventresca de atun, lechuga, pimientos asados y tomate.",
            "price": "12,90 €",
            "imageKey": "salad-ventresca"
          },
          {
            "id": "ensalada-de-pollo-crujiente",
            "title": "Ensalada de Pollo Crujiente",
            "description": "Lechuga, tomate, maiz, pollo crujiente, mix de quesos, cebolla frita y crema de modena.",
            "price": "12,90 €",
            "imageKey": "salad-crispy-chicken"
          }
        ]
      }
    ]
  },
  {
    "id": "turkish-specialties",
    "name": "Las Turcas",
    "shortName": "Turcas",
    "description": "Kebabs, shawarmas y platos turcos con pollo, ternera, mixto o falafel.",
    "note": "Kebab, shawarma y platos",
    "tone": "gold",
    "imageKey": "doner",
    "prepTime": "12 min",
    "mainText": "",
    "sections": [
      {
        "title": "",
        "description": "",
        "items": [
          {
            "id": "kebab-de-pollo",
            "title": "Kebab de pollo",
            "description": "Carne fresca de pollo con ensalada de repollo, tomate y cebolla, y salsas.",
            "price": "7,00 €",
            "featured": true,
            "bestseller": true
          },
          {
            "id": "kebab-de-ternera",
            "title": "Kebab de ternera",
            "description": "Filetes de ternera 100% vacuno con ensalada de repollo, tomate y cebolla, y salsas.",
            "price": "8,50 €"
          },
          {
            "id": "kebab-mixto",
            "title": "Kebab mixto",
            "description": "Carne mixta con ensalada de repollo, tomate y cebolla, y salsas.",
            "price": "7,50 €",
            "featured": true
          },
          {
            "id": "kebab-de-falafel",
            "title": "Kebab de falafel",
            "description": "3 unidades con ensalada de repollo, tomate y cebolla, y salsas.",
            "price": "6,00 €",
            "vegetarian": true
          },
          {
            "id": "shawarma-de-pollo",
            "title": "Shawarma de pollo",
            "description": "Carne fresca de pollo con ensalada de repollo, tomate y cebolla, y salsas.",
            "price": "7,00 €"
          },
          {
            "id": "shawarma-de-ternera",
            "title": "Shawarma de ternera",
            "description": "Filetes de ternera 100% vacuno con ensalada de repollo, tomate y cebolla, y salsas.",
            "price": "8,50 €"
          },
          {
            "id": "shawarma-mixto",
            "title": "Shawarma mixto",
            "description": "Carne mixta con ensalada de repollo, tomate y cebolla, y salsas.",
            "price": "7,50 €"
          },
          {
            "id": "shawarma-de-falafel",
            "title": "Shawarma de falafel",
            "description": "4 unidades con ensalada de repollo, tomate y cebolla, y salsas.",
            "price": "7,00 €",
            "vegetarian": true
          },
          {
            "id": "racion-de-patatas-fritas",
            "title": "Racion de patatas fritas",
            "description": "Racion de patatas fritas.",
            "price": "5,00",
            "imageKey": "patatas-bravas"
          },
          {
            "id": "media-racion-de-patatas-fritas",
            "title": "Media racion de patatas fritas",
            "description": "Media racion de patatas fritas.",
            "price": "2,50",
            "imageKey": "patatas-bravas",
            "tags": [
              "Media racion"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "plates",
    "name": "Platos",
    "shortName": "Platos",
    "description": "Platos combi y platos Deja Vu con arroz, patatas o ensalada.",
    "note": "Con guarnicion",
    "tone": "ember",
    "imageKey": "hero",
    "prepTime": "14 min",
    "mainText": "Nuestros platos no incluyen pan.",
    "sections": [
      {
        "title": "",
        "description": "",
        "items": [
          {
            "id": "combi-simple-de-pollo",
            "title": "Combi simple de pollo",
            "description": "Carne fresca de pollo acompanada a elegir entre arroz, patatas o ensalada.",
            "price": "9,50 €"
          },
          {
            "id": "combi-simple-de-ternera",
            "title": "Combi simple de ternera",
            "description": "Filetes de ternera 100% vacuno acompanados a elegir entre arroz, patatas o ensalada.",
            "price": "11,50 €"
          },
          {
            "id": "combi-simple-mixto",
            "title": "Combi simple mixto",
            "description": "Carne mixta acompanada a elegir entre arroz, patatas o ensalada.",
            "price": "10,00 €"
          },
          {
            "id": "combi-simple-de-falafel",
            "title": "Combi simple de falafel",
            "description": "Falafel acompanado a elegir entre arroz, patatas o ensalada.",
            "price": "8,20 €",
            "vegetarian": true
          },
          {
            "id": "combi-doble-de-pollo",
            "title": "Combi doble de pollo",
            "description": "Doble de carne fresca de pollo acompanada a elegir entre arroz, patatas o ensalada.",
            "price": "11,50 €"
          },
          {
            "id": "combi-doble-de-ternera",
            "title": "Combi doble de ternera",
            "description": "Doble de filetes de ternera 100% vacuno acompanados a elegir entre arroz, patatas o ensalada.",
            "price": "13,50 €"
          },
          {
            "id": "combi-doble-mixto",
            "title": "Combi doble mixto",
            "description": "Doble de carne mixta acompanada a elegir entre arroz, patatas o ensalada.",
            "price": "12,00 €"
          },
          {
            "id": "combi-doble-de-falafel",
            "title": "Combi doble de falafel",
            "description": "Doble de falafel acompanado a elegir entre arroz, patatas o ensalada.",
            "price": "11,50 €",
            "vegetarian": true
          },
          {
            "id": "plato-deja-vu-de-pollo",
            "title": "Plato Deja Vu de pollo",
            "description": "Carne fresca de pollo, patatas o arroz, repollo, tomate, cebolla y salsas.",
            "price": "13,00 €"
          },
          {
            "id": "plato-deja-vu-de-ternera",
            "title": "Plato Deja Vu de ternera",
            "description": "Filetes de ternera 100% vacuno, patatas o arroz, repollo, tomate, cebolla y salsas.",
            "price": "15,50 €"
          },
          {
            "id": "plato-deja-vu-mixto",
            "title": "Plato Deja Vu mixto",
            "description": "Carne mixta, patatas o arroz, repollo, tomate, cebolla y salsas.",
            "price": "14,00 €",
            "featured": true,
            "bestseller": true
          },
          {
            "id": "plato-deja-vu-de-falafel",
            "title": "Plato Deja Vu de falafel",
            "description": "Falafel, patatas o arroz, repollo, tomate, cebolla y salsas.",
            "price": "11,50 €",
            "vegetarian": true
          }
        ]
      }
    ]
  },
  {
    "id": "rations",
    "name": "Raciones",
    "shortName": "Raciones",
    "description": "Patatas, alitas, croquetas, fingers y otras raciones del bar.",
    "note": "Para compartir",
    "tone": "sand",
    "imageKey": "rations",
    "prepTime": "11 min",
    "mainText": "",
    "sections": [
      {
        "title": "",
        "description": "",
        "items": [
          {
            "id": "patatas-mixtas-bravas-o-alioli",
            "title": "Patatas mixtas, bravas o alioli",
            "description": "Racion de patatas mixtas, bravas o alioli.",
            "price": "8,90 €",
            "imageKey": "patatas-bravas"
          },
          {
            "id": "racion-de-patatas-fritas",
            "title": "Racion de patatas fritas",
            "description": "Racion de patatas fritas.",
            "price": "5,00",
            "imageKey": "patatas-bravas"
          },
          {
            "id": "media-racion-de-patatas-fritas",
            "title": "Media racion de patatas fritas",
            "description": "Media racion de patatas fritas.",
            "price": "2,50",
            "imageKey": "patatas-bravas",
            "tags": [
              "Media racion"
            ]
          },
          {
            "id": "salchipapas",
            "title": "Salchipapas",
            "description": "",
            "price": "10,50 €",
            "imageKey": "salchipapas",
            "bestseller": true
          },
          {
            "id": "papas-locas",
            "title": "Papas Locas",
            "description": "Patatas fritas con filetes de pollo, bacon, mezcla de queso rallado, salsa cheddar y ketchup.",
            "price": "16,50 €",
            "imageKey": "patatas-locas",
            "bestseller": true
          },
          {
            "id": "alitas-de-pollo",
            "title": "Alitas de Pollo",
            "description": "",
            "price": "11,90 €",
            "imageKey": "wings"
          },
          {
            "id": "nuggets",
            "title": "Nuggets",
            "description": "",
            "price": "9,90 €",
            "imageKey": "nuggets",
            "bestseller": true
          },
          {
            "id": "nuggets-1-2-racion",
            "title": "Nuggets 1/2 racion",
            "description": "",
            "price": "5,50 €",
            "imageKey": "nuggets"
          },
          {
            "id": "croquetas-de-jamon",
            "title": "Croquetas de Jamon",
            "description": "",
            "price": "12,00 €",
            "imageKey": "croquetas"
          },
          {
            "id": "croquetas-de-jamon-1-2-racion",
            "title": "Croquetas de Jamon 1/2 racion",
            "description": "",
            "price": "7,00 €",
            "imageKey": "croquetas"
          },
          {
            "id": "fingers",
            "title": "Fingers",
            "description": "Pollo o queso",
            "price": "11,70 €",
            "imageKey": "fingers",
            "bestseller": true
          },
          {
            "id": "fingers-1-2-racion",
            "title": "Fingers 1/2 racion",
            "description": "Pollo o queso",
            "price": "6,50 €",
            "imageKey": "fingers"
          },
          {
            "id": "huevos-rotos",
            "title": "Huevos Rotos",
            "description": "Jamon o bacon",
            "price": "15,50 €",
            "imageKey": "huevos-rotos"
          },
          {
            "id": "huevos-rotos-1-2-racion",
            "title": "Huevos Rotos 1/2 racion",
            "description": "Jamon o bacon",
            "price": "9,00 €",
            "imageKey": "huevos-rotos"
          },
          {
            "id": "oreja-a-la-plancha",
            "title": "Oreja a la Plancha",
            "description": "",
            "price": "12,90 €",
            "imageKey": "oreja",
            "bestseller": true
          }
        ]
      }
    ]
  },
  {
    "id": "hamburgers",
    "name": "Hamburguesas",
    "shortName": "Burgers",
    "description": "Hamburguesas con patatas fritas, en formato clasico o mas cargado.",
    "note": "Con patatas",
    "tone": "copper",
    "imageKey": "burger",
    "prepTime": "14 min",
    "mainText": "Todas nuestras hamburguesas pueden ser de ternera o pollo crunchy y van acompanadas de patatas fritas.",
    "sections": [
      {
        "title": "",
        "description": "",
        "items": [
          {
            "id": "simple",
            "title": "Simple",
            "description": "Carne y queso.",
            "price": "10,00 €",
            "imageKey": "burger-simple"
          },
          {
            "id": "deja-vu-simple",
            "title": "Deja Vu Simple",
            "description": "Carne, queso, lechuga, tomate, cebolla y bacon.",
            "price": "12,50 €",
            "imageKey": "burger-deja-vu-simple"
          },
          {
            "id": "rulo-de-cabra",
            "title": "Rulo de Cabra",
            "description": "Carne, queso de cabra, bacon y cebolla frita.",
            "price": "12,50 €",
            "imageKey": "burger-rulo"
          },
          {
            "id": "deja-vu",
            "title": "Deja Vu",
            "description": "Carne, queso, bacon, huevo, lechuga, tomate y cebolla.",
            "price": "12,90 €",
            "imageKey": "burger-deja-vu-simple",
            "featured": true,
            "bestseller": true
          },
          {
            "id": "deja-vu-deluxe",
            "title": "Deja Vu Deluxe",
            "description": "Carne, queso, bacon, huevo, cebolla caramelizada y pepinillos (sin verduras).",
            "price": "12,90 €",
            "imageKey": "burger-deja-vu-deluxe"
          },
          {
            "id": "dracula",
            "title": "Dracula",
            "description": "Doble de carne, doble de queso, cebolla caramelizada, pepinillos y bacon (sin verduras).",
            "price": "14,50 €",
            "imageKey": "burger-dracula"
          }
        ]
      }
    ]
  },
  {
    "id": "bocadillos",
    "name": "Bocadillos",
    "shortName": "Bocadillos",
    "description": "Bocadillos sencillos para una comida rapida o un picoteo.",
    "note": "Clasicos",
    "tone": "stone",
    "imageKey": "sandwich",
    "prepTime": "7 min",
    "mainText": "",
    "sections": [
      {
        "title": "",
        "description": "",
        "items": [
          {
            "id": "cinta-de-lomo",
            "title": "Cinta de Lomo",
            "description": "",
            "price": "6,90 €"
          },
          {
            "id": "jamon-con-tomate",
            "title": "Jamon con Tomate",
            "description": "",
            "price": "6,90 €"
          },
          {
            "id": "bacon",
            "title": "Bacon",
            "description": "",
            "price": "6,90 €"
          },
          {
            "id": "panceta",
            "title": "Panceta",
            "description": "",
            "price": "6,90 €"
          },
          {
            "id": "pollo",
            "title": "Pollo",
            "description": "",
            "price": "6,90 €"
          }
        ]
      }
    ]
  },
  {
    "id": "combined-plates",
    "name": "Platos combinados",
    "shortName": "Combinados",
    "description": "Platos combinados servidos con ensalada, patatas fritas y huevo.",
    "note": "Huevo y patatas",
    "tone": "ember",
    "imageKey": "hero",
    "prepTime": "13 min",
    "mainText": "Todos nuestros platos combinados van acompanados de ensalada, patatas fritas y huevo.",
    "sections": [
      {
        "title": "",
        "description": "",
        "items": [
          {
            "id": "cinta-de-lomo",
            "title": "Cinta de Lomo",
            "description": "",
            "price": "12,50 €"
          },
          {
            "id": "pollo-a-la-plancha",
            "title": "Pollo a la plancha",
            "description": "",
            "price": "12,50 €"
          },
          {
            "id": "bacon",
            "title": "Bacon",
            "description": "",
            "price": "12,50 €"
          },
          {
            "id": "panceta",
            "title": "Panceta",
            "description": "",
            "price": "12,50 €"
          },
          {
            "id": "menu-platos-combinados",
            "title": "Menu platos combinados",
            "description": "",
            "price": "14,50 €"
          }
        ]
      }
    ]
  },
  {
    "id": "menus",
    "name": "Menus",
    "shortName": "Menus",
    "description": "Menus completos con kebab, shawarma, combi o hamburguesa, mas patatas y bebida.",
    "note": "Recoger o enviar",
    "tone": "gold",
    "imageKey": "generic",
    "prepTime": "15 min",
    "mainText": "Los menus son para recoger y a domicilio. En local, solo se sirven en horario de comida.",
    "sections": [
      {
        "title": "Menus Kebabs",
        "description": "",
        "items": [
          {
            "id": "menu-kebab-de-pollo",
            "title": "Menu Kebab de pollo",
            "description": "Kebab de pollo con ensalada de repollo, tomate y cebolla, salsas, patatas fritas y refresco o cerveza.",
            "price": "11,50 €"
          },
          {
            "id": "menu-kebab-de-ternera",
            "title": "Menu Kebab de ternera",
            "description": "Kebab de ternera con ensalada de repollo, tomate y cebolla, salsas, patatas fritas y refresco o cerveza.",
            "price": "13,00 €"
          },
          {
            "id": "menu-kebab-mixto",
            "title": "Menu Kebab mixto",
            "description": "Kebab mixto con ensalada de repollo, tomate y cebolla, salsas, patatas fritas y refresco o cerveza.",
            "price": "12,00 €",
            "bestseller": true
          },
          {
            "id": "menu-kebab-de-falafel",
            "title": "Menu Kebab de falafel",
            "description": "Kebab de falafel con ensalada de repollo, tomate y cebolla, salsas, patatas fritas y refresco o cerveza.",
            "price": "10,50 €",
            "vegetarian": true
          }
        ]
      },
      {
        "title": "Menus Shawarma",
        "description": "",
        "items": [
          {
            "id": "menu-shawarma-de-pollo",
            "title": "Menu Shawarma de pollo",
            "description": "Shawarma de pollo con ensalada de repollo, tomate y cebolla, salsas, patatas fritas y refresco o cerveza.",
            "price": "11,50 €"
          },
          {
            "id": "menu-shawarma-de-ternera",
            "title": "Menu Shawarma de ternera",
            "description": "Shawarma de ternera con ensalada de repollo, tomate y cebolla, salsas, patatas fritas y refresco o cerveza.",
            "price": "13,00 €"
          },
          {
            "id": "menu-shawarma-mixto",
            "title": "Menu Shawarma mixto",
            "description": "Shawarma mixto con ensalada de repollo, tomate y cebolla, salsas, patatas fritas y refresco o cerveza.",
            "price": "12,00 €"
          },
          {
            "id": "menu-shawarma-de-falafel",
            "title": "Menu Shawarma de falafel",
            "description": "Shawarma de falafel con ensalada de repollo, tomate y cebolla, salsas, patatas fritas y refresco o cerveza.",
            "price": "10,50 €",
            "vegetarian": true
          }
        ]
      },
      {
        "title": "Menus Combi",
        "description": "",
        "items": [
          {
            "id": "menu-combi-simple-de-pollo",
            "title": "Menu Combi simple de pollo",
            "description": "Plato combi simple de pollo con patatas o arroz o ensalada, salsas y refresco o cerveza.",
            "price": "11,50 €"
          },
          {
            "id": "menu-combi-simple-de-ternera",
            "title": "Menu Combi simple de ternera",
            "description": "Plato combi simple de ternera con patatas o arroz o ensalada, salsas y refresco o cerveza.",
            "price": "13,50 €"
          },
          {
            "id": "menu-combi-simple-mixto",
            "title": "Menu Combi simple mixto",
            "description": "Plato combi simple mixto con patatas o arroz o ensalada, salsas y refresco o cerveza.",
            "price": "12,00 €"
          },
          {
            "id": "menu-combi-simple-de-falafel",
            "title": "Menu Combi simple de falafel",
            "description": "Plato combi simple de falafel con patatas o arroz o ensalada, salsas y refresco o cerveza.",
            "price": "10,20 €",
            "vegetarian": true
          },
          {
            "id": "menu-combi-doble-de-pollo",
            "title": "Menu Combi doble de pollo",
            "description": "Plato combi doble de pollo con patatas o arroz o ensalada, salsas y refresco o cerveza.",
            "price": "13,50 €"
          },
          {
            "id": "menu-combi-doble-de-ternera",
            "title": "Menu Combi doble de ternera",
            "description": "Plato combi doble de ternera con patatas o arroz o ensalada, salsas y refresco o cerveza.",
            "price": "15,50 €"
          },
          {
            "id": "menu-combi-doble-mixto",
            "title": "Menu Combi doble mixto",
            "description": "Plato combi doble mixto con patatas o arroz o ensalada, salsas y refresco o cerveza.",
            "price": "14,00 €"
          },
          {
            "id": "menu-combi-doble-de-falafel",
            "title": "Menu Combi doble de falafel",
            "description": "Plato combi doble de falafel con patatas o arroz o ensalada, salsas y refresco o cerveza.",
            "price": "11,50 €",
            "vegetarian": true
          },
          {
            "id": "menu-deja-vu-de-pollo",
            "title": "Menu Deja Vu de pollo",
            "description": "Plato Deja Vu de pollo con patatas o arroz, repollo, tomate, cebolla, salsas y refresco o cerveza.",
            "price": "15,50 €"
          },
          {
            "id": "menu-deja-vu-de-ternera",
            "title": "Menu Deja Vu de ternera",
            "description": "Plato Deja Vu de ternera con patatas o arroz, repollo, tomate, cebolla, salsas y refresco o cerveza.",
            "price": "17,50 €"
          },
          {
            "id": "menu-deja-vu-mixto",
            "title": "Menu Deja Vu mixto",
            "description": "Plato Deja Vu mixto con patatas o arroz, repollo, tomate, cebolla, salsas y refresco o cerveza.",
            "price": "16,00 €"
          },
          {
            "id": "menu-deja-vu-de-falafel",
            "title": "Menu Deja Vu de falafel",
            "description": "Plato Deja Vu de falafel con patatas o arroz, repollo, tomate, cebolla, salsas y refresco o cerveza.",
            "price": "13,50 €",
            "vegetarian": true
          }
        ]
      },
      {
        "title": "Menus Hamburguesas",
        "description": "(Hamburguesa + Patatas + Bebida)",
        "items": [
          {
            "id": "hamburguesa-simple",
            "title": "Hamburguesa Simple",
            "description": "Carne y queso con patatas fritas y refresco o cerveza.",
            "price": "12,00 €",
            "imageKey": "burger-simple"
          },
          {
            "id": "hamburguesa-deja-vu-simple",
            "title": "Hamburguesa Deja Vu Simple",
            "description": "Carne, queso, lechuga, tomate, cebolla y bacon con patatas fritas y refresco o cerveza.",
            "price": "14,00 €",
            "imageKey": "burger-deja-vu-simple"
          },
          {
            "id": "hamburguesa-rulo-de-cabra",
            "title": "Hamburguesa Rulo de Cabra",
            "description": "Carne, queso de cabra, bacon y cebolla frita con patatas fritas y refresco o cerveza.",
            "price": "14,00 €",
            "imageKey": "burger-rulo"
          },
          {
            "id": "hamburguesa-deja-vu",
            "title": "Hamburguesa Deja Vu",
            "description": "Carne, queso, bacon, huevo, lechuga, tomate y cebolla con patatas fritas y refresco o cerveza.",
            "price": "14,40 €",
            "imageKey": "burger-deja-vu-simple"
          },
          {
            "id": "hamburguesa-deja-vu-deluxe",
            "title": "Hamburguesa Deja Vu Deluxe",
            "description": "Carne, queso, bacon, huevo, cebolla caramelizada y pepinillos (sin verduras) con patatas fritas y refresco o cerveza.",
            "price": "14,40 €",
            "imageKey": "burger-deja-vu-deluxe"
          },
          {
            "id": "hamburguesa-dracula",
            "title": "Hamburguesa Dracula",
            "description": "Doble de carne, doble de queso, cebolla caramelizada, pepinillos y bacon (sin verduras) con patatas fritas y refresco o cerveza.",
            "price": "16,00 €",
            "imageKey": "burger-dracula"
          }
        ]
      }
    ]
  },
  {
    "id": "desserts",
    "name": "Postres",
    "shortName": "Postres",
    "description": "Profiteroles, bolas de helado, tarta de queso y milkshakes.",
    "note": "Postres y batidos",
    "tone": "stone",
    "imageKey": "dessert",
    "prepTime": "5 min",
    "mainText": "",
    "sections": [
      {
        "title": "",
        "description": "",
        "items": [
          {
            "id": "profiteroles",
            "title": "Profiteroles",
            "description": "Profiteroles clasicos servidos frios.",
            "price": "5,50 €",
            "imageKey": "dessert-profiteroles"
          },
          {
            "id": "bola-de-helado",
            "title": "Bola de Helado",
            "description": "Chocolate, vainilla o fresa.",
            "price": "1,90 €"
          },
          {
            "id": "tarta-de-queso",
            "title": "Tarta de Queso",
            "description": "Tarta de queso de la casa.",
            "price": "6,50 €",
            "imageKey": "dessert-cheesecake",
            "featured": true
          },
          {
            "id": "milkshake",
            "title": "Milkshake",
            "description": "Vainilla, fresa, chocolate o cookies.",
            "price": "5,90 EUR"
          },
          ...zumitSmoothieItems
        ]
      }
    ]
  },
  {
    "id": "smoothies",
    "name": "Smoothies",
    "shortName": "Zumit",
    "description": "Smoothies naturales Zumit hechos al momento con fruta y verdura.",
    "note": "Zumit natural",
    "tone": "olive",
    "imageKey": "smoothie-tropical-heaven",
    "prepTime": "4 min",
    "mainText": "Elaborados al momento con fruta ultracongelada Zumit y zumo base de manzana.",
    "sections": [
      {
        "title": "Zumit",
        "description": "Hechos al momento.",
        "items": zumitSmoothieItems
      }
    ]
  },
  {
    "id": "drinks",
    "name": "Bebidas",
    "shortName": "Bebidas",
    "description": "Agua, refrescos, cerveza, vino, cafe y opciones para llevar.",
    "note": "Bebidas",
    "tone": "olive",
    "imageKey": "drinks",
    "prepTime": "2 min",
    "mainText": "",
    "sections": [
      {
        "title": "Bebidas",
        "description": "",
        "items": [
          {
            "id": "agua-500-ml",
            "title": "Agua (500 ml)",
            "description": "",
            "price": "2,00 €"
          },
          {
            "id": "agua-con-gas",
            "title": "Agua con gas",
            "description": "",
            "price": "3,00 €"
          },
          {
            "id": "refresco",
            "title": "Refrescos",
            "description": "",
            "price": "3,00 €"
          },
          {
            "id": "copa-de-cerveza",
            "title": "Copa de cerveza",
            "description": "",
            "price": "3,00 €"
          },
          {
            "id": "tercio",
            "title": "Tercio",
            "description": "",
            "price": "3,30 €"
          },
          {
            "id": "jarra-de-cerveza",
            "title": "Jarra de cerveza",
            "description": "",
            "price": "4,50 €"
          },
          {
            "id": "cerveza-especial",
            "title": "Cerveza especial",
            "description": "",
            "price": "3,50 €"
          },
          {
            "id": "copa-de-vino",
            "title": "Copa de vino",
            "description": "",
            "price": "Desde 3,20 €"
          },
          {
            "id": "botella-de-vino",
            "title": "Botella de vino",
            "description": "",
            "price": "17,00 €"
          },
          {
            "id": "tinto-de-verano",
            "title": "Tinto de verano",
            "description": "",
            "price": "4,50 €"
          },
          {
            "id": "cafe",
            "title": "Cafe",
            "description": "",
            "price": "2,00 €"
          },
          {
            "id": "infusiones",
            "title": "Infusiones",
            "description": "",
            "price": "2,20 €"
          },
          {
            "id": "latas-para-llevar",
            "title": "Latas para llevar",
            "description": "",
            "price": "2,00 €"
          }
        ]
      }
    ]
  }
];

const flatMenuCatalog: MenuCatalogCategory[] = legacyMenuCatalog.map((category) => ({
  id: category.id,
  name: category.name,
  shortName: category.shortName,
  description: category.description,
  note: category.note,
  tone: category.tone,
  products: category.sections.flatMap((section) => section.items.map((item) => buildLegacyProduct(category, section, item))),
}));

function getFlatCategory(categoryId: string) {
  const category = flatMenuCatalog.find((entry) => entry.id === categoryId);

  if (!category) {
    throw new Error(`Missing category ${categoryId}`);
  }

  return category;
}

function getFlatProduct(categoryId: string, itemId: string) {
  const category = getFlatCategory(categoryId);
  const productId = `${categoryId}-${itemId}`;
  const product = category.products.find((entry) => entry.id === productId);

  if (!product) {
    throw new Error(`Missing product ${productId}`);
  }

  return product;
}

function mergeTags(...groups: Array<string[] | undefined>) {
  return [...new Set(groups.flatMap((group) => group ?? []))].slice(0, 4);
}

const artisanBreadTag = ["Pan artesano"];
const artisanBreadDescription = "Pan artesano con masa madre y sin conservantes.";
const artisanBreadLongDescription = "El pan es artesano, con masa madre y sin conservantes.";

function applyArtisanBread(product: MenuProductSeed): MenuProductSeed {
  return {
    ...product,
    description: `${product.description} ${artisanBreadDescription}`,
    longDescription: `${product.longDescription} ${artisanBreadLongDescription}`,
    tags: mergeTags(artisanBreadTag, product.tags),
  };
}

function deriveProduct(
  categoryId: string,
  itemId: string,
  overrides: Partial<MenuProductSeed> & Pick<MenuProductSeed, "id" | "name" | "description" | "longDescription" | "highlight">,
): MenuProductSeed {
  const baseProduct = getFlatProduct(categoryId, itemId);

  return {
    ...baseProduct,
    ...overrides,
    tags: overrides.tags ?? baseProduct.tags,
    modifierGroups: overrides.modifierGroups ?? baseProduct.modifierGroups,
    allergens: overrides.allergens ?? baseProduct.allergens,
  };
}

function buildTurkishSpecialtiesProducts() {
  const kebabBase = getFlatProduct("turkish-specialties", "kebab-de-pollo");
  const kebabFalafel = getFlatProduct("turkish-specialties", "kebab-de-falafel");
  const shawarmaBase = getFlatProduct("turkish-specialties", "shawarma-de-pollo");
  const shawarmaFalafel = getFlatProduct("turkish-specialties", "shawarma-de-falafel");
  const friesPortion = getFlatProduct("turkish-specialties", "racion-de-patatas-fritas");
  const halfFriesPortion = getFlatProduct("turkish-specialties", "media-racion-de-patatas-fritas");

  return [
    applyArtisanBread(deriveProduct("turkish-specialties", "kebab-de-pollo", {
      id: "turkish-specialties-kebab",
      name: "Kebab",
      description: "Pollo 7,00 €, mixto 7,50 €, ternera 8,50 € y falafel 6,00 €. Con ensalada de repollo, tomate y cebolla, y salsas.",
      longDescription:
        "Kebab con ensalada de repollo, tomate y cebolla, y salsas. Precio segun version: pollo 7,00 €, mixto 7,50 €, ternera 8,50 € y falafel 6,00 €.",
      priceLabel: "Pollo 7,00 / Mixto 7,50 / Ternera 8,50 / Falafel 6,00",
      imageKey: "kebab",
      highlight: "Precio segun version",
      featured: true,
      bestseller: true,
      tags: mergeTags(kebabBase.tags, ["Elige version"]),
      modifierGroups: [kebabProteinGroup, sauceGroup, legacyTurkishExtrasGroup],
    })),
    applyArtisanBread(deriveProduct("turkish-specialties", "kebab-de-falafel", {
      id: "turkish-specialties-kebab-falafel",
      name: "Kebab de falafel",
      description: "Falafel con ensalada de repollo, tomate y cebolla, y salsas.",
      longDescription: "Kebab de falafel con ensalada de repollo, tomate y cebolla, y salsas. Se mantiene como opcion vegetariana separada.",
      imageKey: "kebab",
      highlight: "Falafel, verdura y salsas",
      tags: mergeTags(kebabFalafel.tags, ["Vegetariano"]),
      modifierGroups: [sauceGroup, legacyTurkishExtrasGroup],
    })),
    deriveProduct("turkish-specialties", "shawarma-de-pollo", {
      id: "turkish-specialties-shawarma",
      name: "Shawarma",
      description: "Pollo 7,00 €, mixto 7,50 €, ternera 8,50 € y falafel 7,00 €. Con ensalada de repollo, tomate y cebolla, y salsas.",
      longDescription:
        "Shawarma con ensalada de repollo, tomate y cebolla, y salsas. Precio segun version: pollo 7,00 €, mixto 7,50 €, ternera 8,50 € y falafel 7,00 €.",
      priceLabel: "Pollo 7,00 / Mixto 7,50 / Ternera 8,50 / Falafel 7,00",
      imageKey: "shawarma",
      highlight: "Precio segun version",
      tags: mergeTags(shawarmaBase.tags, ["Elige version"]),
      modifierGroups: [shawarmaProteinGroup, sauceGroup, legacyTurkishExtrasGroup],
    }),
    deriveProduct("turkish-specialties", "shawarma-de-falafel", {
      id: "turkish-specialties-shawarma-falafel",
      name: "Shawarma de falafel",
      description: "Falafel con ensalada de repollo, tomate y cebolla, y salsas.",
      longDescription: "Shawarma de falafel con ensalada de repollo, tomate y cebolla, y salsas. Opcion vegetariana separada del resto.",
      imageKey: "shawarma",
      highlight: "Falafel, verdura y salsas",
      tags: mergeTags(shawarmaFalafel.tags, ["Vegetariano"]),
      modifierGroups: [sauceGroup, legacyTurkishExtrasGroup],
    }),
    friesPortion,
    halfFriesPortion,
    ...buildPlatesProducts(),
  ];
}

function buildPlatesProducts() {
  return [
    deriveProduct("plates", "combi-simple-de-pollo", {
      id: "plates-combi-simple",
      name: "Combi simple",
      description: "Pollo 9,50 €, mixto 10,00 €, ternera 11,50 € y falafel 8,20 €. Con arroz, patatas o ensalada.",
      longDescription:
        "Plato combi simple con guarnicion a elegir. Precio segun version: pollo 9,50 €, mixto 10,00 €, ternera 11,50 € y falafel 8,20 €.",
      priceLabel: "Pollo 9,50 / Mixto 10,00 / Ternera 11,50 / Falafel 8,20",
      imageKey: "combi",
      highlight: "Precio segun version",
      tags: mergeTags(getFlatProduct("plates", "combi-simple-de-pollo").tags, ["Elige version"]),
      modifierGroups: [combiSimpleProteinGroup, sideGroup, sauceGroup, legacyPlateExtrasGroup],
    }),
    deriveProduct("plates", "combi-simple-de-falafel", {
      id: "plates-combi-simple-falafel",
      name: "Combi simple de falafel",
      description: "Falafel con arroz, patatas o ensalada.",
      longDescription: "Plato combi simple de falafel con guarnicion a elegir y extras del local.",
      imageKey: "falafel",
      highlight: "Falafel y guarnicion",
      tags: mergeTags(getFlatProduct("plates", "combi-simple-de-falafel").tags, ["Vegetariano"]),
      modifierGroups: [sideGroup, sauceGroup, legacyPlateExtrasGroup],
    }),
    deriveProduct("plates", "combi-doble-de-pollo", {
      id: "plates-combi-doble",
      name: "Combi doble",
      description: "Pollo 11,50 €, mixto 12,00 €, ternera 13,50 € y falafel 11,50 €. Con arroz, patatas o ensalada.",
      longDescription:
        "Plato combi doble con guarnicion a elegir. Precio segun version: pollo 11,50 €, mixto 12,00 €, ternera 13,50 € y falafel 11,50 €.",
      priceLabel: "Pollo 11,50 / Mixto 12,00 / Ternera 13,50 / Falafel 11,50",
      imageKey: "combi",
      highlight: "Precio segun version",
      tags: mergeTags(getFlatProduct("plates", "combi-doble-de-pollo").tags, ["Elige version"]),
      modifierGroups: [combiDoubleProteinGroup, sideGroup, sauceGroup, legacyPlateExtrasGroup],
    }),
    deriveProduct("plates", "combi-doble-de-falafel", {
      id: "plates-combi-doble-falafel",
      name: "Combi doble de falafel",
      description: "Doble de falafel con arroz, patatas o ensalada.",
      longDescription: "Version doble del combi de falafel con guarnicion a elegir y extras del local.",
      imageKey: "falafel",
      highlight: "Doble de falafel",
      tags: mergeTags(getFlatProduct("plates", "combi-doble-de-falafel").tags, ["Vegetariano"]),
      modifierGroups: [sideGroup, sauceGroup, legacyPlateExtrasGroup],
    }),
    deriveProduct("plates", "plato-deja-vu-de-pollo", {
      id: "plates-plato-deja-vu",
      name: "Plato Deja Vu",
      description: "Pollo 13,00 €, mixto 14,00 €, ternera 15,50 € y falafel 11,50 €. Patatas o arroz, repollo, tomate, cebolla y salsas.",
      longDescription:
        "Plato Deja Vu con patatas o arroz, repollo, tomate, cebolla y salsas. Precio segun version: pollo 13,00 €, mixto 14,00 €, ternera 15,50 € y falafel 11,50 €.",
      priceLabel: "Pollo 13,00 / Mixto 14,00 / Ternera 15,50 / Falafel 11,50",
      imageKey: "plate-deja-vu",
      highlight: "Precio segun version",
      featured: true,
      bestseller: true,
      tags: mergeTags(getFlatProduct("plates", "plato-deja-vu-de-pollo").tags, ["Elige version"]),
      modifierGroups: [dejaVuProteinGroup, sideGroup, sauceGroup, legacyPlateExtrasGroup],
    }),
    deriveProduct("plates", "plato-deja-vu-de-falafel", {
      id: "plates-plato-deja-vu-falafel",
      name: "Plato Deja Vu de falafel",
      description: "Falafel con patatas o arroz, repollo, tomate, cebolla y salsas.",
      longDescription: "Version vegetariana del Plato Deja Vu con falafel, guarnicion a elegir y extras del local.",
      imageKey: null,
      highlight: "Falafel y guarnicion",
      tags: mergeTags(getFlatProduct("plates", "plato-deja-vu-de-falafel").tags, ["Vegetariano"]),
      modifierGroups: [sideGroup, sauceGroup, legacyPlateExtrasGroup],
    }),
  ];
}

function buildHamburgerProducts(category: MenuCatalogCategory) {
  return category.products.map((product) =>
    applyArtisanBread({
      ...product,
      description: `${product.description} Ternera o pollo crunchy.`,
      longDescription: `${product.longDescription} Disponible en ternera o pollo crunchy con el mismo precio base.`,
      tags: mergeTags(product.tags, ["Elige carne"]),
      modifierGroups: [burgerProteinChoiceGroup, legacyBurgerExtrasGroup],
    }),
  );
}

function buildMenuProducts(category: MenuCatalogCategory) {
  const burgerMenuIds = new Set([
    "menus-hamburguesa-simple",
    "menus-hamburguesa-deja-vu-simple",
    "menus-hamburguesa-rulo-de-cabra",
    "menus-hamburguesa-deja-vu",
    "menus-hamburguesa-deja-vu-deluxe",
    "menus-hamburguesa-dracula",
  ]);

  return [
    applyArtisanBread(deriveProduct("menus", "menu-kebab-de-pollo", {
      id: "menus-menu-kebab",
      name: "Menu Kebab",
      description: "Pollo 11,50 €, mixto 12,00 €, ternera 13,00 € y falafel 10,50 €. Con ensalada de repollo, tomate y cebolla, patatas fritas y bebida.",
      longDescription:
        "Menu kebab con ensalada de repollo, tomate y cebolla, patatas fritas y bebida incluida. Precio segun version: pollo 11,50 €, mixto 12,00 €, ternera 13,00 € y falafel 10,50 €.",
      priceLabel: "Pollo 11,50 / Mixto 12,00 / Ternera 13,00 / Falafel 10,50",
      highlight: "Kebab, patatas y bebida",
      imageKey: "menu-kebab",
      tags: mergeTags(getFlatProduct("menus", "menu-kebab-de-pollo").tags, ["Elige version"]),
      modifierGroups: [menuProteinGroup, drinkGroup, sauceGroup],
    })),
    applyArtisanBread(deriveProduct("menus", "menu-kebab-de-falafel", {
      id: "menus-menu-kebab-falafel",
      name: "Menu Kebab de falafel",
      description: "Kebab de falafel con ensalada de repollo, tomate y cebolla, patatas fritas y bebida.",
      longDescription: "Menu de kebab de falafel con ensalada de repollo, tomate y cebolla, patatas fritas, bebida incluida y salsas a elegir.",
      highlight: "Falafel, patatas y bebida",
      imageKey: "menu-kebab",
      tags: mergeTags(getFlatProduct("menus", "menu-kebab-de-falafel").tags, ["Vegetariano"]),
      modifierGroups: [drinkGroup, sauceGroup],
    })),
    deriveProduct("menus", "menu-shawarma-de-pollo", {
      id: "menus-menu-shawarma",
      name: "Menu Shawarma",
      description: "Pollo 11,50 €, mixto 12,00 €, ternera 13,00 € y falafel 10,50 €. Con ensalada de repollo, tomate y cebolla, patatas fritas y bebida.",
      longDescription:
        "Menu shawarma con ensalada de repollo, tomate y cebolla, patatas fritas y bebida incluida. Precio segun version: pollo 11,50 €, mixto 12,00 €, ternera 13,00 € y falafel 10,50 €.",
      priceLabel: "Pollo 11,50 / Mixto 12,00 / Ternera 13,00 / Falafel 10,50",
      highlight: "Shawarma, patatas y bebida",
      imageKey: "menu-shawarma",
      tags: mergeTags(getFlatProduct("menus", "menu-shawarma-de-pollo").tags, ["Elige version"]),
      modifierGroups: [menuProteinGroup, drinkGroup, sauceGroup],
    }),
    deriveProduct("menus", "menu-shawarma-de-falafel", {
      id: "menus-menu-shawarma-falafel",
      name: "Menu Shawarma de falafel",
      description: "Shawarma de falafel con ensalada de repollo, tomate y cebolla, patatas fritas y bebida.",
      longDescription: "Menu de shawarma de falafel con ensalada de repollo, tomate y cebolla, patatas fritas, bebida incluida y salsas a elegir.",
      highlight: "Falafel, patatas y bebida",
      imageKey: "menu-shawarma",
      tags: mergeTags(getFlatProduct("menus", "menu-shawarma-de-falafel").tags, ["Vegetariano"]),
      modifierGroups: [drinkGroup, sauceGroup],
    }),
    deriveProduct("menus", "menu-combi-simple-de-pollo", {
      id: "menus-menu-combi-simple",
      name: "Menu Combi simple",
      description: "Pollo 11,50 €, mixto 12,00 €, ternera 13,50 € y falafel 10,20 €. Con guarnicion, bebida y salsas.",
      longDescription:
        "Menu combi simple con patatas, arroz o ensalada, bebida incluida y salsas. Precio segun version: pollo 11,50 €, mixto 12,00 €, ternera 13,50 € y falafel 10,20 €.",
      priceLabel: "Pollo 11,50 / Mixto 12,00 / Ternera 13,50 / Falafel 10,20",
      highlight: "Combi simple y bebida",
      imageKey: "combi",
      tags: mergeTags(getFlatProduct("menus", "menu-combi-simple-de-pollo").tags, ["Elige version"]),
      modifierGroups: [menuCombiSimpleProteinGroup, sideGroup, drinkGroup, sauceGroup],
    }),
    deriveProduct("menus", "menu-combi-simple-de-falafel", {
      id: "menus-menu-combi-simple-falafel",
      name: "Menu Combi simple de falafel",
      description: "Combi simple de falafel con guarnicion, bebida y salsas.",
      longDescription: "Menu combi simple de falafel con patatas, arroz o ensalada, bebida incluida y salsas a elegir.",
      highlight: "Falafel, guarnicion y bebida",
      imageKey: "falafel",
      tags: mergeTags(getFlatProduct("menus", "menu-combi-simple-de-falafel").tags, ["Vegetariano"]),
      modifierGroups: [sideGroup, drinkGroup, sauceGroup],
    }),
    deriveProduct("menus", "menu-combi-doble-de-pollo", {
      id: "menus-menu-combi-doble",
      name: "Menu Combi doble",
      description: "Pollo 13,50 €, mixto 14,00 €, ternera 15,50 € y falafel 11,50 €. Con guarnicion, bebida y salsas.",
      longDescription:
        "Menu combi doble con patatas, arroz o ensalada, bebida incluida y salsas. Precio segun version: pollo 13,50 €, mixto 14,00 €, ternera 15,50 € y falafel 11,50 €.",
      priceLabel: "Pollo 13,50 / Mixto 14,00 / Ternera 15,50 / Falafel 11,50",
      highlight: "Combi doble y bebida",
      imageKey: "combi",
      tags: mergeTags(getFlatProduct("menus", "menu-combi-doble-de-pollo").tags, ["Elige version"]),
      modifierGroups: [menuCombiDoubleProteinGroup, sideGroup, drinkGroup, sauceGroup],
    }),
    deriveProduct("menus", "menu-combi-doble-de-falafel", {
      id: "menus-menu-combi-doble-falafel",
      name: "Menu Combi doble de falafel",
      description: "Combi doble de falafel con guarnicion, bebida y salsas.",
      longDescription: "Menu combi doble de falafel con patatas, arroz o ensalada, bebida incluida y salsas a elegir.",
      highlight: "Doble de falafel y bebida",
      imageKey: "falafel",
      tags: mergeTags(getFlatProduct("menus", "menu-combi-doble-de-falafel").tags, ["Vegetariano"]),
      modifierGroups: [sideGroup, drinkGroup, sauceGroup],
    }),
    deriveProduct("menus", "menu-deja-vu-de-pollo", {
      id: "menus-menu-deja-vu",
      name: "Menu Deja Vu",
      description: "Pollo 15,50 €, mixto 16,00 €, ternera 17,50 € y falafel 13,50 €. Con guarnicion, bebida y salsas.",
      longDescription:
        "Menu Plato Deja Vu con patatas o arroz, repollo, tomate, cebolla, salsas y bebida incluida. Precio segun version: pollo 15,50 €, mixto 16,00 €, ternera 17,50 € y falafel 13,50 €.",
      priceLabel: "Pollo 15,50 / Mixto 16,00 / Ternera 17,50 / Falafel 13,50",
      highlight: "Deja Vu, guarnicion y bebida",
      imageKey: "plate-deja-vu",
      tags: mergeTags(getFlatProduct("menus", "menu-deja-vu-de-pollo").tags, ["Elige version"]),
      modifierGroups: [menuDejaVuProteinGroup, sideGroup, drinkGroup, sauceGroup],
    }),
    deriveProduct("menus", "menu-deja-vu-de-falafel", {
      id: "menus-menu-deja-vu-falafel",
      name: "Menu Deja Vu de falafel",
      description: "Plato Deja Vu de falafel con guarnicion, bebida y salsas.",
      longDescription: "Version vegetariana del Menu Deja Vu con falafel, guarnicion a elegir, bebida y salsas.",
      highlight: "Falafel, guarnicion y bebida",
      imageKey: null,
      tags: mergeTags(getFlatProduct("menus", "menu-deja-vu-de-falafel").tags, ["Vegetariano"]),
      modifierGroups: [sideGroup, drinkGroup, sauceGroup],
    }),
    deriveProduct("combined-plates", "menu-platos-combinados", {
      id: "menus-menu-platos-combinados",
      name: "Menu platos combinados",
      description: "Plato combinado con ensalada, patatas fritas, huevo y bebida.",
      longDescription: "Menu de plato combinado con ensalada, patatas fritas, huevo y bebida incluida.",
      highlight: "Combinado con bebida",
      imageKey: "combined-plate",
      tags: ["Menu", "Con huevo"],
      modifierGroups: [drinkGroup],
      allergens: combinedPlateAllergens,
    }),
    ...category.products
      .filter((product) => burgerMenuIds.has(product.id))
      .map((product) =>
        applyArtisanBread({
          ...product,
          description: `${product.description} Ternera o pollo crunchy.`,
          longDescription: `${product.longDescription} Disponible en ternera o pollo crunchy con el mismo precio base.`,
          imageKey: product.imageKey === "generic" ? "burger" : product.imageKey,
          tags: mergeTags(product.tags, ["Elige carne"]),
          modifierGroups: [burgerProteinChoiceGroup, drinkGroup, legacyBurgerExtrasGroup],
        }),
      ),
  ];
}

function buildBocadillosProducts() {
  return [
    deriveProduct("bocadillos", "cinta-de-lomo", {
      id: "bocadillos-bocadillo",
      name: "Bocadillo",
      description: "Elige relleno entre lomo, jamon con tomate, bacon, panceta o pollo.",
      longDescription:
        "Bocadillo del local con relleno a elegir entre cinta de lomo, jamon con tomate, bacon, panceta o pollo.",
      highlight: "Elige relleno",
      imageKey: "bocadillo",
      tags: mergeTags(getFlatProduct("bocadillos", "cinta-de-lomo").tags, ["Elige relleno"]),
      modifierGroups: [bocadilloFillingGroup],
    }),
  ];
}

function buildCombinedPlatesProducts() {
  return [
    deriveProduct("combined-plates", "cinta-de-lomo", {
      id: "combined-plates-plato-combinado",
      name: "Plato combinado",
      description: "Ensalada, patatas fritas y huevo. Elige lomo, pollo, bacon o panceta.",
      longDescription:
        "Plato combinado con ensalada, patatas fritas y huevo. Puedes pedirlo con cinta de lomo, pollo a la plancha, bacon o panceta.",
      highlight: "Lomo, pollo, bacon o panceta",
      imageKey: "combined-plate",
      tags: mergeTags(getFlatProduct("combined-plates", "cinta-de-lomo").tags, ["Elige principal"]),
      modifierGroups: [combinedPlateChoiceGroup],
    }),
  ];
}

function buildProductsForCategory(category: MenuCatalogCategory) {
  switch (category.id) {
    case "turkish-specialties":
      return buildTurkishSpecialtiesProducts();
    case "plates":
      return buildPlatesProducts();
    case "hamburgers":
      return buildHamburgerProducts(category);
    case "menus":
      return buildMenuProducts(category);
    case "bocadillos":
      return buildBocadillosProducts();
    case "combined-plates":
      return buildCombinedPlatesProducts();
    default:
      return category.products;
  }
}

const disabledMenuCategoryIds = new Set<string>(["bocadillos"]);

export const menuCatalog: MenuCatalogCategory[] = flatMenuCatalog
  .filter((category) => category.id !== "plates" && !disabledMenuCategoryIds.has(category.id))
  .map((category) => ({
    id: category.id,
    name: category.name,
    shortName: category.shortName,
    description: category.description,
    note: category.note,
    tone: category.tone,
    products: buildProductsForCategory(category),
  }));

export const menuCategories: MenuCategory[] = menuCatalog.map(({ products: _products, ...category }) => category);

export const menuProducts: MenuProduct[] = menuCatalog.flatMap((category) =>
  category.products.map(({ imageKey, ...product }) => ({
    ...product,
    categoryId: category.id,
    image: imageKey ? menuImageMap[imageKey] : null,
  })),
);

export const experienceHighlights: ExperienceHighlight[] = [
  {
    title: "Carta actual",
    description: "Platos, menus, postres y bebidas pasados desde la carta publicada del local.",
    value: String(menuProducts.length),
  },
  {
    title: "Categorias",
    description: "Ensaladas, kebabs, platos, raciones, burgers, smoothies, postres y mas.",
    value: String(menuCategories.length),
  },
  {
    title: "Formas de pedir",
    description: "Servicio en local, recogida y reparto cercano.",
    value: "3",
  },
];

export const orderingSteps: OrderingStep[] = [
  {
    title: "Explora la carta",
    description: "Revisa ensaladas, kebabs, platos, raciones, menus, smoothies, postres y bebidas desde una sola carta.",
  },
  {
    title: "Elige el formato",
    description: "Decide si quieres un producto suelto, un plato completo, una hamburguesa o uno de los menus del local.",
  },
  {
    title: "Confirma el pedido",
    description: "Indica si lo quieres para recoger, a domicilio o para tomarlo directamente en el local.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Clientes de Rivas",
    quote: "Los kebabs salen bien cargados y normalmente tienen el pedido listo bastante rapido.",
    detail: "Pedidos habituales entre semana",
  },
  {
    name: "Mesa de terraza",
    quote: "Las raciones para compartir y las hamburguesas funcionan muy bien para venir a comer con calma.",
    detail: "Comida en local",
  },
  {
    name: "Recogida habitual",
    quote: "La carta tiene mucha variedad y los menus ayudan a pedir rapido cuando vamos con prisa.",
    detail: "Recogida y pedidos frecuentes",
  },
];

export const orderModes: OrderMode[] = [
  {
    id: "pickup",
    name: "Recogida",
    description: "Haz el pedido y recogelo caliente en el local.",
    eta: "15-20 min",
    note: "Sin coste extra",
  },
  {
    id: "delivery",
    name: "A domicilio",
    description: "Servicio a domicilio en Rivas y zonas cercanas.",
    eta: "30-40 min",
    note: "Servicio en Rivas y alrededores",
  },
  {
    id: "dinein",
    name: "Mesa o terraza",
    description: "Pide en el local y toma asiento en sala o terraza.",
    eta: "10-15 min",
    note: "Ideal para comer con calma",
  },
];
