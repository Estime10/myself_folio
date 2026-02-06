export type ProjectId = "jikowood" | "purpose-sport" | "maxwelljones";

export type Project = {
  id: ProjectId;
  name: string;
  summary: string;
  role: string;
  stack: string[];
  /** URL publique du projet (optionnelle pour l'instant). */
  url?: string;
};

export const projects: Project[] = [
  {
    id: "jikowood",
    name: "Jikowood",
    summary:
      "E-commerce sur mesure pour un atelier de menuiserie : catalogue produit scénarisé, configuration avancée et tunnel de commande fluide.",
    role: "Design système, front-end, intégration e-commerce",
    stack: ["Next.js", "TypeScript", "Stripe", "Headless CMS"],
  },
  {
    id: "purpose-sport",
    name: "Purpose Sport",
    summary:
      "Plateforme de coaching sportif axée performance : acquisition, onboarding des athlètes et espace membre pour le suivi des programmes.",
    role: "Architecture front, UX produit, intégration marketing",
    stack: ["Next.js", "TypeScript", "Supabase", "Motion"],
  },
  {
    id: "maxwelljones",
    name: "Maxwell Jones",
    summary:
      "Portfolio immersif pour un photographe freelance, pensé comme une scénographie de séries photo plus qu’un simple listing de projets.",
    role: "Direction UX/UI, animations, performance",
    stack: ["Next.js", "TypeScript", "GSAP", "Responsive"],
  },
];
