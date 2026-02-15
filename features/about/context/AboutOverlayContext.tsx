"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { AboutItemConfig } from "../data/aboutConfig";

export type AboutOverlayValue = {
  isOpen: boolean;
  selectedItem: AboutItemConfig | null;
  isClosing: boolean;
  open: (item?: AboutItemConfig) => void;
  close: () => void;
  requestClose: () => void;
  handleAnimationEnd: (e: React.AnimationEvent<HTMLDivElement>) => void;
};

const AboutOverlayContext = createContext<AboutOverlayValue | null>(null);

type AboutOverlayProviderProps = {
  children: ReactNode;
};

/**
 * Fournit un état d’overlay unique pour la section About (desktop + mobile).
 * Évite le doublon d’état quand AboutImagesBlock et AboutCardsColumn sont montés en même temps.
 */
export function AboutOverlayProvider({ children }: AboutOverlayProviderProps) {
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
    setIsClosing((prev) => (prev ? prev : true));
  }, []);

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

  const value: AboutOverlayValue = {
    isOpen,
    selectedItem,
    isClosing,
    open,
    close,
    requestClose,
    handleAnimationEnd,
  };

  return (
    <AboutOverlayContext.Provider value={value}>
      {children}
    </AboutOverlayContext.Provider>
  );
}

export function useAboutOverlayContext(): AboutOverlayValue {
  const ctx = useContext(AboutOverlayContext);
  if (!ctx) {
    throw new Error(
      "useAboutOverlayContext must be used within AboutOverlayProvider"
    );
  }
  return ctx;
}
