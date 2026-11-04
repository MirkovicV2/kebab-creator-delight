import { MapPin, Phone } from "lucide-react";

import Footer from "@/features/layout/components/Footer";
import Navbar from "@/features/layout/components/Navbar";
import VenueGallery from "@/features/marketing/components/VenueGallery";
import { Button } from "@/shared/ui/button";
import { restaurantInfo } from "@/features/menu/data";

const ContactPage = () => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurantInfo.mapsQuery)}`;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pb-6">
        <section className="px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.04fr_0.96fr]">
            <article className="border border-black/12 bg-background sm:relative sm:min-h-[580px] sm:overflow-hidden">
              <div className="h-[240px] sm:absolute sm:inset-0 sm:h-full">
                <VenueGallery
                  className="h-full"
                  viewportClassName="h-[240px] sm:h-full"
                  showCaption={false}
                  showPagination={false}
                  controlsPosition="top"
                />
              </div>

              <div className="relative mx-4 -mt-5 border border-black/10 bg-background px-5 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.08)] sm:absolute sm:bottom-0 sm:left-1/2 sm:mx-0 sm:mt-0 sm:w-[calc(100%-4rem)] sm:-translate-x-1/2 sm:rounded-t-[28px] sm:rounded-b-none sm:border-black/8 sm:bg-background/90 sm:px-8 sm:py-8 sm:shadow-[0_26px_70px_rgba(0,0,0,0.16)] sm:backdrop-blur-md lg:w-[78%]">
                <p className="editorial-kicker text-black/55">Contacto</p>
                <h1 className="mt-3 font-display text-[clamp(2.9rem,11vw,6rem)] leading-[0.9] text-black">
                  Ven, llama o encuentra el local sin rodeos.
                </h1>

                <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">
                  <div className="rounded-[24px] border border-black/10 bg-black/[0.03] p-4 sm:p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/52">Direccion</p>
                    <div className="mt-3 space-y-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-black/84 sm:text-[14px]">
                      <p>{restaurantInfo.address}</p>
                      <p>{restaurantInfo.city}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-[0.82fr_1.18fr]">
                    <div className="rounded-[24px] border border-black/10 bg-black/[0.03] p-4 sm:p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/52">Telefono</p>
                      <a
                        href={`tel:${restaurantInfo.phone}`}
                        className="mt-3 block text-[13px] font-semibold uppercase tracking-[0.08em] text-black/84 hover:text-black sm:text-[14px]"
                      >
                        {restaurantInfo.phone}
                      </a>
                    </div>

                    <div className="rounded-[24px] border border-black/10 bg-black/[0.03] p-4 sm:p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/52">Reparto</p>
                      <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-black/84 sm:text-[14px]">
                        {restaurantInfo.serviceAreas.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <div className="space-y-6">
              <article className="bg-primary px-5 py-6 text-primary-foreground sm:px-10 sm:py-8">
                <p className="editorial-kicker text-gold">Horario</p>
                <div className="mt-4 grid gap-3 sm:mt-5">
                  {restaurantInfo.openingHours.map((slot) => (
                    <div
                      key={slot.day}
                      className="grid gap-1 border-t border-white/12 pt-3 text-[15px] font-semibold uppercase tracking-[0.12em] text-primary-foreground/82 sm:grid-cols-[140px_1fr]"
                    >
                      <p>{slot.day}</p>
                      <p className="text-primary-foreground">{slot.time}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="bg-gold px-5 py-6 text-gold-foreground sm:px-10 sm:py-8">
                <p className="editorial-kicker text-black/55">Acciones</p>
                <h2 className="mt-3 font-display text-[2.9rem] leading-none text-black sm:text-6xl">
                  Abre el mapa o llama directamente al local.
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-6 text-black/72 sm:mt-4 sm:text-base sm:leading-7">
                  Si quieres hacer un pedido, confirmar el horario o consultar un alergeno, puedes llamarnos o ver la
                  ubicacion exacta en el mapa.
                </p>

                <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                  <Button asChild className="h-10 border border-black bg-black px-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-background hover:bg-black/90 sm:h-12 sm:px-6 sm:text-[11px] sm:tracking-[0.24em]">
                    <a href={`tel:${restaurantInfo.phone}`}>
                      <Phone className="h-4 w-4" />
                      Llamar
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-10 border border-black bg-transparent px-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-black hover:bg-white/25 sm:h-12 sm:px-6 sm:text-[11px] sm:tracking-[0.24em]"
                  >
                    <a href={mapsUrl} target="_blank" rel="noreferrer">
                      <MapPin className="h-4 w-4" />
                      Ver mapa
                    </a>
                  </Button>
                </div>
              </article>

              <article className="border border-black/12 bg-white px-5 py-6 sm:px-10 sm:py-8">
                <p className="editorial-kicker text-black/55">Zonas cercanas</p>
                <div className="mt-4 grid gap-3 text-[14px] font-semibold uppercase tracking-[0.11em] text-black/78 sm:mt-5 sm:text-[15px] sm:tracking-[0.12em]">
                  {restaurantInfo.serviceAreas.map((area) => (
                    <p key={area} className="border-t border-black/10 pt-3">
                      {area}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
