import Image from "next/image";

const ABOUT_IMAGES = [
  { src: "/image/connect.webp", alt: "Connect" },
  { src: "/image/shoot.webp", alt: "Shoot" },
  { src: "/image/tech.webp", alt: "Tech" },
] as const;

export async function AboutSection() {
  return (
    <section className="relative flex min-h-full w-full flex-1 flex-col lg:overflow-hidden">
      <div className="flex-1 min-h-0" />
      <div className="hidden lg:flex lg:w-full lg:shrink-0 lg:h-[min(100vh,560px)] xl:h-[min(100vh,500px)] 2xl:h-[min(100vh,700px)] lg:gap-3 lg:px-4 lg:pb-0">
        {ABOUT_IMAGES.map(({ src, alt }) => (
          <div
            key={src}
            className="relative h-full flex-1 min-w-0 rounded-t-2xl overflow-hidden bg-black/20"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-center grayscale"
              sizes="100%"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
