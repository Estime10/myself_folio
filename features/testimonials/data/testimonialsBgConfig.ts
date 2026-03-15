/** Valeur spéciale pour un site en cours de construction (affiché via i18n, pas de lien). */
export const SITE_UNDER_CONSTRUCTION = "under_construction" as const;

export type TestimonialBgItem = {
  id: string;
  /** Chemin public de l'image (ex: /image/photo_vibes.webp) */
  src: string;
  /** Titre affiché pour cette slide */
  title: string;
  /**
   * URL du site (https) ou SITE_UNDER_CONSTRUCTION pour afficher "Under construction".
   */
  site: string;
};

export const testimonialsBgConfig: TestimonialBgItem[] = [
  {
    id: "photo_vibes",
    src: "/image/sc/pvbs.webp",
    title: "Photo Vibes by Shana",
    site: "https://photovibesbyshana.vercel.app",
  },
  {
    id: "enna_consulting",
    src: "/image/sc/enna.webp",
    title: "Enna Consulting",
    site: "https://ennaconsulting.vercel.app",
  },
  {
    id: "spill_the_crumb",
    src: "/image/sc/sdc.webp",
    title: "Spill The Crumb",
    site: SITE_UNDER_CONSTRUCTION,
  },
  {
    id: "purpose_sport",
    src: "/image/sc/ps_sc_rz.webp",
    title: "Purpose Sport",
    site: "https://purpose-sport.com",
  },
  {
    id: "maxweljones",
    src: "/image/mj.webp",
    title: "Maxwel Jones",
    site: "https://maxweljones.com",
  },
  {
    id: "jikowood",
    src: "/image/jikowood.webp",
    title: "Jikowood",
    site: "https://jikowood.be",
  },
];
