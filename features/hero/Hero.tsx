import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container/Container";
import { heroContent } from "./ui/hero-content/heroContent";
import { HeroCtas } from "@/features/hero/ui/hero-ctas/HeroCtas";
import { HeroText } from "@/features/hero/ui/hero-text/HeroText";

export async function Hero() {
  const t = await getTranslations();
  const { translationKeys, ctas } = heroContent;

  return (
    <section className="relative min-h-0 flex-1 w-full">
      <div className="absolute inset-0 flex items-center">
        <Container as="div" className="w-full text-text-primary">
          <HeroText
            eyebrow={t(translationKeys.eyebrow)}
            titleLine1={t(translationKeys.titleLine1)}
            titleLine2={t(translationKeys.titleLine2)}
            titleLine3={t(translationKeys.titleLine3)}
            bio={t(translationKeys.bio)}
          />
          <HeroCtas ctas={ctas} translate={t} />
        </Container>
      </div>
    </section>
  );
}
