"use client";

import { AppLink } from "@/components/page-transition";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useLayoutEffect } from "react";
import { navigationItems } from "@/features/navigation";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useNavigation } from "../../hooks/useNavigation";

const OVERLAY_DURATION = 0.28;
const PANEL_DURATION = 0.42;
const PANEL_EASE = "power3.out";
const ITEM_STAGGER_DELAY = 0.05;
const ITEM_DURATION = 0.32;
const ITEM_OFFSET_Y = 14;

export function MobileMenuWrapper() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const { isMobileMenuOpen, closeMobileMenu } = useNavigation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
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

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();
      tl.to(overlay, {
        opacity: 1,
        pointerEvents: "auto",
        duration: overlayDur,
        ease: "power2.out",
      }, 0)
        .to(panel, {
          xPercent: 0,
          duration: panelDur,
          ease: PANEL_EASE,
        }, 0.06);

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
        tl.to(items, {
          opacity: 0,
          y: -ITEM_OFFSET_Y * 0.5,
          duration: itemDur * 0.6,
          stagger: stagger * 0.5,
          ease: "power2.in",
        }, 0);
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
  }, [isMobileMenuOpen, reducedMotion]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        onClick={closeMobileMenu}
        aria-hidden
      />
      <div
        ref={panelRef}
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[min(320px,85vw)] glass-strong rounded-l-2xl p-6 pt-[calc(1.5rem+env(safe-area-inset-top))] lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        <nav
          ref={navRef}
          className="flex flex-col gap-1 mt-8"
        >
          {navigationItems.map((item) => {
            const key = item.translationKey.replace("common.", "");
            const isActive = pathname === item.href;
            return isActive ? (
              <span
                key={item.href}
                className="block py-3 px-2 text-lg font-medium rounded-lg text-accent-primary uppercase"
                aria-current="page"
              >
                {t(key)}
              </span>
            ) : (
              <AppLink
                key={item.href}
                href={item.href}
                className="block py-3 px-2 text-lg font-medium rounded-lg transition-colors lg:hover:bg-white/10 lg:hover:text-accent-primary uppercase "
                onNavigate={closeMobileMenu}
              >
                {t(key)}
              </AppLink>
            );
          })}
        </nav>
      </div>
    </>
  );
}
