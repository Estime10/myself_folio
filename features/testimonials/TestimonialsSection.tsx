"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/container/Container";
import { testimonialsBgConfig } from "./data/testimonialsBgConfig";

const arrowButtonClass =
  "flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition-opacity hover:opacity-90 focus:outline-none ";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = testimonialsBgConfig;
  const current = items[currentIndex]!;

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  }, [items.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i === items.length - 1 ? 0 : i + 1));
  }, [items.length]);

  return (
    <section
      className="fixed top-0 left-0 right-0 bottom-0 z-0 overflow-hidden"
      aria-label="Témoigniages"
    >
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

      <Container className="absolute left-0 right-0 top-20 z-10">
        <h2 className="text-2xl font-semibold text-text-primary">
          {current.title}
        </h2>
      </Container>

      {/* < 1022px : flèches en bas au centre */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 min-[1022px]:hidden">
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

      {/* ≥ 1022px : flèches en bas à droite */}
      <div className="absolute bottom-6 right-6 hidden gap-3 min-[1022px]:flex">
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
    </section>
  );
}
