export type HeroCta = {
  translationKey: string;
  href?: string;
  /** Si true, le CTA ouvre la modale Contact au lieu de naviguer. */
  openContactModal?: boolean;
};

export type HeroContent = {
  translationKeys: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    bio: string;
  };
  ctas: HeroCta[];
};

export const heroContent: HeroContent = {
  translationKeys: {
    eyebrow: "hero.eyebrow",
    titleLine1: "hero.titleLine1",
    titleLine2: "hero.titleLine2",
    titleLine3: "hero.titleLine3",
    bio: "hero.bio",
  },
  ctas: [{ translationKey: "hero.cta", openContactModal: true }],
};
