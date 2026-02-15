/**
 * Configuration des animations de l’overlay About (desktop).
 * Utilisée par useAboutOverlayRevealAnimation.
 */

export const ABOUT_OVERLAY_ANIMATION = {
  line: {
    duration: 1.2,
    delay: 0.2,
    ease: "power2.out" as const,
  },
  bar: {
    height: 40,
    duration: 0.5,
    ease: "power2.out" as const,
  },
  card: {
    duration: 0.4,
    ease: "power2.out" as const,
    overlap: 0.1,
  },
} as const;
