"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import type { AboutItemConfig } from "../../../data/aboutConfig";
import { ABOUT_OVERLAY_ANIMATION } from "../../../data/aboutOverlayAnimationConfig";
import { AboutOverlayCard } from "../../AboutShared/AboutOverlayCard/AboutOverlayCard";

/** Durées pour la ligne de vie mobile */
const MOBILE_BAR_DURATION = 1;
const MOBILE_CARD_DURATION = 1;
/** Durée du scroll animé (GSAP) pour un défilement fluide */
const SCROLL_DURATION = 1.2;

type AboutMobileOverlayContentProps = {
  selectedItem: AboutItemConfig;
  isOpen: boolean;
  isClosing: boolean;
};

export function AboutMobileOverlayContent({
  selectedItem,
  isOpen,
  isClosing,
}: AboutMobileOverlayContentProps) {
  const t = useTranslations();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bar1Ref = useRef<HTMLDivElement>(null);
  const bar2Ref = useRef<HTMLDivElement>(null);
  const bar3Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const bar1 = bar1Ref.current;
    const bar2 = bar2Ref.current;
    const bar3 = bar3Ref.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    const card3 = card3Ref.current;
    if (
      !isOpen ||
      isClosing ||
      !container ||
      !bar1 ||
      !bar2 ||
      !bar3 ||
      !card1 ||
      !card2 ||
      !card3
    ) {
      return;
    }

    const { bar: barConfig, card: cardConfig } = ABOUT_OVERLAY_ANIMATION;
    const ease = barConfig.ease;

    gsap.set([bar1, bar2, bar3], { scaleY: 0 });
    gsap.set([card1, card2, card3], { opacity: 0, y: 8 });

    const getScrollTarget = (el: HTMLElement) => {
      const cr = container.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      const target =
        container.scrollTop +
        (er.top - cr.top) -
        cr.height / 2 +
        er.height / 2;
      const max = container.scrollHeight - container.clientHeight;
      return Math.max(0, Math.min(target, max));
    };

    const scrollToEl = (el: HTMLElement) => {
      const target = getScrollTarget(el);
      return gsap.to(container, {
        scrollTop: target,
        duration: SCROLL_DURATION,
        ease: "power2.inOut",
      });
    };

    const pause = (duration: number) => gsap.to({}, { duration });

    const tl = gsap.timeline({ overwrite: true });
    tl.to(bar1, { scaleY: 1, duration: MOBILE_BAR_DURATION, ease })
      .to(card1, { opacity: 1, y: 0, duration: MOBILE_CARD_DURATION, ease: cardConfig.ease })
      .add(() => scrollToEl(bar2))
      .add(pause(SCROLL_DURATION))
      .to(bar2, { scaleY: 1, duration: MOBILE_BAR_DURATION, ease })
      .add(() => scrollToEl(card2))
      .add(pause(SCROLL_DURATION))
      .to(card2, { opacity: 1, y: 0, duration: MOBILE_CARD_DURATION, ease: cardConfig.ease })
      .add(() => scrollToEl(bar3))
      .add(pause(SCROLL_DURATION))
      .to(bar3, { scaleY: 1, duration: MOBILE_BAR_DURATION, ease })
      .add(() => scrollToEl(card3))
      .add(pause(SCROLL_DURATION))
      .to(card3, { opacity: 1, y: 0, duration: MOBILE_CARD_DURATION, ease: cardConfig.ease })
      .add(() => scrollToEl(card3))
      .add(pause(SCROLL_DURATION));
  }, [isOpen, isClosing]);

  return (
    <div
      ref={scrollContainerRef}
      className="absolute inset-0 top-14 z-10 overflow-y-auto pb-8 pt-6"
    >
      <div className="flex flex-col items-center gap-6 px-4">
        <div
          ref={bar1Ref}
          className="about-overlay-bar h-[72px] shrink-0 bg-white/40"
          aria-hidden
        />
        <div ref={card1Ref} className="w-full max-w-[280px] shrink-0">
          <AboutOverlayCard
            title={t(`${selectedItem.sectionKeys[0]}.title`)}
            description={t(`${selectedItem.sectionKeys[0]}.description`)}
          />
        </div>
        <div
          ref={bar2Ref}
          className="about-overlay-bar h-[72px] shrink-0 bg-white/40"
          aria-hidden
        />
        <div ref={card2Ref} className="w-full max-w-[280px] shrink-0">
          <AboutOverlayCard
            title={t(`${selectedItem.sectionKeys[1]}.title`)}
            description={t(`${selectedItem.sectionKeys[1]}.description`)}
          />
        </div>
        <div
          ref={bar3Ref}
          className="about-overlay-bar h-[72px] shrink-0 bg-white/40"
          aria-hidden
        />
        <div ref={card3Ref} className="w-full max-w-[280px] shrink-0">
          <AboutOverlayCard
            title={t(`${selectedItem.sectionKeys[2]}.title`)}
            description={t(`${selectedItem.sectionKeys[2]}.description`)}
          />
        </div>
      </div>
    </div>
  );
}
