import { ArrowRight, ClipboardCheck, CookingPot, Send } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";

const steps = [
  {
    icon: CookingPot,
    title: "Explora la carta",
    description: "Revisa platos, categorias y precios antes de decidir.",
  },
  {
    icon: ClipboardCheck,
    title: "Configura el pedido",
    description: "Elige extras, salsas y cualquier nota para cocina.",
  },
  {
    icon: Send,
    title: "Cierra por canal directo",
    description: "Decide si lo quieres para recoger o a domicilio.",
  },
];

const OrderingPreviewSection = () => {
  return (
    <section id="pedido" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gold">Pedido online</p>
            <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              Pide como prefieras
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Consulta la carta, personaliza el pedido y elige si lo quieres para recoger o a domicilio.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="gradient-gold h-12 rounded-xl px-6 text-gold-foreground">
              <Link to="/pedido-online">
                Mas informacion
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-xl border-border/60">
              <Link to="/carta">Abrir carta</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.title} className="rounded-[28px] border-border/60 bg-card/80 shadow-[0_16px_50px_rgba(0,0,0,0.14)]">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10">
                  <step.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrderingPreviewSection;
