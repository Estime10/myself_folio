import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container/Container";
import { aboutItemsConfig } from "./data/aboutConfig";
import { AboutImagesBlock } from "./ui/AboutImagesBlock/AboutImagesBlock";

export async function AboutSection() {
  const t = await getTranslations("about");

  return (
    <section className="relative flex min-h-full w-full flex-1 flex-col lg:overflow-hidden">
      <div className="flex-1 min-h-0" />
      <div className="hidden min-[1220px]:block">
        <Container className="mb-8">
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
      </div>
      <AboutImagesBlock items={aboutItemsConfig} />
    </section>
  );
}
