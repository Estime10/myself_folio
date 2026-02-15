"use client";

import { useTranslations } from "next-intl";
import { testimonialsBgConfig } from "./data/testimonialsBgConfig";
import { useTestimonialsCarousel } from "./hooks/useTestimonialsCarousel";
import { TestimonialsArrows } from "./ui/TestimonialsArrows/TestimonialsArrows";
import { TestimonialsSlide } from "./ui/TestimonialsSlide/TestimonialsSlide";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const items = testimonialsBgConfig;
  const { contentRef, currentIndex, current, goPrev, goNext } =
    useTestimonialsCarousel(items);

  return (
    <section
      className="fixed top-0 left-0 right-0 bottom-0 z-0 overflow-hidden"
      aria-label="Témoigniages"
    >
      <TestimonialsSlide
        contentRef={contentRef}
        item={current}
        projectNameLabel={t("projectNameLabel")}
        quoteText={t(`quotes.${current.id}`)}
        isFirstSlide={currentIndex === 0}
      />
      <TestimonialsArrows
        goPrev={goPrev}
        goNext={goNext}
        prevLabel={t("prev")}
        nextLabel={t("next")}
      />
    </section>
  );
}
