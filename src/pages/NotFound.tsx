import { Link, useLocation } from "react-router-dom";

import BrandLogo from "@/features/layout/components/BrandLogo";
import CheckerDivider from "@/features/layout/components/CheckerDivider";
import { Button } from "@/shared/ui/button";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <BrandLogo size="md" />
        <CheckerDivider className="mt-4" />

        <div className="mt-8 grid overflow-hidden border border-black/12 lg:grid-cols-[0.42fr_0.58fr]">
          <article className="bg-primary px-7 py-8 text-primary-foreground sm:px-10 sm:py-10">
            <p className="editorial-kicker text-gold">404</p>
            <h1 className="mt-4 font-display text-[clamp(4rem,8vw,6rem)] leading-[0.9]">Esa pagina no existe.</h1>
            <p className="mt-5 max-w-md text-lg leading-8 text-primary-foreground/72">
              La ruta <span className="text-primary-foreground">{location.pathname}</span> no corresponde a ninguna seccion activa del sitio.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-12 border border-gold bg-gold px-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-foreground hover:bg-gold/90">
                <Link to="/">Volver al inicio</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 border border-white/18 bg-transparent px-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-foreground hover:bg-white/8"
              >
                <Link to="/carta">Abrir carta</Link>
              </Button>
            </div>
          </article>

          <article className="bg-gold px-7 py-8 text-gold-foreground sm:px-10 sm:py-10">
            <p className="editorial-kicker text-black/55">DejaVu Kebab</p>
            <p className="mt-4 font-display text-[clamp(4rem,10vw,7rem)] leading-[0.88]">
              Vuelve al inicio o entra directamente en la carta.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
