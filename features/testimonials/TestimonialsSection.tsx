"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/container/Container";
import { testimonialsBgConfig } from "./data/testimonialsBgConfig";

const arrowButtonClass =
  "flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition-opacity hover:opacity-90 focus:outline-none ";

const FADE_DURATION = 0.25;
const FADE_EASE = "power2.inOut";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const items = testimonialsBgConfig;
  const current = items[currentIndex]!;

  const runTransition = useCallback(
    (nextIndex: number) => {
      const el = contentRef.current;
      if (!el) {
        setCurrentIndex(nextIndex);
        return;
      }
      gsap.to(el, {
        opacity: 0,
        duration: FADE_DURATION,
        ease: FADE_EASE,
        onComplete: () => {
          setCurrentIndex(nextIndex);
          gsap.to(el, {
            opacity: 1,
            duration: FADE_DURATION,
            ease: FADE_EASE,
          });
        },
      });
    },
    []
  );

  const goPrev = useCallback(() => {
    const next = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    runTransition(next);
  }, [currentIndex, items.length, runTransition]);

  const goNext = useCallback(() => {
    const next = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    runTransition(next);
  }, [currentIndex, items.length, runTransition]);

  return (
    <section
      className="fixed top-0 left-0 right-0 bottom-0 z-0 overflow-hidden"
      aria-label="Témoigniages"
    >
      <div ref={contentRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-bg-primary-base">
          <Image
            src={current.src}
            alt=""
            fill
            className="object-contain object-center md:object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={currentIndex === 0}
          />
        </div>
        <div className="absolute inset-0 bg-black/90" aria-hidden />

        <Container className="absolute left-0 right-0 top-28 z-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-text-secondary/80">
              {t("projectNameLabel")}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-text-primary md:text-4xl">
              {current.title}
            </h2>
          </div>
        </Container>

        <Container className="absolute bottom-24 left-0 right-0 z-10 md:bottom-28">
          <blockquote className="max-w-2xl text-base leading-relaxed text-text-secondary/90 md:text-lg">
            &ldquo;{t(`quotes.${current.id}`)}&rdquo;
          </blockquote>
        </Container>
      </div>

      {/* < 1022px : flèches en bas au centre */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3 min-[1022px]:hidden">
        <button
          type="button"
          className={arrowButtonClass}
          aria-label="Précédent"
          onClick={goPrev}
        >
          <ChevronLeft className="h-6 w-6" aria-hidden />
        </button>
        <button
          type="button"
          className={arrowButtonClass}
          aria-label="Suivant"
          onClick={goNext}
        >
          <ChevronRight className="h-6 w-6" aria-hidden />
        </button>
      </div>

      {/* ≥ 1022px : flèches à la même hauteur que le quote */}
      <div className="absolute bottom-24 right-0 left-0 z-20 hidden min-[1022px]:block md:bottom-28">
        <Container className="flex items-center justify-end gap-3">
          <button
            type="button"
            className={arrowButtonClass}
            aria-label="Précédent"
            onClick={goPrev}
          >
            <ChevronLeft className="h-6 w-6" aria-hidden />
          </button>
          <button
            type="button"
            className={arrowButtonClass}
            aria-label="Suivant"
            onClick={goNext}
          >
            <ChevronRight className="h-6 w-6" aria-hidden />
          </button>
        </Container>
      </div>
    </section>
  );
}
