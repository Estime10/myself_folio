export type ProjectId = "jikowood" | "purpose-sport" | "maxweljones";

export type Project = {
  id: ProjectId;
  name: string;
  /** Clé de traduction pour le résumé du projet. */
  summaryKey: string;
  /** Clés de traduction pour les tags (stack, rôles, etc.). */
  tagKeys: string[];
  /** URL publique du projet (optionnelle pour l'instant). */
  url?: string;
};

export const projects: Project[] = [
  {
    id: "jikowood",
    name: "Jikowood",
    summaryKey: "jikowood.summary",
    tagKeys: ["next", "ts", "mongo", "fullstack","responsive"],
    url: "https://jikowood.be",
  },
  {
    id: "purpose-sport",
    name: "Purpose Sport",
    summaryKey: "purposeSport.summary",
    tagKeys: ["next", "ts", "motion","responsive"],
    url: "https://www.purpose-sport.com/",
  },
  {
    id: "maxweljones",
    name: "Maxwel Jones",
    summaryKey: "maxweljones.summary",
    tagKeys: ["next", "ts", "gsap", "responsive"],
    url: "https://maxweljones.com",
  },
];
