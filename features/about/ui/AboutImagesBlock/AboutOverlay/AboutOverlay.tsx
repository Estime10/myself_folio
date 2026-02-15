"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";

type AboutOverlayProps = {
  onClose: () => void;
};

export function AboutOverlay({ onClose }: AboutOverlayProps) {
  const t = useTranslations();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
  }, [isClosing]);

  const handleAnimationEnd = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      if (e.animationName.includes("fade-out")) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div
      className={`about-overlay fixed inset-0 z-9998 bg-black/30 backdrop-blur-md ${isClosing ? "about-overlay--closing" : ""}`}
      aria-modal
      aria-label={t("contact.close")}
      role="dialog"
      onClick={handleClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        aria-label={t("contact.close")}
      >
        {t("contact.close")}
      </button>
    </div>
  );
}
