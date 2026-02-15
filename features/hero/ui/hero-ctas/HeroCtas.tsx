import Link from "next/link";
import { ContactModalTrigger } from "@/components/contact-modal";
import type { HeroCta } from "../hero-content/heroContent";

type HeroCtasProps = {
  ctas: HeroCta[];
  translate: (key: string) => string;
};

export function HeroCtas({ ctas, translate }: HeroCtasProps) {
  if (ctas.length === 0) return null;

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {ctas.map((cta) => {
        const isContactModal =
          cta.openContactModal === true || cta.translationKey === "hero.cta";
        return isContactModal ? (
          <ContactModalTrigger
            key="contact-modal"
            label={translate(cta.translationKey)}
          />
        ) : (
          <Link
            key={cta.href ?? cta.translationKey}
            href={cta.href ?? "#"}
            className="inline-block rounded-lg bg-accent-primary p-2 text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            {translate(cta.translationKey)}
          </Link>
        );
      })}
    </div>
  );
}
