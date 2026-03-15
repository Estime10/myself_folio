"use client";

import Image from "next/image";
import { Container } from "@/components/container/Container";
import {
  SITE_UNDER_CONSTRUCTION,
  type TestimonialBgItem,
} from "../../data/testimonialsBgConfig";

type TestimonialsSlideProps = {
  contentRef: React.RefObject<HTMLDivElement | null>;
  item: TestimonialBgItem;
  projectNameLabel: string;
  siteLabel: string;
  siteUnderConstruction: string;
  quoteText: string;
  isFirstSlide: boolean;
};

export function TestimonialsSlide({
  contentRef,
  item,
  projectNameLabel,
  siteLabel,
  siteUnderConstruction,
  quoteText,
  isFirstSlide,
}: TestimonialsSlideProps) {
  const isSiteLink = item.site !== SITE_UNDER_CONSTRUCTION;
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
      <div className="absolute inset-0 bg-black/80" aria-hidden />

      {/* Image centrée au milieu (même src que le bg), entre titre et citation — masquée en mobile */}
      {/* <div
        className="absolute inset-0 z-10 hidden items-center justify-center px-4 md:flex"
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
      </div> */}

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
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary/80">
            {siteLabel}:{" "}
            {isSiteLink ? (
              <a
                href={item.site}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary underline decoration-text-secondary/50 underline-offset-2 transition-colors hover:decoration-text-primary"
              >
                {item.title}
              </a>
            ) : (
              <span className="text-text-secondary">{siteUnderConstruction}</span>
            )}
          </p>
          <blockquote className="max-w-2xl text-base leading-relaxed text-text-primary md:text-lg">
            &ldquo;{quoteText}&rdquo;
          </blockquote>
        </div>
      </Container>
    </div>
  );
}
