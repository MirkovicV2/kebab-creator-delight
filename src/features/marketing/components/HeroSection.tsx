import { ArrowRight, Clock3, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import heroImage from "@/assets/hero-kebab.jpg";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { menuProducts, restaurantInfo } from "@/features/menu/data";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-28">
      <img
        src={heroImage}
        alt="Delicioso kebab turco del Bar DejaVu"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 gradient-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(210,162,73,0.24),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(181,83,41,0.2),_transparent_30%)]" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
        <div className="max-w-4xl">
          <div className="mb-6 flex flex-wrap gap-3">
            <Badge className="bg-gold text-gold-foreground">Especialidades turcas en Rivas</Badge>
            <Badge variant="outline" className="border-gold/30 bg-background/20 text-gold">
              Ingredientes frescos
            </Badge>
          </div>
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold">
            Cocina turca, parrilla y recetas con caracter
          </p>
          <h1 className="font-display text-5xl font-bold text-foreground md:text-7xl lg:text-8xl">
            Bar DejaVu
            <span className="mt-2 block text-3xl font-semibold text-gold md:text-5xl">
              Sabor, ambiente y cocina al momento
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Durums, kebabs, platos de parrilla, lahmacun y falafel preparados al momento en Rivas, con opciones para
            comer en local, recoger o pedir a domicilio.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild className="gradient-gold h-12 rounded-xl px-8 text-base text-gold-foreground">
              <Link to="/carta">
                Abrir carta completa
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-xl border-gold/40 bg-background/25 px-8 text-base text-gold hover:bg-gold hover:text-gold-foreground"
            >
              <Link to={{ pathname: "/", hash: "#contacto" }}>Ver contacto</Link>
            </Button>
          </div>

          <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-border/60 bg-background/35 p-4 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-gold">Carta</p>
              <p className="mt-2 font-display text-3xl font-bold">{menuProducts.length}+</p>
              <p className="mt-1 text-sm text-muted-foreground">Kebabs, platos, horno turco, entrantes y postres.</p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-background/35 p-4 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-gold">Pedidos</p>
              <p className="mt-2 font-display text-3xl font-bold">3</p>
              <p className="mt-1 text-sm text-muted-foreground">Recogida, reparto y servicio directo en el local.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:justify-self-end">
          <div className="rounded-[30px] border border-border/60 bg-background/45 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.2)] backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Nuestra cocina</p>
            <div className="mt-5 grid gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10">
                  <Sparkles className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="font-display text-2xl font-semibold">Sabores destacados</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Kebab, durum, parrilla y especialidades turcas en una carta facil de recorrer.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10">
                  <Clock3 className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="font-display text-2xl font-semibold">Preparacion al momento</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Carne al trompo, panes tostados y platos servidos segun pedido.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10">
                  <ShieldCheck className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="font-display text-2xl font-semibold">Ambiente y servicio</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Sala, terraza y atencion directa para dudas, recogidas y pedidos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-3xl border border-border/60 bg-background/35 p-4 backdrop-blur-sm">
            <MapPin className="h-5 w-5 text-gold" />
            <p className="text-sm text-muted-foreground">
              {restaurantInfo.address}, {restaurantInfo.city}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
