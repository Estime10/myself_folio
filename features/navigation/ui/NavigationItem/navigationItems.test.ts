import { describe, it, expect } from "vitest";
import { navigationItems } from "./navigationItems";

describe("navigationItems", () => {
  it("contient 5 entrées", () => {
    expect(navigationItems).toHaveLength(5);
  });

  it("chaque entrée a translationKey et href", () => {
    navigationItems.forEach((item) => {
      expect(item).toHaveProperty("translationKey");
      expect(typeof item.translationKey).toBe("string");
      expect(item.translationKey.length).toBeGreaterThan(0);
      expect(item).toHaveProperty("href");
      expect(typeof item.href).toBe("string");
      expect(item.href).toMatch(/^\//);
    });
  });

  it("contient les routes attendues", () => {
    const hrefs = navigationItems.map((i) => i.href);
    expect(hrefs).toContain("/");
    expect(hrefs).toContain("/projects");
    expect(hrefs).toContain("/about");
    expect(hrefs).toContain("/testimonials");
    expect(hrefs).toContain("/contact");
  });
});
