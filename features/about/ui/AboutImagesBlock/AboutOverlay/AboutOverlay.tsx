"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";

type AboutOverlayProps = {
  titleKey: string;
  onClose: () => void;
};

const LINE_ANIMATION_DURATION = 1.2;
const LINE_ANIMATION_DELAY = 0.2;
const LINE_EASE = "power2.out";
const BAR_HEIGHT = 40;
const BAR_ANIMATION_DURATION = 0.5;

export function AboutOverlay({ titleKey, onClose }: AboutOverlayProps) {
  const t = useTranslations();
  const [isClosing, setIsClosing] = useState(false);
  const verticalLineRef = useRef<HTMLDivElement>(null);
  const horizontalLineRef = useRef<HTMLDivElement>(null);
  const barLeftRef = useRef<HTMLDivElement>(null);
  const barCenterRef = useRef<HTMLDivElement>(null);
  const barRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vertical = verticalLineRef.current;
    const horizontal = horizontalLineRef.current;
    const barLeft = barLeftRef.current;
    const barCenter = barCenterRef.current;
    const barRight = barRightRef.current;
    if (!vertical || !horizontal || !barLeft || !barCenter || !barRight || isClosing) return;

    gsap.set(vertical, { scaleY: 0 });
    gsap.set(horizontal, { scaleX: 0 });
    gsap.set([barLeft, barCenter, barRight], { scaleY: 0 });

    const tl = gsap.timeline({ overwrite: true });
    tl.to(vertical, {
      scaleY: 1,
      duration: LINE_ANIMATION_DURATION,
      delay: LINE_ANIMATION_DELAY,
      ease: LINE_EASE,
    })
      .to(horizontal, {
        scaleX: 1,
        duration: LINE_ANIMATION_DURATION,
        ease: LINE_EASE,
      })
      .to(barLeft, {
        scaleY: 1,
        duration: BAR_ANIMATION_DURATION,
        ease: LINE_EASE,
      })
      .to(barCenter, {
        scaleY: 1,
        duration: BAR_ANIMATION_DURATION,
        ease: LINE_EASE,
      })
      .to(barRight, {
        scaleY: 1,
        duration: BAR_ANIMATION_DURATION,
        ease: LINE_EASE,
      });
  }, [isClosing]);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
  }, [isClosing]);

  const handleAnimationEnd = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      if (e.animationName.includes("fade-out")) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div
      className={`about-overlay fixed inset-0 z-9998 bg-black/30 backdrop-blur-md ${isClosing ? "about-overlay--closing" : ""}`}
      aria-modal
      aria-label={t("contact.close")}
      role="dialog"
      onClick={handleClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        ref={verticalLineRef}
        className="absolute left-1/2 top-14 z-9 h-[calc(28vh-20px)] w-0.5 -translate-x-1/2 origin-top bg-white/40"
        aria-hidden
      />
      <div
        ref={horizontalLineRef}
        className="absolute left-1/2 top-[calc(3.5rem+28vh-20px)] z-9 h-0.5 w-[calc(100vw-170px)] max-w-full -translate-x-1/2 -translate-y-1/2 origin-center bg-white/40"
        aria-hidden
      />
      <div
        ref={barLeftRef}
        className="absolute left-[85px] top-[calc(3.5rem+28vh-20px)] z-9 w-0.5 -translate-x-1/2 origin-top bg-white/40"
        style={{ height: BAR_HEIGHT }}
        aria-hidden
      />
      <div
        ref={barCenterRef}
        className="absolute left-1/2 top-[calc(3.5rem+28vh-20px)] z-9 w-0.5 -translate-x-1/2 origin-top bg-white/40"
        style={{ height: BAR_HEIGHT }}
        aria-hidden
      />
      <div
        ref={barRightRef}
        className="absolute right-[85px] top-[calc(3.5rem+28vh-20px)] z-9 w-0.5 -translate-x-1/2 origin-top bg-white/40"
        style={{ height: BAR_HEIGHT }}
        aria-hidden
      />
      <h2 className="absolute left-1/2 top-6 z-10 -translate-x-1/2 text-lg font-semibold uppercase tracking-wide text-white">
        {t(titleKey)}
      </h2>
      <button
        type="button"
        className="absolute right-4 top-4 z-10 cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        aria-label={t("contact.close")}
      >
        {t("contact.close")}
      </button>
    </div>
  );
}
