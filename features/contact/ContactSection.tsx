import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container/Container";
import { SectionHeader } from "@/components/ui/SectionHeader/SectionHeader";
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
        <SectionHeader
          eyebrow={t("sectionEyebrow")}
          title={t("sectionTitle")}
          intro={t("sectionIntro")}
        />
        <ContactLinks links={links} />
      </Container>
    </section>
  );
}
