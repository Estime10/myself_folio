export type TestimonialBgItem = {
  id: string;
  /** Chemin public de l'image (ex: /image/photo_vibes.webp) */
  src: string;
  /** Titre affiché pour cette slide */
  title: string;
};

export const testimonialsBgConfig: TestimonialBgItem[] = [
  {
    id: "photo_vibes",
    src: "/image/sc/ph_shana_rz.webp",
    title: "Photo Vibes",
  },
  {
    id: "spill_the_crumb",
    src: "/image/sc/crumb_sc_rz.webp",
    title: "Spill The Crumb",
  },
  {
    id: "purpose_sport",
    src: "/image/sc/ps_sc_rz.webp",
    title: "Purpose Sport",
  },
  { id: "maxweljones", src: "/image/mj.webp", title: "Maxwel Jones" },
  { id: "jikowood", src: "/image/jikowood.webp", title: "Jikowood" },
];
