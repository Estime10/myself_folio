"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { AboutItemConfig } from "../../data/aboutConfig";
import { AboutImageCard } from "./AboutImageCard/AboutImageCard";
import { AboutOverlay } from "./AboutOverlay/AboutOverlay";

type AboutImagesBlockProps = {
  items: AboutItemConfig[];
};

export function AboutImagesBlock({ items }: AboutImagesBlockProps) {
  const t = useTranslations();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AboutItemConfig | null>(null);

  const openOverlay = (item: AboutItemConfig) => {
    setSelectedItem(item);
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="hidden min-[1220px]:flex min-[1220px]:w-full min-[1220px]:shrink-0 min-[1220px]:h-[min(100vh,560px)] xl:h-[min(100vh,500px)] 2xl:h-[min(100vh,700px)] min-[1220px]:gap-3 min-[1220px]:px-4 min-[1220px]:pb-0">
        {items.map((item) => (
          <AboutImageCard
            key={item.id}
            image={item.image}
            title={t(item.titleKey)}
            onOpen={() => openOverlay(item)}
          />
        ))}
      </div>

      {isOverlayOpen && selectedItem && (
        <AboutOverlay
          titleKey={selectedItem.titleKey}
          sectionKeys={selectedItem.sectionKeys}
          onClose={closeOverlay}
        />
      )}
    </>
  );
}
