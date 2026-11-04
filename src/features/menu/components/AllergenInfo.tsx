import type { ComponentType, SVGProps } from "react";
import { BadgeAlert, Bean, Donut, Egg, Fish, Flame, Leaf, Milk, Nut, TriangleAlert, Wheat } from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { allergenDefinitions, type AllergenDefinition, type AllergenId, type MenuAllergen, type MenuProduct } from "@/features/menu/data";
import { cn } from "@/shared/lib/utils";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const allergenDefinitionMap = allergenDefinitions.reduce<Record<AllergenId, AllergenDefinition>>((accumulator, definition) => {
  accumulator[definition.id] = definition;
  return accumulator;
}, {} as Record<AllergenId, AllergenDefinition>);

const allergenIcons: Record<AllergenId, IconType> = {
  gluten: Wheat,
  milk: Milk,
  egg: Egg,
  fish: Fish,
  sesame: Donut,
  soy: Bean,
  nuts: Nut,
  celery: Leaf,
  mustard: BadgeAlert,
};

function AllergenChip({ allergen }: { allergen: MenuAllergen }) {
  const definition = allergenDefinitionMap[allergen.id];
  const Icon = allergenIcons[allergen.id];
  const prefix = allergen.level === "contains" ? "Contiene" : "Puede contener";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
        allergen.level === "contains" ? "border-gold/30 bg-gold/20 text-black" : "border-black/12 bg-white text-black/72",
      )}
      aria-label={`${prefix} ${definition.name}`}
      title={`${prefix} ${definition.name}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{definition.shortName}</span>
    </span>
  );
}

export function ProductStatusBadges({
  product,
  className,
  compact = false,
}: {
  product: MenuProduct;
  className?: string;
  compact?: boolean;
}) {
  const badgeClasses = compact
    ? "px-2 py-0.5 text-[10px] uppercase tracking-[0.14em]"
    : "px-3 py-1 text-[11px] uppercase tracking-[0.18em]";
  const iconSize = compact ? "mr-1 h-3 w-3" : "mr-1 h-3.5 w-3.5";

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {product.featured ? (
        <Badge className={cn("border-0 bg-black text-background", badgeClasses)}>Destacado</Badge>
      ) : null}
      {product.bestseller ? (
        <Badge className={cn("border-0 bg-gold text-gold-foreground", badgeClasses)}>Top ventas</Badge>
      ) : null}
      {product.vegetarian ? (
        <Badge variant="outline" className={cn("border-black/12 bg-white text-black/72", badgeClasses)}>
          <Leaf className={iconSize} />
          Vegetariano
        </Badge>
      ) : null}
      {product.spicy ? (
        <Badge variant="outline" className={cn("border-black/12 bg-white text-black/72", badgeClasses)}>
          <Flame className={iconSize} />
          Picante
        </Badge>
      ) : null}
    </div>
  );
}

export function ProductAllergenCompactRow({
  allergens,
  className,
  dense = false,
}: {
  allergens: MenuAllergen[];
  className?: string;
  dense?: boolean;
}) {
  const contains = allergens.filter((allergen) => allergen.level === "contains");
  const visible = contains.slice(0, 4);
  const remaining = contains.length - visible.length;

  if (visible.length === 0) {
    return <p className={cn("text-[11px] leading-5 text-black/58", className)}>Sin alergenos base declarados.</p>;
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)} aria-label="Resumen de alergenos">
      {visible.map((allergen) => {
        const definition = allergenDefinitionMap[allergen.id];
        const Icon = allergenIcons[allergen.id];

        return (
          <span
            key={`${allergen.id}-${allergen.level}`}
            className={cn(
              "inline-flex items-center justify-center border border-black/12 bg-muted/60 text-black",
              dense ? "h-7 w-7" : "h-8 w-8",
            )}
            title={`Contiene ${definition.name}`}
            aria-label={`Contiene ${definition.name}`}
          >
            <Icon className={cn(dense ? "h-3.5 w-3.5" : "h-4 w-4")} aria-hidden="true" />
          </span>
        );
      })}

      {remaining > 0 ? (
        <span
          className={cn(
            "inline-flex min-w-7 items-center justify-center border border-black/12 bg-white px-2 font-semibold uppercase tracking-[0.14em] text-black/68",
            dense ? "h-7 text-[10px]" : "h-8 text-[11px]",
          )}
        >
          +{remaining}
        </span>
      ) : null}
    </div>
  );
}

export function ProductAllergenSummary({
  allergens,
  className,
  emptyLabel = "Sin alergenos principales declarados en la receta base.",
}: {
  allergens: MenuAllergen[];
  className?: string;
  emptyLabel?: string;
}) {
  const contains = allergens.filter((allergen) => allergen.level === "contains");
  const mayContain = allergens.filter((allergen) => allergen.level === "may-contain");

  return (
    <div className={cn("space-y-3", className)}>
      {contains.length > 0 ? (
        <ul className="flex flex-wrap gap-2" aria-label="Alergenos declarados">
          {contains.map((allergen) => (
            <li key={`${allergen.id}-${allergen.level}`}>
              <AllergenChip allergen={allergen} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-6 text-black/62">{emptyLabel}</p>
      )}

      {mayContain.length > 0 ? (
        <p className="inline-flex flex-wrap items-center gap-2 text-xs leading-6 text-black/62">
          <TriangleAlert className="h-3.5 w-3.5 text-black" aria-hidden="true" />
          <span className="font-semibold uppercase tracking-[0.18em]">Trazas</span>
          <span>{mayContain.map((allergen) => allergenDefinitionMap[allergen.id].name.toLowerCase()).join(", ")}.</span>
        </p>
      ) : null}
    </div>
  );
}
