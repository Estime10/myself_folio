export type TestimonialBgItem = {
  id: string;
  /** Chemin public de l'image (ex: /image/photo_vibes.webp) */
  src: string;
  /** Titre affiché pour cette slide */
  title: string;
};

export const testimonialsBgConfig: TestimonialBgItem[] = [
  { id: "photo_vibes", src: "/image/ph_vibes.webp", title: "Photo Vibes" },
  { id: "spill_the_crumb", src: "/image/crum.webp", title: "Spill The Crumb" },
  { id: "purpose_sport", src: "/image/ps.webp", title: "Purpose Sport" },
  { id: "maxweljones", src: "/image/mj.webp", title: "Maxwel Jones" },
  { id: "jikowood", src: "/image/jikowood.webp", title: "Jikowood" },
];
