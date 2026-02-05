"use client";

import { useEffect, useState } from "react";

/**
 * Retourne true si l'utilisateur préfère des animations réduites (accessibilité).
 * S'abonne aux changements de la préférence système.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const id = requestAnimationFrame(() => {
      setPrefersReducedMotion(mediaQuery.matches);
    });

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => {
      cancelAnimationFrame(id);
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  return prefersReducedMotion;
}
