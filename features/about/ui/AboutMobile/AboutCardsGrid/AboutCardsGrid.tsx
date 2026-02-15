"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { AboutItemConfig } from "../../../data/aboutConfig";

type AboutCardsGridProps = {
  items: AboutItemConfig[];
  onCardClick: (item: AboutItemConfig) => void;
};

export function AboutCardsGrid({ items, onCardClick }: AboutCardsGridProps) {
  const t = useTranslations();

  return (
    <div className="grid w-full grid-cols-1 gap-4 px-4 pb-8 lg:grid-cols-2">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="group relative aspect-square w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10 text-left border-0 p-0 cursor-pointer"
          onClick={() => onCardClick(item)}
        >
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/60 backdrop-blur-[2px] pointer-events-none"
            aria-hidden
          >
            <span className="text-center text-lg font-semibold uppercase tracking-wide text-white">
              {t(item.titleKey)}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
