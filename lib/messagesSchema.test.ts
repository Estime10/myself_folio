import { describe, it, expect } from "vitest";
import { validateMessages } from "./messagesSchema";

describe("validateMessages", () => {
  it("valide la structure minimale des messages", () => {
    const valid = {
      common: { home: "Home" },
      navigation: { menu: "Menu" },
      hero: { eyebrow: "Portfolio", titleLine1: "A", titleLine2: "B", titleLine3: "C", bio: "Bio", cta: "Contact" },
      contact: { title: "Contact", close: "Close" },
      testimonials: { projectNameLabel: "Project", prev: "Prev", next: "Next", quotes: {} },
      projects: { sectionEyebrow: "Projects", sectionTitle: "Title", sectionIntro: "Intro" },
      about: { sectionEyebrow: "About" },
      tech: { next: "Next.js" },
    };
    expect(() => validateMessages(valid)).not.toThrow();
    expect(validateMessages(valid)).toEqual(valid);
  });

  it("rejette si un namespace requis est absent", () => {
    const missingHero = {
      common: { home: "Home" },
      navigation: {},
      contact: {},
      testimonials: {},
      projects: {},
      about: {},
      tech: {},
    };
    expect(() => validateMessages(missingHero)).toThrow();
  });

  it("rejette si les données ne sont pas un objet", () => {
    expect(() => validateMessages(null)).toThrow();
    expect(() => validateMessages("string")).toThrow();
  });
});
