import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { menuCategories, menuProducts } from "@/features/menu/data";
import { formatProductPrice } from "@/features/menu/lib/menu";
import { cn } from "@/shared/lib/utils";

const categoryTones = {
  gold: "border-gold/30 bg-gold/10",
  ember: "border-primary/30 bg-primary/10",
  olive: "border-emerald-500/30 bg-emerald-500/10",
  sand: "border-amber-200/20 bg-amber-100/5",
  copper: "border-orange-500/30 bg-orange-500/10",
  stone: "border-slate-300/20 bg-slate-200/5",
} as const;

const featuredProducts = menuProducts.filter((product) => product.featured).slice(0, 3);

const MenuSection = () => {
  return (
    <section id="destacados" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gold">Carta destacada</p>
            <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              Una seleccion breve para abrir apetito.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Una seleccion breve de platos y categorias para orientarte antes de entrar en la carta completa.
            </p>
          </div>

          <Button asChild className="gradient-gold h-12 rounded-xl px-6 text-gold-foreground">
            <Link to="/carta">
              Entrar a la carta
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {menuCategories.slice(0, 3).map((category) => (
            <div
              key={category.id}
              className={cn(
                "rounded-[28px] border p-5 shadow-[0_18px_60px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-1",
                categoryTones[category.tone],
              )}
            >
              <p className="text-sm uppercase tracking-[0.24em] text-gold">{category.note}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">{category.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden rounded-[30px] border-border/60 bg-card/85 shadow-[0_18px_60px_rgba(0,0,0,0.16)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    width={640}
                    height={640}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-end bg-[radial-gradient(circle_at_top,_rgba(196,152,73,0.34),_rgba(27,20,16,0.98)_70%)] p-5 text-white">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/72">Sin foto disponible</p>
                      <p className="mt-2 font-display text-[2rem] leading-none">{product.name}</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {product.featured ? <Badge className="bg-gold text-gold-foreground">Destacado</Badge> : null}
                  {product.bestseller ? <Badge className="bg-primary text-primary-foreground">Top ventas</Badge> : null}
                </div>
              </div>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-gold">{product.highlight}</p>
                    <h3 className="mt-2 font-display text-3xl font-semibold text-foreground">{product.name}</h3>
                  </div>
                  <span className={product.priceLabel ? "max-w-[12rem] text-right text-xs font-semibold leading-5 text-gold" : "font-display text-2xl font-semibold text-gold"}>
                    {formatProductPrice(product)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="border-border/60 bg-background/35 text-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-gold">
          <Sparkles className="h-4 w-4" />
          Explora la carta completa para ver toda la seleccion.
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
