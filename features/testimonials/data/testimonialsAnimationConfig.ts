/**
 * Configuration des animations du carousel témoignages (GSAP fade).
 */

export const TESTIMONIALS_ANIMATION = {
  fade: {
    duration: 0.25,
    ease: "power2.inOut" as const,
  },
} as const;
