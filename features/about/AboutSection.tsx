import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container/Container";
import { aboutItemsConfig } from "./data/aboutConfig";
import { AboutImagesBlock } from "./ui/AboutImagesBlock/AboutImagesBlock/AboutImagesBlock";
import { AboutCardsColumn } from "./ui/AboutImagesBlock/AboutCardsColumn/AboutCardsColumn";

export async function AboutSection() {
  const t = await getTranslations("about");

  return (
    <section className="relative flex w-full flex-col min-h-full min-[1220px]:flex-1 lg:overflow-hidden">
      {/* Spacer : uniquement à partir de 1220px pour pousser le bloc cartes vers le bas */}
      <div className="min-h-0 min-[1220px]:flex-1" />
      {/* Titre : toujours visible (mobile + desktop), dégagé du header en mobile */}
      <Container className="mb-4 pt-10 min-[1220px]:pt-0 xl:mb-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-text-secondary/80">
              {t("sectionEyebrow")}
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-text-primary">
              {t("sectionTitle")}
            </h1>
          </div>
          <p className="max-w-md text-sm text-white md:text-[15px] lg:text-[15.5px]">
            {t("sectionIntro")}
          </p>
        </div>
      </Container>
      {/* AboutCardsColumn : visible uniquement en dessous de 1220px */}
      <div className="min-[1220px]:hidden">
        <AboutCardsColumn items={aboutItemsConfig} />
      </div>
      {/* AboutImagesBlock : visible à partir de 1220px */}
      <div className="hidden min-[1220px]:block">
        <AboutImagesBlock items={aboutItemsConfig} />
      </div>
    </section>
  );
}
