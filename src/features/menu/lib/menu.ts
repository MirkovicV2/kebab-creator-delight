import type { MenuProduct } from "@/features/menu/data";

export type ProductSelections = Record<string, string[]>;

const currencyFormatter = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function formatProductPrice(product: Pick<MenuProduct, "price" | "priceLabel">) {
  return product.priceLabel ?? formatCurrency(product.price);
}

export function getDefaultSelections(product: MenuProduct): ProductSelections {
  return Object.fromEntries(product.modifierGroups.map((group) => {
    const defaults = group.options.filter((option) => option.default).map((option) => option.id);
    return [group.id, defaults.length ? defaults : group.required && group.options[0] ? [group.options[0].id] : []];
  }));
}

export function calculateSelectionPrice(product: MenuProduct, selections: ProductSelections) {
  return product.modifierGroups.reduce((total, group) => total +
    (selections[group.id] ?? []).reduce((sum, id) =>
      sum + (group.options.find((option) => option.id === id)?.price ?? 0), 0), 0);
}
