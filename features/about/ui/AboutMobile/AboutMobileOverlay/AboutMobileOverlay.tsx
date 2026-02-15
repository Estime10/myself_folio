"use client";

import { useTranslations } from "next-intl";
import type { AboutItemConfig } from "../../../data/aboutConfig";
import { AboutOverlayShell } from "../../AboutShared/AboutOverlayShell/AboutOverlayShell";
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
  const closeLabel = t("contact.close");

  if (!selectedItem) return null;

  return (
    <AboutOverlayShell
      title={t(selectedItem.titleKey)}
      closeLabel={closeLabel}
      isClosing={isClosing}
      onAnimationEnd={onAnimationEnd}
      onRequestClose={onRequestClose}
      closeButtonVariant="icon"
      ariaLabel={t(selectedItem.titleKey)}
    >
      <AboutMobileOverlayContent
        selectedItem={selectedItem}
        isOpen
        isClosing={isClosing}
      />
    </AboutOverlayShell>
  );
}
