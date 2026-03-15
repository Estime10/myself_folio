"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ABOUT_OVERLAY_ANIMATION } from "../data/aboutOverlayAnimationConfig";

export type AboutOverlayRefs = {
  vertical: RefObject<HTMLDivElement | null>;
  horizontal: RefObject<HTMLDivElement | null>;
  barLeft: RefObject<HTMLDivElement | null>;
  barCenter: RefObject<HTMLDivElement | null>;
  barRight: RefObject<HTMLDivElement | null>;
  cardLeft: RefObject<HTMLDivElement | null>;
  cardCenter: RefObject<HTMLDivElement | null>;
  cardRight: RefObject<HTMLDivElement | null>;
};

type UseAboutOverlayRevealAnimationArgs = {
  refs: AboutOverlayRefs;
  isClosing: boolean;
  sectionKeys: [string, string, string];
  reducedMotion: boolean;
};

/**
 * Lance la timeline GSAP de révélation (lignes + barres + cartes) de l’overlay About.
 * Ne fait rien si isClosing ou si les refs ne sont pas encore montées.
 * Respecte prefers-reduced-motion : durées à 0 si reducedMotion.
 */
export function useAboutOverlayRevealAnimation({
  refs,
  isClosing,
  sectionKeys,
  reducedMotion,
}: UseAboutOverlayRevealAnimationArgs): void {
  const {
    line: lineConfig,
    bar: barConfig,
    card: cardConfig,
  } = ABOUT_OVERLAY_ANIMATION;

  const lineDuration = reducedMotion ? 0 : lineConfig.duration;
  const barDuration = reducedMotion ? 0 : barConfig.duration;
  const cardDuration = reducedMotion ? 0 : cardConfig.duration;
  const lineDelay = reducedMotion ? 0 : lineConfig.delay;
  const cardOverlap = reducedMotion ? 0 : cardConfig.overlap;

  useEffect(() => {
    const vertical = refs.vertical.current;
    const horizontal = refs.horizontal.current;
    const barLeft = refs.barLeft.current;
    const barCenter = refs.barCenter.current;
    const barRight = refs.barRight.current;
    const cardLeft = refs.cardLeft.current;
    const cardCenter = refs.cardCenter.current;
    const cardRight = refs.cardRight.current;

    if (
      !vertical ||
      !horizontal ||
      !barLeft ||
      !barCenter ||
      !barRight ||
      !cardLeft ||
      !cardCenter ||
      !cardRight ||
      isClosing
    ) {
      return;
    }

    gsap.set(vertical, { scaleY: 0 });
    gsap.set(horizontal, { scaleX: 0 });
    gsap.set([barLeft, barCenter, barRight], { scaleY: 0 });
    gsap.set([cardLeft, cardCenter, cardRight], { opacity: 0, y: 8 });

    const tl = gsap.timeline({ overwrite: true });
    tl.to(vertical, {
      scaleY: 1,
      duration: lineDuration,
      delay: lineDelay,
      ease: lineConfig.ease,
    })
      .to(horizontal, {
        scaleX: 1,
        duration: lineDuration,
        ease: lineConfig.ease,
      })
      .to(barLeft, {
        scaleY: 1,
        duration: barDuration,
        ease: barConfig.ease,
      })
      .to(
        cardLeft,
        {
          opacity: 1,
          y: 0,
          duration: cardDuration,
          ease: cardConfig.ease,
        },
        cardOverlap > 0 ? `-=${cardOverlap}` : 0
      )
      .to(barCenter, {
        scaleY: 1,
        duration: barDuration,
        ease: barConfig.ease,
      })
      .to(
        cardCenter,
        {
          opacity: 1,
          y: 0,
          duration: cardDuration,
          ease: cardConfig.ease,
        },
        cardOverlap > 0 ? `-=${cardOverlap}` : 0
      )
      .to(barRight, {
        scaleY: 1,
        duration: barDuration,
        ease: barConfig.ease,
      })
      .to(
        cardRight,
        {
          opacity: 1,
          y: 0,
          duration: cardDuration,
          ease: cardConfig.ease,
        },
        cardOverlap > 0 ? `-=${cardOverlap}` : 0
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- config stable (ABOUT_OVERLAY_ANIMATION)
  }, [refs, isClosing, sectionKeys, reducedMotion]);
}
