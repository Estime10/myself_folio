"use client";

import gsap from "gsap";
import { useRef, useEffect, useLayoutEffect } from "react";

const STRIP_COUNT = 8;
const STRIP_STAGGER = 0.08;
const STRIP_DURATION = 0.7;
const EASE = "power3.inOut";

type SliceOverlayProps = {
  /** Overlay affiché (couverture ou en cours de révélation). */
  visible: boolean;
  /** Déclencher l’animation de révélation (bandes qui partent). */
  runReveal: boolean;
  onRevealComplete: () => void;
  reducedMotion: boolean;
};

export function SliceOverlay({
  visible,
  runReveal,
  onRevealComplete,
  reducedMotion,
}: SliceOverlayProps) {
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!visible) return;
    const strips = stripRefs.current.filter(Boolean) as HTMLDivElement[];
    if (strips.length > 0) gsap.set(strips, { y: 0 });
  }, [visible]);

  useEffect(() => {
    if (!runReveal) return;

    const strips = stripRefs.current.filter(Boolean) as HTMLDivElement[];
    if (strips.length === 0) {
      onRevealComplete();
      return;
    }

    const duration = reducedMotion ? 0.01 : STRIP_DURATION;
    const stagger = reducedMotion ? 0 : STRIP_STAGGER;

    const tl = gsap.timeline({
      onComplete: onRevealComplete,
    });

    tl.to(strips, {
      y: "-100%",
      duration,
      stagger,
      ease: EASE,
      overwrite: true,
    });
  }, [runReveal, onRevealComplete, reducedMotion]);

  if (!visible) return null;

  return (
    <div
      className="page-slice-overlay fixed inset-0 z-[100] grid grid-rows-[repeat(8,1fr)] pointer-events-auto"
      aria-hidden
    >
      {Array.from({ length: STRIP_COUNT }, (_, i) => (
        <div key={i} className="overflow-hidden">
          <div
            ref={(el) => {
              stripRefs.current[i] = el;
            }}
            className="h-full w-full page-slice-strip"
            style={{ background: "var(--bg-primary)" }}
          />
        </div>
      ))}
    </div>
  );
}
