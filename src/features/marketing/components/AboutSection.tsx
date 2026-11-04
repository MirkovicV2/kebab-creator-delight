import terrazaImg from "@/assets/terraza.jpg";
import { Clock3, MapPin, Phone, ShieldCheck, Sparkles, TreePine, UtensilsCrossed, Wifi } from "lucide-react";

import { Card, CardContent } from "@/shared/ui/card";
import { experienceHighlights, restaurantInfo } from "@/features/menu/data";

const services = [
  { icon: TreePine, label: "Terraza activa", detail: "Comida en exterior con ambiente relajado" },
  { icon: Wifi, label: "Wi-Fi gratis", detail: "Ideal para comidas largas o esperas cortas" },
  { icon: UtensilsCrossed, label: "Carta amplia", detail: "Kebabs, raciones, burgers, menus y postres" },
  { icon: ShieldCheck, label: "Servicio directo", detail: "Recogida, delivery y pedidos para llevar" },
];

const AboutSection = () => {
  return (
    <section id="nosotros" className="bg-muted/40 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[34px] border border-border/60 shadow-[0_22px_80px_rgba(0,0,0,0.18)]">
            <img
              src={terrazaImg}
              alt="Terraza del Bar DejaVu Kebab Rivas"
              loading="lazy"
              width={1280}
              height={720}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="rounded-[28px] border border-border/60 bg-background/55 p-5 backdrop-blur-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-gold">El local</p>
                <h3 className="mt-2 font-display text-3xl font-semibold">Sala y terraza para comer con calma.</h3>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gold">Nosotros</p>
            <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              Un local comodo, con servicio directo y cocina al momento.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              En DejaVu trabajamos una carta amplia con kebabs, platos, raciones, hamburguesas, bocadillos, menus y
              postres, con servicio directo en sala, recogida y reparto cercano.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {services.map((service) => (
                <Card key={service.label} className="rounded-[26px] border-border/60 bg-card/80">
                  <CardContent className="p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10">
                      <service.icon className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold">{service.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {experienceHighlights.map((highlight) => (
                <div key={highlight.title} className="rounded-3xl border border-border/60 bg-background/35 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-gold">{highlight.title}</p>
                  <p className="mt-3 font-display text-3xl font-bold text-foreground">{highlight.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{highlight.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[30px] border border-border/60 bg-card/80 p-6">
              <div className="grid gap-4 md:grid-cols-[1fr,1fr]">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-gold">Direccion</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {restaurantInfo.address}, {restaurantInfo.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-gold">Telefono</p>
                    <a href={`tel:${restaurantInfo.phone}`} className="mt-2 block text-sm text-muted-foreground transition-colors hover:text-gold">
                      {restaurantInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div className="w-full">
                    <p className="text-sm uppercase tracking-[0.24em] text-gold">Horario</p>
                    <div className="mt-3 grid gap-2 md:grid-cols-2">
                      {restaurantInfo.openingHours.map((hour) => (
                        <div key={hour.day} className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/25 px-4 py-3 text-sm">
                          <span>{hour.day}</span>
                          <span className="text-muted-foreground">{hour.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-gold">Cobertura</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {restaurantInfo.serviceAreas.join(", ")}. Reparto habitual en estas zonas segun disponibilidad del
                      local.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
