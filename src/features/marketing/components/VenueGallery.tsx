import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { venueGalleryImages } from "@/features/marketing/data/venueGallery";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/shared/ui/carousel";

type VenueGalleryProps = {
  className?: string;
  viewportClassName?: string;
  imageClassName?: string;
  showCaption?: boolean;
  showPagination?: boolean;
  compact?: boolean;
  controlsPosition?: "top" | "bottom";
};

const VenueGallery = ({
  className,
  viewportClassName,
  imageClassName,
  showCaption = true,
  showPagination = true,
  compact = false,
  controlsPosition,
}: VenueGalleryProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [slideCount, setSlideCount] = React.useState(venueGalleryImages.length);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const syncSelection = () => {
      setSelectedIndex(api.selectedScrollSnap());
      setSlideCount(api.scrollSnapList().length);
    };

    syncSelection();
    api.on("select", syncSelection);
    api.on("reInit", syncSelection);

    return () => {
      api.off("select", syncSelection);
      api.off("reInit", syncSelection);
    };
  }, [api]);

  const activeImage = venueGalleryImages[selectedIndex] ?? venueGalleryImages[0];
  const resolvedControlsPosition = controlsPosition ?? (showCaption ? "top" : "bottom");

  return (
    <div className={cn(showPagination ? "space-y-4" : "", className)}>
      <div className={cn("relative overflow-hidden bg-[#efe4d2]", !showPagination && "h-full")}>
        <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="h-full w-full">
          <CarouselContent className="-ml-0 h-full">
            {venueGalleryImages.map((image, index) => (
              <CarouselItem key={image.src} className="h-full pl-0">
                <figure className={cn("relative h-[320px] sm:h-[380px]", !showPagination && "h-full", viewportClassName)}>
                  <img
                    src={image.src}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl"
                    width={image.width}
                    height={image.height}
                  />
                  <div className="absolute inset-0 bg-[#1a1510]/28" />
                  <div
                    className={cn(
                      "relative z-[1] flex h-full w-full items-center justify-center p-4 sm:p-6",
                      compact && "p-2 sm:p-3",
                    )}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading={index === 0 ? "eager" : "lazy"}
                      className={cn("max-h-full max-w-full object-contain object-center", imageClassName)}
                      width={image.width}
                      height={image.height}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 z-10 flex items-center justify-between p-4 sm:p-5",
            resolvedControlsPosition === "top" ? "top-0" : "bottom-0",
            compact && "p-2 sm:p-3",
          )}
        >
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className={cn(
              "pointer-events-auto h-10 w-10 rounded-full bg-white/88 text-black shadow-sm backdrop-blur hover:bg-white",
              compact && "h-7 w-7",
            )}
            onClick={() => api?.scrollPrev()}
            aria-label="Foto anterior"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div
            className={cn(
              "rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur",
              compact && "px-1.5 py-0.5 text-[7px]",
            )}
          >
            {String(selectedIndex + 1).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}
          </div>

          <Button
            type="button"
            variant="secondary"
            size="icon"
            className={cn(
              "pointer-events-auto h-10 w-10 rounded-full bg-white/88 text-black shadow-sm backdrop-blur hover:bg-white",
              compact && "h-7 w-7",
            )}
            onClick={() => api?.scrollNext()}
            aria-label="Foto siguiente"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {showCaption ? (
          <div className={cn("absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5", compact && "p-2 sm:p-3")}>
            <div
              className={cn(
                "max-w-xl border border-white/18 bg-black/58 px-4 py-4 text-white backdrop-blur-sm sm:px-5",
                compact && "max-w-[18rem] px-2 py-2 sm:max-w-[20rem] sm:px-3 sm:py-2.5",
              )}
            >
              <p className={cn("text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e8c48b]", compact && "text-[9px] tracking-[0.18em]")}>
                El local
              </p>
              <p className={cn("mt-2 font-display text-[1.9rem] leading-none sm:text-[2.2rem]", compact && "mt-1 text-[1.1rem] sm:text-[1.25rem]")}>
                {activeImage.title}
              </p>
              <p
                className={cn(
                  "mt-3 max-w-lg text-sm leading-6 text-white/78 sm:text-[15px]",
                  compact && "mt-1 text-[9px] leading-4 sm:text-[10px] sm:leading-[1rem]",
                )}
              >
                {activeImage.description}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {showPagination ? (
        <div className="flex flex-wrap items-center gap-2">
          {venueGalleryImages.map((image, index) => {
            const isActive = index === selectedIndex;

            return (
              <button
                key={image.src}
                type="button"
                onClick={() => api?.scrollTo(index)}
                className={cn("h-2 rounded-full transition-all", isActive ? "w-10 bg-black" : "w-2 bg-black/20 hover:bg-black/45")}
                aria-label={`Ir a la foto ${index + 1}: ${image.title}`}
                aria-current={isActive ? "true" : undefined}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default VenueGallery;
