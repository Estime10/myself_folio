export type HeroCta = {
  translationKey: string;
  href: string;
};

export type HeroContent = {
  translationKeys: {
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    bio: string;
  };
  ctas: HeroCta[];
};

export const heroContent: HeroContent = {
  translationKeys: {
    titleLine1: "hero.titleLine1",
    titleLine2: "hero.titleLine2",
    titleLine3: "hero.titleLine3",
    bio: "hero.bio",
  },
  ctas: [
    { translationKey: "hero.cta", href: "/contact" },
  ],
};
