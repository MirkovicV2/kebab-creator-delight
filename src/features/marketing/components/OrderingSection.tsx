import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, CookingPot, Send } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { menuProducts, orderingSteps, testimonials } from "@/features/menu/data";

const stepIcons = [CookingPot, ClipboardCheck, Send];

const OrderingSection = () => {
  return (
    <section id="pedido" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gold">Pedido</p>
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Una forma comoda de elegir, personalizar y pedir.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Consulta la carta, ajusta extras y elige si prefieres recoger, pedir a domicilio o comer en el local.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="grid gap-5">
            {orderingSteps.map((step, index) => {
              const Icon = stepIcons[index] ?? ArrowRight;

              return (
                <Card key={step.title} className="rounded-[28px] border-border/60 bg-card/80 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                  <CardContent className="flex gap-4 p-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10">
                      <Icon className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <p className="mb-2 text-sm uppercase tracking-[0.24em] text-gold">Paso {index + 1}</p>
                      <h3 className="font-display text-2xl font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid gap-5">
            <Card className="rounded-[28px] border-gold/30 bg-gradient-to-br from-card via-card to-primary/10 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
              <CardHeader>
                <Badge className="w-fit bg-gold text-gold-foreground">Opciones</Badge>
                <CardTitle className="font-display text-3xl">Recogida, delivery y mesa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Trabajamos con recogida en local, servicio a domicilio en zonas cercanas y atencion directa en sala.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border/60 bg-background/30 p-4">
                    <p className="text-sm uppercase tracking-[0.24em] text-gold">Carta</p>
                    <p className="mt-2 font-display text-3xl font-bold">{menuProducts.length}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Productos visibles en la carta</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-background/30 p-4">
                    <p className="text-sm uppercase tracking-[0.24em] text-gold">Canales</p>
                    <p className="mt-2 font-display text-3xl font-bold">3</p>
                    <p className="mt-1 text-xs text-muted-foreground">Local, recogida y reparto</p>
                  </div>
                </div>
                <Button asChild className="gradient-gold h-12 rounded-xl px-6 text-gold-foreground">
                  <Link to="/carta">
                    Abrir carta completa
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="rounded-[28px] border-border/60 bg-card/80">
                <CardContent className="p-6">
                  <p className="font-display text-2xl leading-snug text-foreground">"{testimonial.quote}"</p>
                  <div className="mt-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.detail}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderingSection;
