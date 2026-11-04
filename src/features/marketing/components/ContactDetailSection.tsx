import { ExternalLink, MapPin, Phone, Send } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { restaurantInfo } from "@/features/menu/data";

const ContactDetailSection = () => {
  return (
    <section id="contacto" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gold">Contacto</p>
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Toda la informacion del local en un solo lugar.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Direccion, telefono, zonas de reparto y acceso rapido a la carta en un solo sitio.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <div className="grid gap-6">
            <Card className="rounded-[30px] border-border/60 bg-card/85 shadow-[0_18px_60px_rgba(0,0,0,0.16)]">
              <CardContent className="p-6">
                <Badge className="bg-gold text-gold-foreground">Contacto directo</Badge>
                <h3 className="mt-4 font-display text-3xl font-bold">Llama o pide cuando quieras</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Llamanos para consultar horario, recogida, reparto o alergenos.
                </p>
                <div className="mt-5 grid gap-3">
                  <Button asChild className="gradient-gold h-12 rounded-xl text-gold-foreground">
                    <Link to="/carta">
                      <Send className="mr-2 h-4 w-4" />
                      Ir a la carta de pedido
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-12 rounded-xl border-border/60">
                    <a href={`tel:${restaurantInfo.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Llamar al local
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="rounded-[30px] border-border/60 bg-card/80">
                <CardContent className="p-6">
                  <MapPin className="h-8 w-8 text-gold" />
                  <p className="mt-4 text-sm uppercase tracking-[0.24em] text-gold">Direccion</p>
                  <p className="mt-2 font-display text-2xl font-semibold">{restaurantInfo.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {restaurantInfo.address}, {restaurantInfo.city}
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-[30px] border-border/60 bg-card/80">
                <CardContent className="p-6">
                  <Phone className="h-8 w-8 text-gold" />
                  <p className="mt-4 text-sm uppercase tracking-[0.24em] text-gold">Telefono</p>
                  <p className="mt-2 font-display text-2xl font-semibold">{restaurantInfo.phone}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Atencion para pedidos, recogidas y consultas.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-[30px] border-border/60 bg-card/80">
              <CardContent className="p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-gold">Cobertura</p>
                <h3 className="mt-3 font-display text-3xl font-bold">Zonas recomendadas para reparto</h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  {restaurantInfo.serviceAreas.map((area) => (
                    <Badge key={area} variant="outline" className="border-border/60 bg-background/35 px-4 py-2 text-foreground">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="overflow-hidden rounded-[34px] border border-border/60 bg-card/80 shadow-[0_18px_60px_rgba(0,0,0,0.16)]">
            <div className="border-b border-border/60 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-gold">Ubicacion</p>
              <h3 className="mt-2 font-display text-3xl font-bold">Como llegar</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Consulta la ubicacion exacta del local y abre la ruta en un clic.
              </p>
            </div>
            <div className="aspect-[4/3] overflow-hidden border-b border-border/60">
              <iframe
                title="Ubicacion Bar DejaVu Kebab Rivas"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.5!2d-3.54!3d40.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQmFyIERlamFWdSBLZWJhYiBSaXZhcw!5e0!3m2!1ses!2ses!4v1600000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="grid gap-3 p-6 md:grid-cols-2">
              <Button asChild variant="outline" className="h-12 rounded-xl border-border/60">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(restaurantInfo.mapsQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Abrir en Maps
                </a>
              </Button>
              <Button asChild className="gradient-gold h-12 rounded-xl text-gold-foreground">
                <a href={restaurantInfo.website} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Sitio web
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDetailSection;
