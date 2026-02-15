"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { AboutItemConfig } from "../../../data/aboutConfig";
import { useAboutOverlay } from "../../../hooks/useAboutOverlay";
import { useLockBodyScroll } from "@/lib/hooks/useLockBodyScroll";

type AboutCardsColumnProps = {
  items?: AboutItemConfig[];
};

export function AboutCardsColumn({ items = [] }: AboutCardsColumnProps) {
  const t = useTranslations();
  const list = items ?? [];
  const overlay = useAboutOverlay();

  useLockBodyScroll(overlay.isOpen);

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 px-4 pb-8 lg:grid-cols-2">
        {list.map((item) => (
          <button
            key={item.id}
            type="button"
            className="group relative aspect-square w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10 text-left border-0 p-0 cursor-pointer"
            onClick={() => overlay.open()}
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
      {overlay.isOpen && (
        <div
          className={`about-overlay fixed inset-0 z-[9998] bg-black/30 backdrop-blur-md ${overlay.isClosing ? "about-overlay--closing" : ""}`}
          aria-modal
          role="dialog"
          aria-label={t("contact.close")}
          onAnimationEnd={overlay.handleAnimationEnd}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white outline-none"
            onClick={overlay.requestClose}
            aria-label={t("contact.close")}
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
      )}
    </>
  );
}
