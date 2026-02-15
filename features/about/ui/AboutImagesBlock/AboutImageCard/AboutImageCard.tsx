"use client";

import Image from "next/image";

type AboutImageCardProps = {
  image: { src: string; alt: string };
  title: string;
  onOpen: () => void;
};

export function AboutImageCard({ image, title, onOpen }: AboutImageCardProps) {
  return (
    <button
      type="button"
      className="group relative h-full flex-1 min-w-0 rounded-t-2xl overflow-hidden bg-black/20 cursor-pointer border-0 p-0 text-left"
      onClick={onOpen}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover object-center grayscale"
        sizes="100%"
      />
      <div
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-t-2xl bg-black/0 transition-colors duration-200 lg:group-hover:bg-black/50 lg:group-hover:backdrop-blur-sm"
        aria-hidden
      >
        <span className="text-lg font-semibold uppercase tracking-wide text-white opacity-0 transition-opacity duration-200 lg:group-hover:opacity-100">
          {title}
        </span>
      </div>
    </button>
  );
}
