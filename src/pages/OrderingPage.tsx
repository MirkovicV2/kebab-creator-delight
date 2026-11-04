import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Footer from "@/features/layout/components/Footer";
import Navbar from "@/features/layout/components/Navbar";
import OrderingSection from "@/features/marketing/components/OrderingSection";
import { Button } from "@/shared/ui/button";

const OrderingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="px-6 pb-24 pt-24">
        <div className="mx-auto max-w-6xl">
          <section className="rounded-[34px] border border-border/60 bg-card/85 px-8 py-12 shadow-[0_22px_80px_rgba(0,0,0,0.18)] lg:px-10">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gold">Pedido online</p>
            <h1 className="max-w-4xl font-display text-4xl font-bold text-foreground md:text-6xl">
              Elige tu pedido con calma y encuentra la opcion que mejor encaja contigo.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Consulta platos, personaliza extras y elige si lo quieres para recoger, a domicilio o para tomar en el local.
            </p>
            <Button asChild className="gradient-gold mt-8 h-12 rounded-xl px-6 text-gold-foreground">
              <Link to="/carta">
                Abrir carta completa
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </section>
        </div>
      </main>
      <OrderingSection />
      <Footer />
    </div>
  );
};

export default OrderingPage;
