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

  return (
    <>
      <div className="hidden lg:flex lg:w-full lg:shrink-0 lg:h-[min(100vh,560px)] xl:h-[min(100vh,500px)] 2xl:h-[min(100vh,700px)] lg:gap-3 lg:px-4 lg:pb-0">
        {items.map(({ id, image, titleKey }) => (
          <AboutImageCard
            key={id}
            image={image}
            title={t(titleKey)}
            onOpen={() => setIsOverlayOpen(true)}
          />
        ))}
      </div>

      {isOverlayOpen && <AboutOverlay onClose={() => setIsOverlayOpen(false)} />}
    </>
  );
}
