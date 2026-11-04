import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Instagram, Menu, Phone, X } from "lucide-react";

import BrandLogo from "@/features/layout/components/BrandLogo";
import CheckerDivider from "@/features/layout/components/CheckerDivider";
import { restaurantInfo } from "@/features/menu/data";
import { cn } from "@/shared/lib/utils";

const navigationItems = [
  { to: { pathname: "/", hash: "#manifiesto" }, label: "Nosotros" },
  { to: "/carta", label: "Carta" },
  { to: "/contacto", label: "Contacto" },
] as const;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const instagramUrl = restaurantInfo.instagramProfileUrl;

  const isActive = (item: (typeof navigationItems)[number]) => {
    if (typeof item.to === "string") {
      return location.pathname === item.to;
    }

    return location.pathname === item.to.pathname && location.hash === item.to.hash;
  };

  return (
    <header className="border-b border-black/10 bg-background">
      <div className="mx-auto max-w-7xl px-5 pb-4 pt-5 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-start">
          <Link to="/" onClick={() => setOpen(false)} className="w-fit">
            <BrandLogo size="sm" />
          </Link>

          <div className="hidden px-6 pt-3 md:block">
            <p className="mx-auto max-w-md border-t border-black/12 pt-3 text-center text-[10px] font-semibold uppercase tracking-[0.26em] text-black/55">
              Kebab turco, parrilla y platos al momento en una carta con caracter propio.
            </p>
          </div>

          <div className="hidden items-start justify-end gap-6 pt-3 md:flex">
            <nav className="flex items-center gap-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={cn(
                    "font-display text-[1.65rem] uppercase leading-none text-black/60 transition-colors hover:text-black",
                    isActive(item) ? "text-black" : "",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {instagramUrl ? (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir Instagram de DejaVu Kebab"
                  title="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center border border-black text-black transition-colors hover:bg-black hover:text-white"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              ) : null}

              <a
                href="tel:917139980"
                className="inline-flex items-center gap-2 border border-black px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-black"
              >
                <Phone className="h-3.5 w-3.5" />
                91 713 99 80
              </a>
            </div>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Cerrar navegacion" : "Abrir navegacion"}
            onClick={() => setOpen((current) => !current)}
            className="absolute right-5 top-6 inline-flex h-12 w-12 items-center justify-center border border-black text-black md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open ? (
          <div id="mobile-navigation" className="mt-5 border-t border-black/10 pt-5 md:hidden">
            <nav className="grid gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border border-black/10 px-4 py-3 font-display text-[1.8rem] uppercase leading-none text-black/80",
                    isActive(item) ? "bg-primary text-primary-foreground" : "bg-white",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex flex-wrap gap-3">
              {instagramUrl ? (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir Instagram de DejaVu Kebab"
                  className="inline-flex h-[50px] w-[50px] items-center justify-center border border-black bg-white text-black"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              ) : null}

              <a
                href="tel:917139980"
                className="inline-flex items-center gap-2 border border-gold bg-gold px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-foreground"
              >
                <Phone className="h-3.5 w-3.5" />
                Llamar al local
              </a>
            </div>
          </div>
        ) : null}
      </div>

      <CheckerDivider />
    </header>
  );
};

export default Navbar;
