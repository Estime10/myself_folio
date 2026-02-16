"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/container/Container";

const arrowButtonClass =
  "flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition-opacity hover:opacity-90 focus:outline-none ";

type TestimonialsArrowsProps = {
  goPrev: () => void;
  goNext: () => void;
  prevLabel: string;
  nextLabel: string;
};

export function TestimonialsArrows({
  goPrev,
  goNext,
  prevLabel,
  nextLabel,
}: TestimonialsArrowsProps) {
  return (
    <>
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3 min-[1022px]:hidden">
        <button
          type="button"
          className={arrowButtonClass}
          onClick={goPrev}
          aria-label={prevLabel}
        >
          <ChevronLeft className="h-6 w-6" aria-hidden />
        </button>
        <button
          type="button"
          className={arrowButtonClass}
          onClick={goNext}
          aria-label={nextLabel}
        >
          <ChevronRight className="h-6 w-6" aria-hidden />
        </button>
      </div>

      <div className="absolute bottom-24 right-0 left-0 z-20 hidden min-[1022px]:block md:bottom-11">
        <Container className="flex items-center justify-end gap-3">
          <button
            type="button"
            className={arrowButtonClass}
            onClick={goPrev}
            aria-label={prevLabel}
          >
            <ChevronLeft className="h-6 w-6" aria-hidden />
          </button>
          <button
            type="button"
            className={arrowButtonClass}
            onClick={goNext}
            aria-label={nextLabel}
          >
            <ChevronRight className="h-6 w-6" aria-hidden />
          </button>
        </Container>
      </div>
    </>
  );
}
