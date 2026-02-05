export type HeroContent = {
  translationKeys: {
    title: string;
    subtitle: string;
    cta: string;
  };
  ctaHref: string;
};

export const heroContent: HeroContent = {
  translationKeys: {
    title: "hero.title",
    subtitle: "hero.subtitle",
    cta: "hero.cta",
  },
  ctaHref: "/contact",
};
