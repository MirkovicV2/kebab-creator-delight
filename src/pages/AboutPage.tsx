import AboutSection from "@/features/marketing/components/AboutSection";
import ContactDetailSection from "@/features/marketing/components/ContactDetailSection";
import Footer from "@/features/layout/components/Footer";
import Navbar from "@/features/layout/components/Navbar";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="px-6 pb-24 pt-24">
        <div className="mx-auto max-w-6xl">
          <section className="rounded-[34px] border border-border/60 bg-card/85 px-8 py-12 shadow-[0_22px_80px_rgba(0,0,0,0.18)] lg:px-10">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gold">Nosotros</p>
            <h1 className="max-w-4xl font-display text-4xl font-bold text-foreground md:text-6xl">
              Conoce el espacio, el ambiente y la atencion del local.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Informacion del local, horarios y forma de atender pedidos, recogidas y servicio en sala.
            </p>
          </section>
        </div>
      </main>
      <AboutSection />
      <ContactDetailSection />
      <Footer />
    </div>
  );
};

export default AboutPage;
