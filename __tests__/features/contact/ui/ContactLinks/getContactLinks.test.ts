import { describe, it, expect, vi } from "vitest";
import { getContactLinks } from "@/features/contact/ui/ContactLinks/ContactLinks";
import { contactLinks } from "@/lib/config/contact";

describe("getContactLinks", () => {
  it("retourne 3 liens (email, linkedin, instagram)", () => {
    const translate = vi.fn((key: string) => key);
    const links = getContactLinks(translate);

    expect(links).toHaveLength(3);
    expect(links.map((l) => l.id)).toEqual(["email", "linkedin", "instagram"]);
  });

  it("appelle translate avec les clés label et phrase pour chaque lien", () => {
    const translate = vi.fn((key: string) => key);
    getContactLinks(translate);

    expect(translate).toHaveBeenCalledTimes(6);
    expect(translate).toHaveBeenCalledWith("email");
    expect(translate).toHaveBeenCalledWith("emailPhrase");
    expect(translate).toHaveBeenCalledWith("linkedin");
    expect(translate).toHaveBeenCalledWith("linkedinPhrase");
    expect(translate).toHaveBeenCalledWith("instagram");
    expect(translate).toHaveBeenCalledWith("instagramPhrase");
  });

  it("utilise les href de contactLinks", () => {
    const translate = vi.fn((key: string) => key);
    const links = getContactLinks(translate);

    expect(links[0].href).toBe(contactLinks.email);
    expect(links[1].href).toBe(contactLinks.linkedin);
    expect(links[2].href).toBe(contactLinks.instagram);
  });

  it("marque email en internal et linkedin/instagram en external", () => {
    const translate = vi.fn((key: string) => key);
    const links = getContactLinks(translate);

    expect(links[0].external).toBe(false);
    expect(links[1].external).toBe(true);
    expect(links[2].external).toBe(true);
  });

  it("assigne le label via translate pour chaque lien", () => {
    const translate = vi.fn((key: string) => `Label ${key}`);
    const links = getContactLinks(translate);

    expect(links[0].label).toBe("Label email");
    expect(links[1].label).toBe("Label linkedin");
    expect(links[2].label).toBe("Label instagram");
  });
});
