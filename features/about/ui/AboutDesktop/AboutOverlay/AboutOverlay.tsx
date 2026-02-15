"use client";

import { useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { AboutOverlayCard } from "../../AboutShared/AboutOverlayCard/AboutOverlayCard";
import { AboutOverlayShell } from "../../AboutShared/AboutOverlayShell/AboutOverlayShell";
import { useAboutOverlayRevealAnimation } from "../../../hooks/useAboutOverlayRevealAnimation";
import { ABOUT_OVERLAY_ANIMATION } from "../../../data/aboutOverlayAnimationConfig";

type AboutOverlayProps = {
  titleKey: string;
  sectionKeys: [string, string, string];
  isClosing: boolean;
  requestClose: () => void;
  handleAnimationEnd: (e: React.AnimationEvent<HTMLDivElement>) => void;
};

const BAR_HEIGHT = ABOUT_OVERLAY_ANIMATION.bar.height;

export function AboutOverlay({
  titleKey,
  sectionKeys,
  isClosing,
  requestClose,
  handleAnimationEnd,
}: AboutOverlayProps) {
  const t = useTranslations();
  const closeLabel = t("contact.close");

  const verticalLineRef = useRef<HTMLDivElement>(null);
  const horizontalLineRef = useRef<HTMLDivElement>(null);
  const barLeftRef = useRef<HTMLDivElement>(null);
  const barCenterRef = useRef<HTMLDivElement>(null);
  const barRightRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardCenterRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);

  const refs = useMemo(
    () => ({
      vertical: verticalLineRef,
      horizontal: horizontalLineRef,
      barLeft: barLeftRef,
      barCenter: barCenterRef,
      barRight: barRightRef,
      cardLeft: cardLeftRef,
      cardCenter: cardCenterRef,
      cardRight: cardRightRef,
    }),
    []
  );

  useAboutOverlayRevealAnimation({ refs, isClosing, sectionKeys });

  return (
    <AboutOverlayShell
      title={t(titleKey)}
      closeLabel={closeLabel}
      isClosing={isClosing}
      onAnimationEnd={handleAnimationEnd}
      onRequestClose={requestClose}
      closeButtonVariant="text"
      ariaLabel={closeLabel}
    >
      <div
        ref={verticalLineRef}
        className="absolute left-1/2 top-14 z-[9] h-[calc(28vh-20px)] w-0.5 -translate-x-1/2 origin-top bg-white/40"
        aria-hidden
      />
      <div
        ref={horizontalLineRef}
        className="absolute left-[235px] right-[235px] top-[calc(3.5rem+28vh-20px)] z-[9] h-0.5 -translate-y-1/2 origin-center bg-white/40"
        aria-hidden
      />
      <div
        ref={barLeftRef}
        className="absolute left-[235px] top-[calc(3.5rem+28vh-20px)] z-[9] w-0.5 -translate-x-1/2 origin-top bg-white/40"
        style={{ height: BAR_HEIGHT }}
        aria-hidden
      />
      <div
        ref={barCenterRef}
        className="absolute left-1/2 top-[calc(3.5rem+28vh-20px)] z-[9] w-0.5 -translate-x-1/2 origin-top bg-white/40"
        style={{ height: BAR_HEIGHT }}
        aria-hidden
      />
      <div
        ref={barRightRef}
        className="absolute right-[235px] top-[calc(3.5rem+28vh-20px)] z-[9] w-0.5 -translate-x-1/2 origin-top bg-white/40"
        style={{ height: BAR_HEIGHT }}
        aria-hidden
      />
      <div
        ref={cardLeftRef}
        className="absolute left-[235px] top-[calc(3.5rem+28vh+32px)] z-10 -translate-x-1/2"
      >
        <AboutOverlayCard
          title={t(`${sectionKeys[0]}.title`)}
          description={t(`${sectionKeys[0]}.description`)}
        />
      </div>
      <div
        ref={cardCenterRef}
        className="absolute left-1/2 top-[calc(3.5rem+28vh+32px)] z-10 -translate-x-1/2"
      >
        <AboutOverlayCard
          title={t(`${sectionKeys[1]}.title`)}
          description={t(`${sectionKeys[1]}.description`)}
        />
      </div>
      <div
        ref={cardRightRef}
        className="absolute right-[235px] top-[calc(3.5rem+28vh+32px)] z-10 translate-x-1/2"
      >
        <AboutOverlayCard
          title={t(`${sectionKeys[2]}.title`)}
          description={t(`${sectionKeys[2]}.description`)}
        />
      </div>
    </AboutOverlayShell>
  );
}
