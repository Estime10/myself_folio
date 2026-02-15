"use client";

import type { AboutOverlayValue } from "../context/AboutOverlayContext";
import { useAboutOverlayContext } from "../context/AboutOverlayContext";

export type UseAboutOverlayReturn = AboutOverlayValue;

/**
 * État et actions pour l’overlay About (desktop + mobile).
 * Doit être utilisé dans un arbre enveloppé par AboutOverlayProvider.
 */
export function useAboutOverlay(): UseAboutOverlayReturn {
  return useAboutOverlayContext();
}
