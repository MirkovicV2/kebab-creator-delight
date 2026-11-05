import { useEffect } from "react";

import { getInstagramHandle, normalizeExternalUrl } from "@/features/marketing/lib/instagram";
import { cn } from "@/shared/lib/utils";

interface InstagramFeedEmbedProps {
  widgetUrl?: string;
  profileUrl?: string;
  iframeClassName?: string;
  fallbackClassName?: string;
}

const scriptUrl = "https://cdn.lightwidget.com/widgets/lightwidget.js";

export function InstagramFeedEmbed({ widgetUrl, profileUrl, iframeClassName, fallbackClassName }: InstagramFeedEmbedProps) {
  const url = normalizeExternalUrl(widgetUrl);

  useEffect(() => {
    if (!url || document.querySelector(`script[src="${scriptUrl}"]`)) return;
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    document.body.appendChild(script);
  }, [url]);

  if (!url) {
    return (
      <div className={cn("flex min-h-[420px] items-end border border-dashed border-black/18 bg-white p-5 sm:p-6", fallbackClassName)}>
        <div>
          <p className="font-display text-[2.2rem] leading-none text-black">Síguenos en Instagram.</p>
          <a href={profileUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-black/70 underline">
            {getInstagramHandle(profileUrl) || "DejaVu Kebab"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <iframe
      title="Publicaciones de Instagram de DejaVu Kebab"
      src={url}
      scrolling="no"
      allowTransparency
      className={cn("lightwidget-widget min-h-[420px] w-full overflow-hidden border-0", iframeClassName)}
    />
  );
}
