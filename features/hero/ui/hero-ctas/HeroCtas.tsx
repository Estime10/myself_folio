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
      {ctas.map((cta) => (
        <ContactModalTrigger
          key={cta.translationKey}
          label={translate(cta.translationKey)}
        />
      ))}
    </div>
  );
}
