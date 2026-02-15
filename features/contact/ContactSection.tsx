import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container/Container";
import {
  ContactLinks,
  getContactLinks,
} from "./ui/ContactLinks/ContactLinks";

export async function ContactSection() {
  const t = await getTranslations("contact");
  const links = getContactLinks((key) => t(key));

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-text-secondary/80">
              {t("sectionEyebrow")}
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-text-primary md:text-3xl">
              {t("sectionTitle")}
            </h1>
          </div>
          <p className="max-w-md text-sm text-text-secondary/90 md:text-[15px] lg:text-[15.5px]">
            {t("sectionIntro")}
          </p>
        </div>

        <ContactLinks links={links} />
      </Container>
    </section>
  );
}
