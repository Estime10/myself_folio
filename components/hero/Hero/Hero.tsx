import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Container } from "@/components/ui/container/Container";
import { heroContent } from "@/features/hero_section";

export async function Hero() {
  const t = await getTranslations();
  const { translationKeys, ctas } = heroContent;

  return (
    <section className="relative min-h-0 flex-1 w-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/image/profile.webp')" }}
      />
      <div className="absolute inset-0 bg-black/75" aria-hidden />
      <div className="absolute inset-0 z-10 flex items-center">
        <Container as="div" className="w-full text-text-primary">
          <h1 className="flex flex-col gap-0 text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl lg:flex-row lg:flex-wrap lg:gap-x-2 lg:gap-y-0 lg:text-6xl">
            <span>{t(translationKeys.titleLine1)}</span>
            <span>{t(translationKeys.titleLine2)}</span>
            <span>{t(translationKeys.titleLine3)}</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-text-secondary md:text-xl">
            {t(translationKeys.bio)}
          </p>
          {ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {ctas.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="inline-block rounded-lg bg-accent-primary px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
                >
                  {t(cta.translationKey)}
                </Link>
              ))}
            </div>
          )}
        </Container>
      </div>
    </section>
  );
}
