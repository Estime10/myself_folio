"use client";

import { useTranslations } from "next-intl";
import type { AboutItemConfig } from "../../../data/aboutConfig";
import { useAboutOverlay } from "../../../hooks/useAboutOverlay";
import { AboutImageCard } from "../AboutImageCard/AboutImageCard";
import { AboutOverlay } from "../AboutOverlay/AboutOverlay";

type AboutImagesBlockProps = {
  items: AboutItemConfig[];
};

export function AboutImagesBlock({ items }: AboutImagesBlockProps) {
  const t = useTranslations();
  const overlay = useAboutOverlay();

  return (
    <>
      <div className="hidden min-[1220px]:flex min-[1220px]:w-full min-[1220px]:shrink-0 min-[1220px]:h-[min(100vh,560px)] xl:h-[min(100vh,500px)] 2xl:h-[min(100vh,700px)] min-[1220px]:gap-3 min-[1220px]:px-4 min-[1220px]:pb-0">
        {items.map((item) => (
          <AboutImageCard
            key={item.id}
            image={item.image}
            title={t(item.titleKey)}
            onOpen={() => overlay.open(item)}
          />
        ))}
      </div>

      {overlay.isOpen && overlay.selectedItem && (
        <AboutOverlay
          titleKey={overlay.selectedItem.titleKey}
          sectionKeys={overlay.selectedItem.sectionKeys}
          onClose={overlay.close}
        />
      )}
    </>
  );
}
