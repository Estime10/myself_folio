"use client";

import type { AboutItemConfig } from "../../../data/aboutConfig";
import { useAboutOverlay } from "../../../hooks/useAboutOverlay";
import { useLockBodyScroll } from "@/lib/hooks/useLockBodyScroll";
import { AboutCardsGrid } from "../AboutCardsGrid/AboutCardsGrid";
import { AboutMobileOverlay } from "../AboutMobileOverlay/AboutMobileOverlay";


type AboutCardsColumnProps = {
  items?: AboutItemConfig[];
};

export function AboutCardsColumn({ items = [] }: AboutCardsColumnProps) {
  const overlay = useAboutOverlay();

  useLockBodyScroll(overlay.isOpen);

  return (
    <>
      <AboutCardsGrid items={items} onCardClick={overlay.open} />
      {overlay.isOpen && (
        <div className="min-[1220px]:hidden">
          <AboutMobileOverlay
            selectedItem={overlay.selectedItem}
            isClosing={overlay.isClosing}
            onRequestClose={overlay.requestClose}
            onAnimationEnd={overlay.handleAnimationEnd}
          />
        </div>
      )}
    </>
  );
}
