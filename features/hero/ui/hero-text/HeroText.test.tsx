import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroText } from "./HeroText";

describe("HeroText", () => {
  it("affiche l'eyebrow", () => {
    render(
      <HeroText
        eyebrow="Tech folio"
        titleLine1="Line 1"
        titleLine2="Line 2"
        titleLine3="Line 3"
        bio="Bio text"
      />
    );
    expect(screen.getByText("Tech folio")).toBeInTheDocument();
  });

  it("affiche les trois lignes du titre", () => {
    render(
      <HeroText
        eyebrow="Eyebrow"
        titleLine1="Clean UI."
        titleLine2="Solid code."
        titleLine3="Real products."
        bio="Bio"
      />
    );
    expect(screen.getByText("Clean UI.")).toBeInTheDocument();
    expect(screen.getByText("Solid code.")).toBeInTheDocument();
    expect(screen.getByText("Real products.")).toBeInTheDocument();
  });

  it("affiche la bio", () => {
    render(
      <HeroText
        eyebrow="Eyebrow"
        titleLine1="A"
        titleLine2="B"
        titleLine3="C"
        bio="Frontend developer building apps."
      />
    );
    expect(screen.getByText("Frontend developer building apps.")).toBeInTheDocument();
  });

  it("contient un h1 avec le titre", () => {
    const { container } = render(
      <HeroText
        eyebrow="Eyebrow"
        titleLine1="A"
        titleLine2="B"
        titleLine3="C"
        bio="Bio"
      />
    );
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent("A");
    expect(h1).toHaveTextContent("B");
    expect(h1).toHaveTextContent("C");
  });
});
