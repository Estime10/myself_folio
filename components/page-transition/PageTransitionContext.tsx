"use client";

import { createContext, useContext } from "react";

export type PageTransitionContextValue = {
  /** Exécute la transition de sortie puis appelle le callback (ex: router.push). */
  runPageExitTransition: (callback: () => void) => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null
);

export function usePageTransitionContext(): PageTransitionContextValue {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      "usePageTransitionContext must be used within PageTransition"
    );
  }
  return ctx;
}

export { PageTransitionContext };
