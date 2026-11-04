import { useState, type CSSProperties } from "react";
import { ChevronDown, Search } from "lucide-react";

import CheckerDivider from "@/features/layout/components/CheckerDivider";
import { ProductAllergenCompactRow, ProductAllergenSummary, ProductStatusBadges } from "@/features/menu/components/AllergenInfo";
import { Badge } from "@/shared/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/ui/dialog";
import { type MenuProduct } from "@/features/menu/data";
import { formatCurrency, formatProductPrice } from "@/features/menu/lib/menu";
import { cn } from "@/shared/lib/utils";

interface MenuProductCardProps {
  product: MenuProduct;
  variant?: "default" | "featured";
  compactOnMobile?: boolean;
  className?: string;
  style?: CSSProperties;
}

const MenuProductCard = ({
  product,
  variant = "default",
  compactOnMobile = false,
  className,
  style,
}: MenuProductCardProps) => {
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const isFeatured = variant === "featured";
  const hasImage = Boolean(product.image);
  const titleId = `${product.id}-title`;
  const visibleTags = product.tags.slice(0, isFeatured ? 4 : 3);
  const description = isFeatured ? product.longDescription : product.description;
  const priceText = formatProductPrice(product);
  const extraGroups = product.modifierGroups.filter(
    (group) => group.id === "legacy-turkish-extras" || group.id === "legacy-plate-extras",
  );

  const renderOptionPrice = (price?: number) => {
    if (!price) {
      return "Incluido";
    }

    return price > 0 ? `+${formatCurrency(price)}` : formatCurrency(price);
  };

  const renderExtrasSummary = (compact = false) =>
    extraGroups.length > 0 ? (
      <div className={cn("border border-black/10 bg-muted/50", compact ? "mt-3 p-3" : "mt-4 p-4")}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/58">Extras</p>
        <div className={cn("mt-2 space-y-2", compact ? "text-[11px]" : "text-[12px]")}>
          <ul className="space-y-1 text-black/72">
            {extraGroups.flatMap((group) =>
              group.options.map((option) => (
                <li key={option.id} className="flex items-start justify-between gap-3">
                  <span>{option.name}</span>
                  <span className="shrink-0 font-semibold text-black">{renderOptionPrice(option.price)}</span>
                </li>
              )),
            )}
          </ul>
        </div>
      </div>
    ) : null;

  return (
    <>
      <article
        className={cn("overflow-hidden border border-black/12 bg-white", className)}
        aria-labelledby={titleId}
        style={style}
      >
        {compactOnMobile ? (
          <div className="sm:hidden">
            <div className="flex gap-3 p-3">
              {hasImage ? (
                <button
                  type="button"
                  onClick={() => setImagePreviewOpen(true)}
                  className="relative h-[88px] w-[88px] shrink-0 overflow-hidden border border-black/12 bg-black text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                  aria-label={`Ampliar foto de ${product.name}`}
                >
                  <img
                    src={product.image ?? undefined}
                    alt={`Fotografia de ${product.name}`}
                    className="h-full w-full object-cover object-center"
                    width={480}
                    height={480}
                  />
                  <div className="gradient-overlay absolute inset-0" />
                  <span className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 border border-white/16 bg-black/78 px-1.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                    <Search className="h-3 w-3" aria-hidden="true" />
                    Ver
                  </span>
                </button>
              ) : (
                <div className="flex h-[88px] w-[88px] shrink-0 flex-col justify-between border border-black/12 bg-[linear-gradient(160deg,#17130f,#2b241c)] p-2 text-white">
                  <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/70">Sin foto</span>
                  <span className="font-display text-[1.05rem] leading-none">{product.name}</span>
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/56">{product.highlight}</p>
                    <h3 id={titleId} className="mt-1 pr-1 font-display text-[1.5rem] leading-[0.96] text-black">
                      {product.name}
                    </h3>
                  </div>
                  <p
                    className={cn(
                      "shrink-0 text-right text-black",
                      product.priceLabel ? "max-w-[10.5rem] text-[0.78rem] font-semibold leading-4" : "font-display text-[1.55rem] leading-none",
                    )}
                  >
                    {priceText}
                  </p>
                </div>

                <ProductStatusBadges product={product} compact className="mt-1.5 max-w-full" />

                <ProductAllergenCompactRow allergens={product.allergens} dense className="mt-2" />

                <details className="mt-2">
                  <summary className="summary-reset inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/58">
                    Info
                    <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  </summary>
                  <div className="mt-2 border border-black/10 bg-muted/55 p-3">
                    <p className="text-[12px] leading-5 text-black/72">{description}</p>

                    {renderExtrasSummary(true)}

                    {visibleTags.length > 0 ? (
                      <ul className="mt-3 flex flex-wrap gap-2" aria-label={`Etiquetas de ${product.name}`}>
                        {visibleTags.map((tag) => (
                          <li key={tag}>
                            <Badge variant="outline" className="border-black/12 bg-white px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-black/72">
                              {tag}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <div className="mt-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/56">Alergenos</p>
                      <ProductAllergenSummary allergens={product.allergens} className="mt-2" />
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>
        ) : null}

        <div className={cn("flex h-full min-h-0 flex-col", compactOnMobile ? "hidden sm:flex" : "")}>
          {hasImage ? (
            <button
              type="button"
              onClick={() => setImagePreviewOpen(true)}
              className={cn(
                "group relative block shrink-0 overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                isFeatured ? "h-[280px] sm:h-[340px] lg:h-[360px]" : "h-[220px] sm:h-[240px]",
              )}
              aria-label={`Ampliar foto de ${product.name}`}
            >
              <img
                src={product.image ?? undefined}
                alt={`Fotografia de ${product.name}`}
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                width={960}
                height={768}
              />
              <div className="gradient-overlay absolute inset-0" />
              <div className="absolute left-4 right-4 top-4">
                <ProductStatusBadges product={product} className="max-w-[72%]" />
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center gap-2 border border-white/20 bg-black/76 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                  <Search className="h-3.5 w-3.5" aria-hidden="true" />
                  Ver foto
                </span>
              </div>
            </button>
          ) : (
            <div
              className={cn(
                "relative shrink-0 overflow-hidden border-b border-black/10 bg-[radial-gradient(circle_at_top,_#46382a,_#201913_68%)]",
                isFeatured ? "h-[280px] sm:h-[340px] lg:h-[360px]" : "h-[220px] sm:h-[240px]",
              )}
            >
              <div className="absolute left-4 right-4 top-4">
                <ProductStatusBadges product={product} className="max-w-[72%]" />
              </div>
              <div className="flex h-full flex-col justify-end p-5 text-white sm:p-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/72">Sin foto disponible</span>
                <p className="mt-2 max-w-[16rem] font-display text-[2rem] leading-none">{product.name}</p>
              </div>
            </div>
          )}

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-[75%]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/58">{product.highlight}</p>
                  <h3 className={cn("mt-2 font-display leading-none text-black", isFeatured ? "text-5xl" : "text-[2.2rem]")}>
                    {product.name}
                  </h3>
                </div>
                <p
                  className={cn(
                    "shrink-0 text-right text-black",
                    product.priceLabel ? "max-w-[15rem] text-sm font-semibold leading-5" : "font-display text-4xl leading-none",
                  )}
                >
                  {priceText}
                </p>
              </div>

              <p className="text-sm leading-7 text-black/74">{description}</p>

              {renderExtrasSummary()}

              {visibleTags.length > 0 ? (
                <ul className="flex flex-wrap gap-2" aria-label={`Etiquetas de ${product.name}`}>
                  {visibleTags.map((tag) => (
                    <li key={tag}>
                      <Badge variant="outline" className="border-black/12 bg-muted/60 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-black/72">
                        {tag}
                      </Badge>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="mt-auto pt-5">
              <CheckerDivider />

              <div className="mt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/58">Alergenos</p>
                <ProductAllergenSummary allergens={product.allergens} className="mt-3" />
              </div>
            </div>
          </div>
        </div>
      </article>

      {hasImage ? (
        <Dialog open={imagePreviewOpen} onOpenChange={setImagePreviewOpen}>
          <DialogContent className="w-[calc(100vw-1rem)] max-h-[calc(100vh-1rem)] max-w-6xl overflow-y-auto border-white/10 bg-[#090807] p-0 text-white sm:w-full [&>button]:right-3 [&>button]:top-3 [&>button]:text-white [&>button]:ring-offset-[#090807]">
            <div className="lg:grid lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)]">
              <div className="bg-black p-3 sm:p-5 lg:p-6">
                <div className="flex min-h-[220px] items-center justify-center overflow-hidden border border-white/10 bg-[#050505]">
                  <img
                    src={product.image ?? undefined}
                    alt={`Vista ampliada de ${product.name}`}
                    className="mx-auto max-h-[34vh] w-auto max-w-full object-contain sm:max-h-[42vh] lg:max-h-[68vh]"
                    width={1400}
                    height={1200}
                  />
                </div>
              </div>

              <div className="border-t border-white/10 bg-[#11100e] px-4 py-4 sm:px-6 lg:border-l lg:border-t-0 lg:px-7 lg:py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">{product.highlight}</p>
                    <DialogTitle className="mt-2 font-display text-[2rem] leading-none text-white sm:text-[2.6rem]">
                      {product.name}
                    </DialogTitle>
                    <DialogDescription className="mt-3 max-w-2xl text-sm leading-6 text-white/64">
                      Vista ampliada del producto. Pulsa fuera de la imagen o el boton de cierre para volver a la carta.
                    </DialogDescription>
                    {extraGroups.length > 0 ? (
                      <div className="mt-4 max-w-2xl border border-white/10 bg-white/[0.04] p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">Extras</p>
                        <ul className="mt-2 space-y-1.5 text-sm text-white/80">
                          {extraGroups.flatMap((group) =>
                            group.options.map((option) => (
                              <li key={option.id} className="flex items-start justify-between gap-4">
                                <span>{option.name}</span>
                                <span className="shrink-0 font-semibold text-gold">{renderOptionPrice(option.price)}</span>
                              </li>
                            )),
                          )}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                  <p
                    className={cn(
                      "shrink-0 text-right text-gold",
                      product.priceLabel ? "max-w-[16rem] text-sm font-semibold leading-5 sm:text-base" : "font-display text-2xl leading-none sm:text-3xl",
                    )}
                  >
                    {priceText}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
};

export default MenuProductCard;
