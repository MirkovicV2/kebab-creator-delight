import {
  menuCategories,
  orderModes,
  restaurantInfo,
  type MenuModifierGroup,
  type MenuOption,
  type MenuProduct,
  type OrderModeId,
} from "@/features/menu/data";

export interface SelectedGroupOption {
  id: string;
  name: string;
  price: number;
}

export interface CartSelectionGroup {
  id: string;
  name: string;
  options: SelectedGroupOption[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string | null;
  quantity: number;
  notes: string;
  basePrice: number;
  unitPrice: number;
  totalPrice: number;
  selections: CartSelectionGroup[];
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export type ProductSelections = Record<string, string[]>;

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function formatProductPrice(product: Pick<MenuProduct, "price" | "priceLabel">) {
  return product.priceLabel ?? formatCurrency(product.price);
}

export function getCategoryName(categoryId: string) {
  return menuCategories.find((category) => category.id === categoryId)?.name ?? categoryId;
}

export function getOrderModeById(orderModeId: OrderModeId) {
  return orderModes.find((mode) => mode.id === orderModeId) ?? orderModes[0];
}

export function getDefaultSelections(product: MenuProduct): ProductSelections {
  return product.modifierGroups.reduce<ProductSelections>((selectionMap, group) => {
    const defaults = group.options.filter((option) => option.default).map((option) => option.id);

    if (defaults.length > 0) {
      selectionMap[group.id] = defaults;
      return selectionMap;
    }

    if (group.required && group.options[0]) {
      selectionMap[group.id] = [group.options[0].id];
      return selectionMap;
    }

    selectionMap[group.id] = [];
    return selectionMap;
  }, {});
}

function getOptionPrice(option: MenuOption | undefined) {
  return option?.price ?? 0;
}

function findOption(group: MenuModifierGroup, optionId: string) {
  return group.options.find((option) => option.id === optionId);
}

export function calculateSelectionPrice(product: MenuProduct, selections: ProductSelections) {
  return product.modifierGroups.reduce((productTotal, group) => {
    const selectedOptions = selections[group.id] ?? [];

    return (
      productTotal +
      selectedOptions.reduce((groupTotal, optionId) => groupTotal + getOptionPrice(findOption(group, optionId)), 0)
    );
  }, 0);
}

export function buildCartSelections(product: MenuProduct, selections: ProductSelections): CartSelectionGroup[] {
  return product.modifierGroups
    .map((group) => {
      const selectedOptions = (selections[group.id] ?? [])
        .map((optionId) => findOption(group, optionId))
        .filter((option): option is MenuOption => Boolean(option))
        .map((option) => ({
          id: option.id,
          name: option.name,
          price: option.price ?? 0,
        }));

      return selectedOptions.length > 0
        ? {
            id: group.id,
            name: group.name,
            options: selectedOptions,
          }
        : null;
    })
    .filter((group): group is CartSelectionGroup => Boolean(group));
}

export function buildCartItem(params: {
  product: MenuProduct;
  quantity: number;
  notes: string;
  selections: ProductSelections;
}): CartItem {
  const { product, quantity, notes, selections } = params;
  const extraPrice = calculateSelectionPrice(product, selections);
  const unitPrice = product.price + extraPrice;
  const cartSelections = buildCartSelections(product, selections);

  return {
    id: `${product.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    productId: product.id,
    name: product.name,
    image: product.image,
    quantity,
    notes: notes.trim(),
    basePrice: product.price,
    unitPrice,
    totalPrice: unitPrice * quantity,
    selections: cartSelections,
  };
}

export function getCartSubtotal(cartItems: CartItem[]) {
  return cartItems.reduce((total, item) => total + item.totalPrice, 0);
}

export function getCartCount(cartItems: CartItem[]) {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}

export function serializeSelections(selectionGroups: CartSelectionGroup[]) {
  return selectionGroups
    .map((group) => `${group.name}: ${group.options.map((option) => option.name).join(", ")}`)
    .join(" | ");
}

export function buildOrderMessage(params: {
  cartItems: CartItem[];
  customer: CustomerDetails;
  orderModeId: OrderModeId;
}) {
  const { cartItems, customer, orderModeId } = params;
  const subtotal = getCartSubtotal(cartItems);
  const orderMode = getOrderModeById(orderModeId);
  const cartLines = cartItems.map((item, index) => {
    const detail = serializeSelections(item.selections);
    const notesLine = item.notes ? ` | Nota: ${item.notes}` : "";

    return `${index + 1}. ${item.quantity}x ${item.name} - ${formatCurrency(item.totalPrice)}${
      detail ? ` | ${detail}` : ""
    }${notesLine}`;
  });

  const customerLines = [
    `Nombre: ${customer.name || "Pendiente"}`,
    `Telefono: ${customer.phone || "Pendiente"}`,
    `Modo: ${orderMode.name}`,
  ];

  if (orderModeId === "delivery") {
    customerLines.push(`Direccion: ${customer.address || "Pendiente"}`);
  }

  if (customer.notes.trim()) {
    customerLines.push(`Notas generales: ${customer.notes.trim()}`);
  }

  return [
    `Hola ${restaurantInfo.name}, quiero hacer este pedido:`,
    "",
    ...cartLines,
    "",
    ...customerLines,
    "",
    `Total estimado: ${formatCurrency(subtotal)}`,
  ].join("\n");
}

export function buildWhatsAppUrl(params: {
  cartItems: CartItem[];
  customer: CustomerDetails;
  orderModeId: OrderModeId;
}) {
  const message = buildOrderMessage(params);
  return `https://wa.me/${restaurantInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
