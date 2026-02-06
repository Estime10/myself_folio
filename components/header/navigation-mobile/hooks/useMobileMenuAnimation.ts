"use client";

import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

const OVERLAY_DURATION = 0.28;
const PANEL_DURATION = 0.42;
const PANEL_EASE = "power3.out";
const ITEM_STAGGER_DELAY = 0.05;
const ITEM_DURATION = 0.32;
const ITEM_OFFSET_Y = 14;

type UseMobileMenuAnimationArgs = {
  isOpen: boolean;
};

type UseMobileMenuAnimationResult = {
  overlayRef: RefObject<HTMLDivElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  navRef: RefObject<HTMLElement | null>;
};

export function useMobileMenuAnimation({
  isOpen,
}: UseMobileMenuAnimationArgs): UseMobileMenuAnimationResult {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const nav = navRef.current;
    if (!overlay || !panel) return;

    gsap.set(overlay, { opacity: 0, pointerEvents: "none" });
    gsap.set(panel, { xPercent: 100 });
    if (nav) {
      const items = Array.from(nav.children);
      gsap.set(items, { opacity: 0, y: ITEM_OFFSET_Y });
    }
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const nav = navRef.current;
    if (!overlay || !panel) return;

    const overlayDur = reducedMotion ? 0.01 : OVERLAY_DURATION;
    const panelDur = reducedMotion ? 0.01 : PANEL_DURATION;
    const stagger = reducedMotion ? 0 : ITEM_STAGGER_DELAY;
    const itemDur = reducedMotion ? 0.01 : ITEM_DURATION;

    if (isOpen) {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();
      tl.to(
        overlay,
        {
          opacity: 1,
          pointerEvents: "auto",
          duration: overlayDur,
          ease: "power2.out",
        },
        0
      ).to(
        panel,
        {
          xPercent: 0,
          duration: panelDur,
          ease: PANEL_EASE,
        },
        0.06
      );

      if (nav && !reducedMotion) {
        const items = Array.from(nav.children);
        tl.to(
          items,
          {
            opacity: 1,
            y: 0,
            duration: itemDur,
            stagger,
            ease: "power2.out",
          },
          panelDur * 0.35
        );
      } else if (nav && reducedMotion) {
        gsap.set(nav.children, { opacity: 1, y: 0 });
      }
    } else {
      const tl = gsap.timeline();
      if (nav && !reducedMotion) {
        const items = Array.from(nav.children);
        tl.to(
          items,
          {
            opacity: 0,
            y: -ITEM_OFFSET_Y * 0.5,
            duration: itemDur * 0.6,
            stagger: stagger * 0.5,
            ease: "power2.in",
          },
          0
        );
      }
      tl.to(
        overlay,
        {
          opacity: 0,
          pointerEvents: "none",
          duration: overlayDur,
          ease: "power2.in",
        },
        0
      ).to(
        panel,
        {
          xPercent: 100,
          duration: panelDur,
          ease: "power3.in",
        },
        0
      );
      tl.eventCallback("onComplete", () => {
        document.body.style.overflow = "";
        if (nav) gsap.set(nav.children, { opacity: 0, y: ITEM_OFFSET_Y });
      });
    }
  }, [isOpen, reducedMotion]);

  return {
    overlayRef,
    panelRef,
    navRef,
  };
}
