import { ArrowRight, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import adanaImage from "@/assets/adana.jpg";
import Footer from "@/features/layout/components/Footer";
import { getInstagramHandle, InstagramFeedEmbed } from "@/features/marketing/components/InstagramFeedSection";
import VenueGallery from "@/features/marketing/components/VenueGallery";
import Navbar from "@/features/layout/components/Navbar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";
import { menuProducts, restaurantInfo } from "@/features/menu/data";
import { formatProductPrice } from "@/features/menu/lib/menu";

const topSellingProducts = menuProducts.filter((product) => product.bestseller).slice(0, 7);

const housePrinciples = [
  "Kebabs y platos al momento",
  "Raciones, burgers, bocadillos y postres",
  "Pedidos para local, recoger o llevar",
  "Precios y alergenos visibles",
] as const;

const Index = () => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurantInfo.mapsQuery)}`;
  const instagramHandle = getInstagramHandle(restaurantInfo.instagramProfileUrl);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pb-6">
        <section className="px-5 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
          <div className="mx-auto grid max-w-7xl border border-black/12 lg:min-h-[470px] lg:grid-cols-[0.46fr_0.54fr] lg:overflow-hidden xl:min-h-[510px]">
            <article className="gradient-brand flex flex-col justify-between px-6 py-5 text-primary-foreground sm:px-9 sm:py-7 lg:px-10 lg:py-7">
              <div>
                <p className="editorial-kicker text-primary-foreground/68">Kebab turco / Rivas-Vaciamadrid</p>
                <h1 className="mt-3 font-display text-[clamp(3.15rem,6.4vw,5.45rem)] leading-[0.88] text-primary-foreground">
                  Kebabs, platos, raciones y burgers.
                </h1>
                <p className="mt-3 max-w-md text-[15px] leading-6 text-primary-foreground/78 sm:text-base sm:leading-7">
                  Carta completa con kebabs, shawarmas, platos, raciones, hamburguesas, bocadillos, postres y bebidas.
                  Puedes ver precios y alergenos antes de pedir.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild className="h-10 border border-gold bg-gold px-5 text-[11px] font-semibold uppercase tracking-[0.26em] text-gold-foreground hover:bg-gold/90">
                    <Link to="/carta">
                      Ver carta
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-10 border border-white/18 bg-white/10 px-5 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary-foreground hover:bg-white/16"
                  >
                    <Link to="/contacto">Contacto</Link>
                  </Button>
                </div>
              </div>

              <div className="mt-6 border-t border-white/14 pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-foreground/68">Pedidos</p>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <a
                    href={`tel:${restaurantInfo.phone}`}
                    className="font-display text-[1.95rem] leading-none text-primary-foreground hover:text-primary-foreground/78 sm:text-[2.15rem]"
                  >
                    91 713 99 80
                  </a>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/68">
                    Local, recogida y domicilio
                  </p>
                </div>
              </div>
            </article>

            <article className="grid bg-black lg:grid-rows-[minmax(0,1fr)_auto]">
              <div className="bg-[#f4ecde] p-3 sm:p-4">
                <div className="border border-black/10 bg-white p-2 sm:p-3">
                  <InstagramFeedEmbed
                    widgetUrl={restaurantInfo.lightwidgetEmbedUrl}
                    profileUrl={restaurantInfo.instagramProfileUrl}
                    iframeClassName="min-h-[360px] sm:min-h-[420px] lg:min-h-[520px]"
                    fallbackClassName="min-h-[360px] sm:min-h-[420px] lg:min-h-[520px]"
                  />
                </div>
              </div>

              <div className="grid gap-3 border-t border-white/10 px-4 pb-4 pt-4 text-white sm:px-7 sm:pb-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-6 xl:px-8">
                <div>
                  <p className="editorial-kicker text-white/72">Instagram del local</p>
                  <p className="mt-2 max-w-[20rem] font-display text-[2.2rem] leading-none sm:max-w-[22rem] sm:text-[2.55rem] lg:max-w-[19rem] lg:text-[2.2rem] xl:max-w-[21rem] xl:text-[2.45rem]">
                    {instagramHandle || "Publicaciones de DejaVu Kebab."}
                  </p>
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/72">
                  Rivas-Vaciamadrid / fotos y reels del local
                </p>
              </div>
            </article>
          </div>

          <div id="destacados" className="-mt-px mx-auto max-w-7xl border border-black/12 bg-[#f4ecde] px-4 py-4 sm:px-6 sm:py-5 lg:px-7 lg:py-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="editorial-kicker text-black/55">Lo mas pedido</p>
                <h2 className="mt-2 font-display text-[clamp(2.15rem,5vw,3.75rem)] leading-[0.9] text-black">
                  Lo mas pedido del local.
                </h2>
                <p className="mt-2 max-w-2xl text-[13px] leading-5 text-black/66 sm:text-[14px] sm:leading-6">
                  Una seleccion rapida con lo que mas se pide.
                </p>
              </div>

              <Link
                to="/carta"
                className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/55 transition-colors hover:text-black"
              >
                Ver carta completa
              </Link>
            </div>

            <Carousel
              opts={{ align: "start", loop: topSellingProducts.length > 3 }}
              className="mt-5"
              aria-label="Carrusel de platos mas pedidos"
            >
              <CarouselContent className="-ml-0 sm:-ml-3 md:-ml-4">
                {topSellingProducts.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-full pl-0 sm:basis-[58%] sm:pl-3 md:basis-1/2 md:pl-4 lg:basis-1/3"
                  >
                    <Link
                      to={`/carta?producto=${encodeURIComponent(product.id)}`}
                      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                      aria-label={`Ver ${product.name} dentro de la carta`}
                    >
                      <article className="h-full overflow-hidden border border-black/12 bg-white transition-transform duration-300 group-hover:-translate-y-1">
                        <div className="relative aspect-[1.18/1] overflow-hidden bg-black">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              width={720}
                              height={640}
                            />
                          ) : (
                            <div className="flex h-full w-full items-end bg-[radial-gradient(circle_at_top,_rgba(196,152,73,0.34),_rgba(27,20,16,0.98)_70%)] p-4 text-white">
                              <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/72">Sin foto disponible</p>
                                <p className="mt-2 max-w-[12rem] font-display text-[2rem] leading-none">{product.name}</p>
                              </div>
                            </div>
                          )}
                          <div className="gradient-overlay absolute inset-0" />
                          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                            {product.bestseller ? (
                              <Badge className="border-0 bg-gold px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-gold-foreground">
                                Top ventas
                              </Badge>
                            ) : null}
                            {product.featured ? (
                              <Badge className="border-0 bg-black/80 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white">
                                Destacado
                              </Badge>
                            ) : null}
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 text-white">
                            <div className="min-w-0">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">{product.highlight}</p>
                              <h3 className="mt-1 font-display text-[1.8rem] leading-none">{product.name}</h3>
                            </div>
                            <p
                              className={
                                product.priceLabel
                                  ? "max-w-[11rem] shrink-0 text-right text-[0.75rem] font-semibold leading-4"
                                  : "shrink-0 font-display text-[1.8rem] leading-none"
                              }
                            >
                              {formatProductPrice(product)}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4 px-4 py-4 sm:px-5">
                          <p className="text-[13px] leading-6 text-black/72">{product.description}</p>

                          <div className="flex flex-wrap gap-2">
                            {product.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="border-black/12 bg-muted/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-black/70"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/48 transition-colors group-hover:text-black">
                            Ver en carta
                          </p>
                        </div>
                      </article>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="mt-4 flex items-center justify-end gap-2 pr-10 sm:pr-12">
                <CarouselPrevious className="static translate-y-0 border-black/12 bg-white text-black hover:bg-black hover:text-white" />
                <CarouselNext className="static translate-y-0 border-black/12 bg-white text-black hover:bg-black hover:text-white" />
              </div>
            </Carousel>
          </div>
        </section>

        <section id="manifiesto" className="px-5 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:h-[640px] lg:items-stretch lg:grid-cols-[0.48fr_0.52fr] lgplus:h-[670px] xl:h-[700px]">
            <article className="bg-primary px-5 py-5 text-primary-foreground sm:px-6 sm:py-6 lg:flex lg:h-full lg:flex-col lg:justify-between lg:overflow-hidden">
              <div>
                <p className="editorial-kicker text-gold">Nosotros</p>
                <h2 className="mt-2 font-display text-[clamp(2.1rem,4.2vw,3.25rem)] leading-[0.88]">
                  Kebab, platos y raciones hechos al momento.
                </h2>
                <p className="mt-2.5 max-w-xl text-[13px] leading-5 text-primary-foreground/74 sm:text-[14px] sm:leading-5">
                  En DejaVu hacemos kebabs, platos, raciones, hamburguesas y menus para local, recogida o domicilio.
                </p>
              </div>

              <ul className="mt-4 grid gap-2 lg:mt-5">
                {housePrinciples.map((point) => (
                  <li key={point} className="border-t border-white/12 pt-2 text-[10px] font-medium uppercase tracking-[0.1em] text-primary-foreground/86 sm:text-[11px]">
                    {point}
                  </li>
                ))}
              </ul>
            </article>

            <div className="grid overflow-hidden border border-black/12 lg:h-full lg:min-h-0 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
              <VenueGallery
                className="h-full"
                viewportClassName="h-[350px] sm:h-[400px] lg:h-full"
                showPagination={false}
                compact
              />

              <div className="grid h-full min-h-0 md:grid-cols-[0.58fr_0.42fr]">
                <article className="h-full bg-white px-4 py-4 sm:px-5 sm:py-5 lg:px-4 lg:py-4">
                  <p className="editorial-kicker text-black/55">La casa</p>
                  <div className="mt-2.5 grid gap-2 text-[11px] font-semibold uppercase tracking-[0.09em] text-black/78 sm:text-[12px]">
                    <p className="border-t border-black/10 pt-2">Carne al corte y a la plancha</p>
                    <p className="border-t border-black/10 pt-2">Pan, salsas y extras al momento</p>
                    <p className="border-t border-black/10 pt-2">Local, recogida y reparto</p>
                  </div>
                </article>

                <article className="h-full bg-gold px-4 py-4 text-gold-foreground sm:px-5 sm:py-5 lg:px-4 lg:py-4">
                  <p className="editorial-kicker text-black/55">Contacto rapido</p>
                  <div className="mt-2.5 space-y-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/76 sm:text-[11px] sm:tracking-[0.18em]">
                    <a href={`tel:${restaurantInfo.phone}`} className="block hover:text-black">
                      {restaurantInfo.phone}
                    </a>
                    <a href={mapsUrl} target="_blank" rel="noreferrer" className="block hover:text-black">
                      Ver ubicacion
                    </a>
                    <Link to="/carta" className="block hover:text-black">
                      Entrar a la carta
                    </Link>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="visitanos" className="px-5 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <article className="relative min-h-[560px] overflow-hidden border border-black/12">
              <img
                src={adanaImage}
                alt="Producto servido en primer plano"
                className="h-full w-full object-cover"
                width={1400}
                height={1200}
              />
              <div className="absolute inset-x-6 top-6 border border-black/12 bg-background px-6 py-6 sm:inset-x-8 sm:top-8 sm:px-8 sm:py-8">
                <p className="editorial-kicker text-black/55">Encuentranos</p>
                <h2 className="mt-3 font-display text-5xl leading-none text-black sm:text-6xl">Donde estamos y como pedir.</h2>

                <div className="mt-8 grid gap-5 text-[15px] font-semibold uppercase tracking-[0.12em] text-black/78">
                  <div className="grid gap-2 border-t border-black/10 pt-3 sm:grid-cols-[160px_1fr]">
                    <p>Direccion</p>
                    <div className="space-y-1 text-black">
                      <p>{restaurantInfo.address}</p>
                      <p>{restaurantInfo.city}</p>
                    </div>
                  </div>

                  <div className="grid gap-2 border-t border-black/10 pt-3 sm:grid-cols-[160px_1fr]">
                    <p>Telefono</p>
                    <a href={`tel:${restaurantInfo.phone}`} className="text-black hover:text-black/70">
                      91 713 99 80
                    </a>
                  </div>

                  <div className="grid gap-2 border-t border-black/10 pt-3 sm:grid-cols-[160px_1fr]">
                    <p>Reparto</p>
                    <p>{restaurantInfo.serviceAreas.join(", ")}</p>
                  </div>
                </div>
              </div>
            </article>

            <div className="space-y-6">
              <article className="bg-primary px-7 py-8 text-primary-foreground sm:px-10">
                <p className="editorial-kicker text-gold">Local</p>
                <h3 className="mt-4 font-display text-5xl leading-none sm:text-6xl">Sala, terraza y pedidos directos.</h3>
                <p className="mt-4 max-w-xl text-lg leading-8 text-primary-foreground/72">
                  Puedes llamar, pedir para recoger o venir a comer en el local o en la terraza. Tambien repartimos en
                  zonas cercanas.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild className="h-12 border border-gold bg-gold px-6 text-[11px] font-semibold uppercase tracking-[0.26em] text-gold-foreground hover:bg-gold/90">
                    <a href={`tel:${restaurantInfo.phone}`}>
                      <Phone className="h-4 w-4" />
                      Llamar
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 border border-white/18 bg-transparent px-6 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary-foreground hover:bg-white/8"
                  >
                    <a href={mapsUrl} target="_blank" rel="noreferrer">
                      <MapPin className="h-4 w-4" />
                      Ver mapa
                    </a>
                  </Button>
                </div>
              </article>

              <article className="border border-black/12 bg-white px-7 py-8 sm:px-10">
                <p className="editorial-kicker text-black/55">Horario</p>
                <div className="mt-5 grid gap-3">
                  {restaurantInfo.openingHours.map((slot) => (
                    <div key={slot.day} className="grid gap-1 border-t border-black/10 pt-3 text-[15px] font-semibold uppercase tracking-[0.12em] text-black/78 sm:grid-cols-[140px_1fr]">
                      <p>{slot.day}</p>
                      <p className="text-black">{slot.time}</p>
                    </div>
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

export default Index;
