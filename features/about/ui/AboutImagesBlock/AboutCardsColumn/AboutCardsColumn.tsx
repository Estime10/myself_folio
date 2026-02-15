"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { AboutItemConfig } from "../../../data/aboutConfig";

type AboutCardsColumnProps = {
  items?: AboutItemConfig[];
};

export function AboutCardsColumn({ items = [] }: AboutCardsColumnProps) {
  const t = useTranslations();
  const list = items ?? [];

  return (
    <div className="grid w-full grid-cols-1 gap-4 px-4 pb-8 lg:grid-cols-2">
      {list.map((item) => (
        <div
          key={item.id}
          className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10"
        >
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Overlay léger + titre toujours visible (blur moins fort qu’AboutImageCard) */}
          <div
            className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/60 backdrop-blur-[2px]"
            aria-hidden
          >
            <span className="text-center text-lg font-semibold uppercase tracking-wide text-white">
              {t(item.titleKey)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
