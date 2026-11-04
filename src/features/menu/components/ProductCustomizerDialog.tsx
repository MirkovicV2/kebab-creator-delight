import { useEffect, useState } from "react";
import { Minus, Plus, Sparkles } from "lucide-react";

import { ProductAllergenSummary, ProductStatusBadges } from "@/features/menu/components/AllergenInfo";
import { toast } from "@/shared/ui/sonner";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Separator } from "@/shared/ui/separator";
import { Textarea } from "@/shared/ui/textarea";
import { allergenDisclaimer, type MenuModifierGroup, type MenuProduct } from "@/features/menu/data";
import {
  buildCartItem,
  calculateSelectionPrice,
  formatCurrency,
  formatProductPrice,
  getDefaultSelections,
  type CartItem,
  type ProductSelections,
} from "@/features/menu/lib/menu";

interface ProductCustomizerDialogProps {
  product: MenuProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (cartItem: CartItem) => void;
}

function optionPriceLabel(price?: number) {
  if (!price) {
    return "Incluido";
  }

  return price > 0 ? `+${formatCurrency(price)}` : formatCurrency(price);
}

const ProductCustomizerDialog = ({
  product,
  open,
  onOpenChange,
  onAddToCart,
}: ProductCustomizerDialogProps) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [selections, setSelections] = useState<ProductSelections>({});

  useEffect(() => {
    if (!product) {
      return;
    }

    setQuantity(1);
    setNotes("");
    setSelections(getDefaultSelections(product));
  }, [product]);

  if (!product) {
    return null;
  }

  const hasImage = Boolean(product.image);
  const extraPrice = calculateSelectionPrice(product, selections);
  const unitPrice = product.price + extraPrice;
  const priceText = formatProductPrice(product);

  const updateMultiSelection = (group: MenuModifierGroup, optionId: string, checked: boolean) => {
    setSelections((currentSelections) => {
      const currentOptions = currentSelections[group.id] ?? [];

      if (checked) {
        if (currentOptions.includes(optionId)) {
          return currentSelections;
        }

        if (group.maxSelections && currentOptions.length >= group.maxSelections) {
          toast.error(`Puedes elegir un maximo de ${group.maxSelections} opciones en ${group.name.toLowerCase()}.`);
          return currentSelections;
        }

        return {
          ...currentSelections,
          [group.id]: [...currentOptions, optionId],
        };
      }

      return {
        ...currentSelections,
        [group.id]: currentOptions.filter((currentOptionId) => currentOptionId !== optionId),
      };
    });
  };

  const handleAddToCart = () => {
    const cartItem = buildCartItem({
      product,
      quantity,
      notes,
      selections,
    });

    onAddToCart(cartItem);
    toast.success(`${product.name} anadido al carrito.`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-hidden border-white/10 bg-[#120f0d] p-0 text-stone-100">
        <div className="grid max-h-[92vh] grid-cols-1 overflow-y-auto lg:grid-cols-[0.95fr,1.05fr]">
          <div className="relative min-h-[260px] overflow-hidden border-b border-white/10 lg:min-h-full lg:border-b-0 lg:border-r">
            {hasImage ? (
              <img
                src={product.image ?? undefined}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover"
                width={960}
                height={960}
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(196,152,73,0.38),_rgba(25,18,14,0.96)_68%)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,9,8,0.94)] via-[rgba(10,9,8,0.45)] to-transparent" />
            <div className="relative flex h-full flex-col justify-end gap-4 p-6 lg:p-8">
              {hasImage ? null : (
                <div className="mb-1 inline-flex w-fit border border-white/12 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-200">
                  Sin foto disponible
                </div>
              )}
              <ProductStatusBadges product={product} />
              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.28em] text-gold">{product.highlight}</p>
                <h2 className="font-display text-3xl font-bold">{product.name}</h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-300">{product.longDescription}</p>
              </div>
              <div className="rounded-[26px] border border-white/10 bg-black/20 p-4 text-stone-100 backdrop-blur-sm">
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-gold">Alergenos</p>
                <ProductAllergenSummary allergens={product.allergens} className="mt-3" />
                <p className="mt-3 text-xs leading-6 text-stone-400">{allergenDisclaimer}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-stone-300">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                  <Sparkles className="h-4 w-4 text-gold" />
                  {product.priceLabel ? `Precio segun version: ${priceText}` : `Base ${formatCurrency(product.price)}`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 p-6 lg:p-8">
            <DialogHeader className="text-left">
              <DialogTitle className="font-display text-2xl">Personaliza el pedido</DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-stone-400">
                Elige salsa, extras y notas para cocina. Los alergenos del plato siguen visibles durante todo el pedido.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
              {product.modifierGroups.map((group) => {
                const groupSelections = selections[group.id] ?? [];

                return (
                  <div key={group.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xl font-semibold">{group.name}</p>
                        <p className="text-sm text-stone-400">{group.description}</p>
                      </div>
                      <Badge variant="outline" className="border-gold/30 text-gold">
                        {group.selectionType === "single"
                          ? group.required
                            ? "Elige 1"
                            : "Opcional"
                          : `Hasta ${group.maxSelections ?? group.options.length}`}
                      </Badge>
                    </div>

                    {group.selectionType === "single" ? (
                      <RadioGroup
                        value={groupSelections[0] ?? ""}
                        onValueChange={(value) =>
                          setSelections((currentSelections) => ({
                            ...currentSelections,
                            [group.id]: [value],
                          }))
                        }
                        className="gap-3"
                      >
                        {group.options.map((option) => {
                          const optionId = `${group.id}-${option.id}`;

                          return (
                            <Label
                              key={option.id}
                              htmlFor={optionId}
                              className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-gold/40"
                            >
                              <RadioGroupItem id={optionId} value={option.id} className="mt-1" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-sm font-semibold text-stone-100">{option.name}</span>
                                  <span className="text-sm text-gold">{optionPriceLabel(option.price)}</span>
                                </div>
                                {option.description ? <p className="mt-1 text-xs text-stone-400">{option.description}</p> : null}
                              </div>
                            </Label>
                          );
                        })}
                      </RadioGroup>
                    ) : (
                      <div className="space-y-3">
                        {group.options.map((option) => {
                          const optionId = `${group.id}-${option.id}`;
                          const checked = groupSelections.includes(option.id);
                          const maxReached = Boolean(group.maxSelections && groupSelections.length >= group.maxSelections);

                          return (
                            <Label
                              key={option.id}
                              htmlFor={optionId}
                              className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-gold/40"
                            >
                              <Checkbox
                                id={optionId}
                                checked={checked}
                                disabled={!checked && maxReached}
                                onCheckedChange={(value) => updateMultiSelection(group, option.id, value === true)}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-sm font-semibold text-stone-100">{option.name}</span>
                                  <span className="text-sm text-gold">{optionPriceLabel(option.price)}</span>
                                </div>
                                {option.description ? <p className="mt-1 text-xs text-stone-400">{option.description}</p> : null}
                              </div>
                            </Label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <Separator />

            <div className="grid gap-5 md:grid-cols-[auto,1fr] md:items-start">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-gold">Cantidad</p>
                <div className="flex items-center gap-3">
                  <Button type="button" variant="outline" size="icon" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="min-w-10 text-center text-xl font-semibold">{quantity}</div>
                  <Button type="button" variant="outline" size="icon" onClick={() => setQuantity((current) => current + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-notes">Notas para cocina</Label>
                <Textarea
                  id="product-notes"
                  placeholder="Ejemplo: sin cebolla, salsa aparte, muy tostado..."
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className="min-h-28 rounded-2xl border-white/10 bg-white/[0.03]"
                />
              </div>
            </div>

            <DialogFooter className="border-t border-white/10 bg-transparent px-0 pt-6">
              <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-stone-400">Precio final</p>
                  <p className="font-display text-3xl font-bold text-gold">{formatCurrency(unitPrice * quantity)}</p>
                  <p className="text-sm text-stone-400">
                    {formatCurrency(unitPrice)} por unidad
                    {extraPrice > 0 ? ` con ${formatCurrency(extraPrice)} en extras` : ""}
                  </p>
                </div>

                <Button type="button" className="gradient-gold h-12 rounded-xl px-8 text-base text-gold-foreground" onClick={handleAddToCart}>
                  Anadir al carrito
                </Button>
              </div>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCustomizerDialog;
