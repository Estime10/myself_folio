"use client";

import Image from "next/image";
import { Container } from "@/components/container/Container";
import type { TestimonialBgItem } from "../../data/testimonialsBgConfig";

type TestimonialsSlideProps = {
  contentRef: React.RefObject<HTMLDivElement | null>;
  item: TestimonialBgItem;
  projectNameLabel: string;
  quoteText: string;
  isFirstSlide: boolean;
};

export function TestimonialsSlide({
  contentRef,
  item,
  projectNameLabel,
  quoteText,
  isFirstSlide,
}: TestimonialsSlideProps) {
  return (
    <div ref={contentRef} className="absolute inset-0">
      <div className="absolute inset-0 bg-bg-primary-base">
        <Image
          src={item.src}
          alt=""
          fill
          className="object-contain object-center md:object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={isFirstSlide}
        />
      </div>
      <div className="absolute inset-0 bg-black/90" aria-hidden />

      <Container className="absolute left-0 right-0 top-28 z-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-text-secondary/80">
            {projectNameLabel}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-text-primary md:text-4xl">
            {item.title}
          </h2>
        </div>
      </Container>

      <Container className="absolute bottom-24 left-0 right-0 z-10 md:bottom-28">
        <blockquote className="max-w-2xl text-base leading-relaxed text-text-secondary/90 md:text-lg">
          &ldquo;{quoteText}&rdquo;
        </blockquote>
      </Container>
    </div>
  );
}
