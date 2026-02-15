"use client";

import { useState, useCallback } from "react";
import type { AboutItemConfig } from "../data/aboutConfig";

export type UseAboutOverlayReturn = {
  isOpen: boolean;
  selectedItem: AboutItemConfig | null;
  isClosing: boolean;
  open: (item?: AboutItemConfig) => void;
  close: () => void;
  requestClose: () => void;
  handleAnimationEnd: (e: React.AnimationEvent<HTMLDivElement>) => void;
};

/**
 * État et actions pour l’overlay About (mobile simple + desktop avec contenu).
 * - open(item?) : ouvre l’overlay ; si item fourni, selectedItem est utilisé (desktop).
 * - close() : ferme immédiatement (desktop appelle ça via onClose après anim).
 * - requestClose() + handleAnimationEnd : pour overlay avec fade-out CSS (mobile).
 */
export function useAboutOverlay(): UseAboutOverlayReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AboutItemConfig | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const open = useCallback((item?: AboutItemConfig) => {
    setSelectedItem(item ?? null);
    setIsOpen(true);
    setIsClosing(false);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSelectedItem(null);
    setIsClosing(false);
  }, []);

  const requestClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
  }, [isClosing]);

  const handleAnimationEnd = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      if (e.animationName.includes("fade-out")) {
        setIsClosing(false);
        setIsOpen(false);
        setSelectedItem(null);
      }
    },
    []
  );

  return {
    isOpen,
    selectedItem,
    isClosing,
    open,
    close,
    requestClose,
    handleAnimationEnd,
  };
}
