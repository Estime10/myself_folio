"use client";

import { useState, useCallback } from "react";

export type UseClosingTransitionReturn = {
  isClosing: boolean;
  requestClose: () => void;
  handleAnimationEnd: (e: React.AnimationEvent<HTMLDivElement>) => void;
};

/**
 * Gère la transition de fermeture : requestClose() démarre l’anim,
 * handleAnimationEnd(fade-out) appelle onClose.
 */
export function useClosingTransition(
  onClose: () => void
): UseClosingTransitionReturn {
  const [isClosing, setIsClosing] = useState(false);

  const requestClose = useCallback(() => {
    setIsClosing(true);
  }, []);

  const handleAnimationEnd = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      if (e.animationName.includes("fade-out")) {
        onClose();
      }
    },
    [onClose]
  );

  return { isClosing, requestClose, handleAnimationEnd };
}
