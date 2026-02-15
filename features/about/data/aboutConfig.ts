/**
 * Configuration du contenu de la page About.
 * Les textes sont dans messages (en.json / fr.json) sous les clés about.*
 */

export type AboutItemConfig = {
  id: string;
  image: { src: string; alt: string };
  /** Clé de traduction du titre principal (ex: "about.tech.title") */
  titleKey: string;
  /** Clés de traduction des 3 sous-sections (ex: "about.tech.sections.reactNext") → .title et .description */
  sectionKeys: [string, string, string];
};

export const aboutItemsConfig: AboutItemConfig[] = [
  {
    id: "tech",
    image: { src: "/image/tech.webp", alt: "Tech" },
    titleKey: "about.tech.title",
    sectionKeys: [
      "about.tech.sections.reactNext",
      "about.tech.sections.reactNative",
      "about.tech.sections.vision",
    ],
  },
  {
    id: "athlete",
    image: { src: "/image/shoot.webp", alt: "Shoot" },
    titleKey: "about.athlete.title",
    sectionKeys: [
      "about.athlete.sections.discipline",
      "about.athlete.sections.competitiveness",
      "about.athlete.sections.resilience",
    ],
  },
  {
    id: "entrepreneur",
    image: { src: "/image/entreprise.webp", alt: "Entreprise" },
    titleKey: "about.entrepreneur.title",
    sectionKeys: [
      "about.entrepreneur.sections.ownership",
      "about.entrepreneur.sections.adaptability",
      "about.entrepreneur.sections.execution",
    ],
  },
];
