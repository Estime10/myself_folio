"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { AboutItemConfig } from "../../../data/aboutConfig";
import { AboutMobileOverlayContent } from "../AboutMobileOverlayContent/AboutMobileOverlayContent";

type AboutMobileOverlayProps = {
  selectedItem: AboutItemConfig | null;
  isClosing: boolean;
  onRequestClose: () => void;
  onAnimationEnd: (e: React.AnimationEvent<HTMLDivElement>) => void;
};

export function AboutMobileOverlay({
  selectedItem,
  isClosing,
  onRequestClose,
  onAnimationEnd,
}: AboutMobileOverlayProps) {
  const t = useTranslations();

  return (
    <div
      className={`about-overlay fixed inset-0 z-[9998] bg-black/30 backdrop-blur-md ${isClosing ? "about-overlay--closing" : ""}`}
      aria-modal
      role="dialog"
      aria-label={
        selectedItem ? t(selectedItem.titleKey) : t("contact.close")
      }
      onAnimationEnd={onAnimationEnd}
    >
      {selectedItem && (
        <>
          <h2 className="absolute left-1/2 top-6 z-10 -translate-x-1/2 text-lg font-semibold uppercase tracking-wide text-white">
            {t(selectedItem.titleKey)}
          </h2>
          <AboutMobileOverlayContent
            selectedItem={selectedItem}
            isOpen
            isClosing={isClosing}
          />
        </>
      )}
      <button
        type="button"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white outline-none"
        onClick={onRequestClose}
        aria-label={t("contact.close")}
      >
        <X className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}
