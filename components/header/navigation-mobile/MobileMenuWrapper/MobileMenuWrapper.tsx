"use client";

import gsap from "gsap";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef, useEffect, useLayoutEffect } from "react";
import { navigationItems } from "@/features/navigation";
import { useNavigation } from "../../hooks/useNavigation";

export function MobileMenuWrapper() {
  const t = useTranslations("common");
  const { isMobileMenuOpen, closeMobileMenu } = useNavigation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    gsap.set(overlay, { opacity: 0, pointerEvents: "none" });
    gsap.set(panel, { xPercent: 100 });
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    const duration = 0.35;
    const ease = "power3.inOut";

    const tl = gsap.timeline();

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      tl.to(overlay, {
        opacity: 1,
        pointerEvents: "auto",
        duration,
        ease,
      }, 0).to(panel, {
        xPercent: 0,
        duration,
        ease,
      }, 0);
    } else {
      tl.to(overlay, {
        opacity: 0,
        pointerEvents: "none",
        duration,
        ease,
      }, 0).to(panel, {
        xPercent: 100,
        duration,
        ease,
      }, 0).eventCallback("onComplete", () => {
        document.body.style.overflow = "";
      });
    }
  }, [isMobileMenuOpen]);

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
        <nav className="flex flex-col gap-1 mt-8">
          {navigationItems.map((item) => {
            const key = item.translationKey.replace("common.", "");
            return (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 px-2 text-lg font-medium rounded-lg transition-colors hover:bg-white/10 hover:text-accent-primary"
                onClick={closeMobileMenu}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
