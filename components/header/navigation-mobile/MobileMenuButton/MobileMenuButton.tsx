"use client";

import gsap from "gsap";
import { useRef, useEffect } from "react";
import { useNavigation } from "../../hooks/useNavigation";

export function MobileMenuButton() {
  const { isMobileMenuOpen, toggleMobileMenu } = useNavigation();
  const topLineRef = useRef<HTMLSpanElement>(null);
  const middleLineRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const top = topLineRef.current;
    const middle = middleLineRef.current;
    const bottom = bottomLineRef.current;
    if (!top || !middle || !bottom) return;

    const duration = 0.25;
    const ease = "power2.inOut";

    if (isMobileMenuOpen) {
      gsap.timeline().to(top, {
        y: 6,
        rotate: 45,
        duration,
        ease,
      }).to(middle, {
        opacity: 0,
        duration: duration * 0.5,
        ease,
      }, 0).to(bottom, {
        y: -6,
        rotate: -45,
        duration,
        ease,
      }, 0);
    } else {
      gsap.timeline().to(top, {
        y: 0,
        rotate: 0,
        duration,
        ease,
      }).to(middle, {
        opacity: 1,
        duration: duration * 0.5,
        ease,
        delay: duration * 0.25,
      }, 0).to(bottom, {
        y: 0,
        rotate: 0,
        duration,
        ease,
      }, 0);
    }
  }, [isMobileMenuOpen]);

  return (
    <button
      type="button"
      onClick={toggleMobileMenu}
      className="flex flex-col justify-center gap-1.5 w-10 h-10 p-2 rounded-lg tap-highlight-transparent"
      aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={isMobileMenuOpen}
    >
      <span
        ref={topLineRef}
        className="block w-6 h-0.5 bg-current rounded-full origin-center"
      />
      <span
        ref={middleLineRef}
        className="block w-6 h-0.5 bg-current rounded-full origin-center"
      />
      <span
        ref={bottomLineRef}
        className="block w-6 h-0.5 bg-current rounded-full origin-center"
      />
    </button>
  );
}
