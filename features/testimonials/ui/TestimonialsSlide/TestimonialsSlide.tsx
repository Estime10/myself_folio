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

      {/* Image centrée au milieu (même src que le bg), entre titre et citation */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center px-4"
        aria-hidden
      >
        <div className="relative h-[min(45vh,320px)] w-[min(75vw,420px)] overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src={item.src}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 75vw, 420px"
          />
        </div>
      </div>

      <Container className="absolute left-0 right-0 top-28 z-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-text-secondary/80">
            {projectNameLabel}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-text-primary md:text-4xl">
            {item.title}
          </h2>
        </div>
      </Container>

      <Container className="absolute bottom-24 left-0 right-0 z-20 md:bottom-11">
        <blockquote className="max-w-2xl text-base leading-relaxed text-text-secondary/90 md:text-lg">
          &ldquo;{quoteText}&rdquo;
        </blockquote>
      </Container>
    </div>
  );
}
