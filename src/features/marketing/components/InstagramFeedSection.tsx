import { ArrowRight } from "lucide-react";
import { useEffect, useMemo } from "react";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

const LIGHTWIDGET_SCRIPT_SRC = "https://cdn.lightwidget.com/widgets/lightwidget.js";

interface InstagramFeedSectionProps {
  widgetUrl?: string;
  profileUrl?: string;
}

interface InstagramFeedEmbedProps {
  widgetUrl?: string;
  profileUrl?: string;
  iframeClassName?: string;
  fallbackClassName?: string;
}

function normalizeExternalUrl(value?: string) {
  if (!value) {
    return "";
  }

  if (value.startsWith("//")) {
    return `https:${value}`;
  }

  return value;
}

export function getInstagramHandle(profileUrl?: string) {
  const normalizedUrl = normalizeExternalUrl(profileUrl);

  if (!normalizedUrl) {
    return "";
  }

  try {
    const { pathname } = new URL(normalizedUrl);
    const [handle] = pathname.split("/").filter(Boolean);

    return handle ? `@${handle}` : "";
  } catch {
    return "";
  }
}

function ensureLightwidgetScript() {
  if (typeof document === "undefined") {
    return;
  }

  const existingScript = document.querySelector(`script[src="${LIGHTWIDGET_SCRIPT_SRC}"]`);

  if (existingScript) {
    return;
  }

  const script = document.createElement("script");
  script.src = LIGHTWIDGET_SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
}

export const InstagramFeedEmbed = ({
  widgetUrl,
  profileUrl,
  iframeClassName,
  fallbackClassName,
}: InstagramFeedEmbedProps) => {
  const normalizedWidgetUrl = useMemo(() => normalizeExternalUrl(widgetUrl), [widgetUrl]);
  const instagramHandle = useMemo(() => getInstagramHandle(profileUrl), [profileUrl]);

  useEffect(() => {
    if (!normalizedWidgetUrl) {
      return;
    }

    ensureLightwidgetScript();
  }, [normalizedWidgetUrl]);

  if (!normalizedWidgetUrl) {
    return (
      <div
        className={cn(
          "flex min-h-[420px] items-end border border-dashed border-black/18 bg-white p-5 sm:p-6",
          fallbackClassName,
        )}
      >
        <div className="max-w-lg">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/48">LightWidget</p>
          <p className="mt-3 font-display text-[2.2rem] leading-none text-black sm:text-[2.7rem]">
            {instagramHandle ? `Perfil listo para ${instagramHandle}.` : "El hueco del feed ya esta preparado."}
          </p>
          <p className="mt-4 text-[14px] leading-6 text-black/66 sm:text-[15px] sm:leading-7">
            En cuanto pegues la URL del iframe generado por LightWidget en los datos del restaurante, esta seccion
            mostrara las publicaciones reales y cargara el script necesario para ajustar la altura.
          </p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      title="Publicaciones de Instagram de DejaVu Kebab"
      src={normalizedWidgetUrl}
      scrolling="no"
      allowtransparency="true"
      className={cn("lightwidget-widget min-h-[420px] w-full overflow-hidden border-0", iframeClassName)}
    />
  );
};

const InstagramFeedSection = ({ widgetUrl, profileUrl }: InstagramFeedSectionProps) => {
  const normalizedWidgetUrl = useMemo(() => normalizeExternalUrl(widgetUrl), [widgetUrl]);
  const normalizedProfileUrl = useMemo(() => normalizeExternalUrl(profileUrl), [profileUrl]);
  const instagramHandle = useMemo(() => getInstagramHandle(profileUrl), [profileUrl]);
  const isSetupPreview = import.meta.env.DEV && !normalizedWidgetUrl;

  if (!normalizedWidgetUrl && !normalizedProfileUrl && !isSetupPreview) {
    return null;
  }

  return (
    <section id="instagram" className="px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl border border-black/12 bg-white">
        <div className="grid gap-0 lg:grid-cols-[0.34fr_0.66fr]">
          <article className="flex flex-col justify-between border-b border-black/12 bg-primary px-5 py-6 text-primary-foreground sm:px-7 sm:py-8 lg:min-h-[540px] lg:border-b-0 lg:border-r lg:border-white/10">
            <div>
              <p className="editorial-kicker text-gold">Instagram</p>
              <h2 className="mt-3 font-display text-[clamp(2.4rem,4.8vw,4.6rem)] leading-[0.9]">
                Lo ultimo que sale desde el local.
              </h2>
              <p className="mt-4 max-w-md text-[14px] leading-6 text-primary-foreground/74 sm:text-[15px] sm:leading-7">
                Publicaciones del perfil integradas con LightWidget para que el feed cargue dentro de la web sin sacar
                al usuario del recorrido principal.
              </p>

              {instagramHandle ? (
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  {instagramHandle}
                </p>
              ) : null}
            </div>

            <div className="mt-6 space-y-3 border-t border-white/12 pt-4">
              {normalizedProfileUrl ? (
                <Button asChild className="h-11 border border-gold bg-gold px-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-foreground hover:bg-gold/90">
                  <a href={normalizedProfileUrl} target="_blank" rel="noreferrer">
                    Abrir Instagram
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/56">
                {normalizedWidgetUrl
                  ? "Widget responsive cargado desde LightWidget"
                  : "Falta pegar la URL real del widget en restaurantInfo.lightwidgetEmbedUrl"}
              </p>
            </div>
          </article>

          <div className="bg-[#f4ecde] p-4 sm:p-5 lg:p-6">
            <div className="border border-black/10 bg-white p-3 sm:p-4">
              <InstagramFeedEmbed widgetUrl={widgetUrl} profileUrl={profileUrl} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeedSection;
