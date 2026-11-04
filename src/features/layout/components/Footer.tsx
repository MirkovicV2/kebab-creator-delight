import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

import BrandLogo from "@/features/layout/components/BrandLogo";
import CheckerDivider from "@/features/layout/components/CheckerDivider";
import { menuProducts, restaurantInfo } from "@/features/menu/data";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const instagramUrl = restaurantInfo.instagramProfileUrl;

  return (
    <footer className="px-5 pb-10 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl border-t border-black/10 pt-8">
        <div className="grid gap-8 md:grid-cols-[1fr_auto_auto] md:items-start">
          <div className="max-w-lg">
            <p className="editorial-kicker text-black/55">DejaVu Kebab</p>
            <p className="mt-4 text-base leading-7 text-black/70">
              Kebab turco, parrilla y especialidades hechas al momento en Rivas-Vaciamadrid. Carta clara, producto directo
              y alergenos visibles en cada plato.
            </p>
          </div>

          <div className="space-y-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-black/72">
            <Link to={{ pathname: "/", hash: "#manifiesto" }} className="block hover:text-black">
              Nosotros
            </Link>
            <Link to="/carta" className="block hover:text-black">
              Carta
            </Link>
            <Link to="/contacto" className="block hover:text-black">
              Contacto
            </Link>
            {instagramUrl ? (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir Instagram de DejaVu Kebab"
                className="inline-flex items-center gap-2 border border-black/12 px-3 py-2 text-black transition-colors hover:border-black hover:bg-black hover:text-white"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            ) : null}
          </div>

          <div className="space-y-2 text-right text-[11px] font-semibold uppercase tracking-[0.24em] text-black/72">
            <p>{restaurantInfo.city}</p>
            <a href={`tel:${restaurantInfo.phone}`} className="block hover:text-black">
              {restaurantInfo.phone}
            </a>
            <p>{menuProducts.length}+ platos en carta</p>
          </div>
        </div>

        <div className="mt-12">
          <BrandLogo size="lg" subtitle="Cocina turca en Rivas" />
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/55">
            {restaurantInfo.name} {currentYear} todos los derechos reservados
          </p>
          <CheckerDivider className="mt-5" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
