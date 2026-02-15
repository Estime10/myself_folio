import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container/Container";
import { SectionHeader } from "@/components/ui/SectionHeader/SectionHeader";
import { aboutItemsConfig } from "./data/aboutConfig";
import { AboutOverlayProvider } from "./context/AboutOverlayContext";
import { AboutImagesBlock } from "./ui/AboutDesktop/AboutImagesBlock/AboutImagesBlock";
import { AboutCardsColumn } from "./ui/AboutMobile/AboutCardsColumn/AboutCardsColumn";

export async function AboutSection() {
  const t = await getTranslations("about");

  return (
    <section className="relative flex w-full flex-col min-h-full min-[1220px]:flex-1 lg:overflow-hidden">
      {/* Spacer : uniquement à partir de 1220px pour pousser le bloc cartes vers le bas */}
      <div className="min-h-0 min-[1220px]:flex-1" />
      {/* Titre : toujours visible (mobile + desktop), dégagé du header en mobile */}
      <Container className="mb-4 pt-10 min-[1220px]:pt-0 xl:mb-8">
        <SectionHeader
          eyebrow={t("sectionEyebrow")}
          title={t("sectionTitle")}
          intro={t("sectionIntro")}
          headerClassName=""
        />
      </Container>
      {/* Un seul état overlay partagé (desktop + mobile) */}
      <AboutOverlayProvider>
        {/* AboutCardsColumn : mobile, visible en dessous de 1220px */}
        <div className="min-[1220px]:hidden">
          <AboutCardsColumn items={aboutItemsConfig} />
        </div>
        {/* AboutImagesBlock : desktop, visible à partir de 1220px */}
        <div className="hidden min-[1220px]:block">
          <AboutImagesBlock items={aboutItemsConfig} />
        </div>
      </AboutOverlayProvider>
    </section>
  );
}
