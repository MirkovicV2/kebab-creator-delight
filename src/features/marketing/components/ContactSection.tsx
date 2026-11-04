import { ArrowRight, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { restaurantInfo } from "@/features/menu/data";

const ContactSection = () => {
  return (
    <section id="contacto" className="bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gold">Contacto</p>
            <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              Encuentranos o haz tu pedido.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Telefono, direccion y acceso directo a la carta para pedir o venir al local.
            </p>
          </div>

          <Button asChild className="gradient-gold h-12 rounded-xl px-6 text-gold-foreground">
            <Link to="/nosotros#contacto">
              Mas informacion
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Card className="rounded-[28px] border-border/60 bg-card/80">
            <CardContent className="p-6">
              <Phone className="h-8 w-8 text-gold" />
              <p className="mt-4 text-sm uppercase tracking-[0.24em] text-gold">Telefono</p>
              <a
                href={`tel:${restaurantInfo.phone}`}
                className="mt-2 block font-display text-2xl font-semibold transition-colors hover:text-gold"
              >
                {restaurantInfo.phone}
              </a>
              <p className="mt-2 text-sm text-muted-foreground">Pedidos, recogida y consultas.</p>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-border/60 bg-card/80">
            <CardContent className="p-6">
              <MapPin className="h-8 w-8 text-gold" />
              <p className="mt-4 text-sm uppercase tracking-[0.24em] text-gold">Ubicacion</p>
              <p className="mt-2 font-display text-2xl font-semibold">{restaurantInfo.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {restaurantInfo.address}, {restaurantInfo.city}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-border/60 bg-card/80">
            <CardContent className="flex h-full flex-col p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-gold">Pedir ahora</p>
              <h3 className="mt-4 font-display text-3xl font-bold">Acceso rapido</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                Entra en la carta y revisa platos, precios y alergenos.
              </p>
              <Button asChild className="gradient-gold mt-6 h-11 rounded-xl text-gold-foreground">
                <Link to="/carta">Abrir carta</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
