"use client";

import { useState, useCallback, useRef } from "react";
import gsap from "gsap";
import type { TestimonialBgItem } from "../data/testimonialsBgConfig";
import { TESTIMONIALS_ANIMATION } from "../data/testimonialsAnimationConfig";

export type UseTestimonialsCarouselReturn = {
  contentRef: React.RefObject<HTMLDivElement | null>;
  currentIndex: number;
  current: TestimonialBgItem;
  goPrev: () => void;
  goNext: () => void;
};

export function useTestimonialsCarousel(
  items: TestimonialBgItem[]
): UseTestimonialsCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const current = items[currentIndex]!;
  const { duration, ease } = TESTIMONIALS_ANIMATION.fade;

  const runTransition = useCallback(
    (nextIndex: number) => {
      const el = contentRef.current;
      if (!el) {
        setCurrentIndex(nextIndex);
        return;
      }
      gsap.to(el, {
        opacity: 0,
        duration,
        ease,
        onComplete: () => {
          setCurrentIndex(nextIndex);
          gsap.to(el, {
            opacity: 1,
            duration,
            ease,
          });
        },
      });
    },
    [duration, ease]
  );

  const goPrev = useCallback(() => {
    const next = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    runTransition(next);
  }, [currentIndex, items.length, runTransition]);

  const goNext = useCallback(() => {
    const next = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    runTransition(next);
  }, [currentIndex, items.length, runTransition]);

  return {
    contentRef,
    currentIndex,
    current,
    goPrev,
    goNext,
  };
}
