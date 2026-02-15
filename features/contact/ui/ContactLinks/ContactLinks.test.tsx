import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { ContactLinks } from "./ContactLinks";
import type { ContactLinkItem } from "./ContactLinks";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => <a href={href} {...props}>{children}</a>,
}));

const mockIcon = () => <span data-testid="icon" />;

const mockLinks: ContactLinkItem[] = [
  {
    id: "email",
    label: "Email",
    href: "mailto:test@example.com",
    external: false,
    Icon: mockIcon,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/test",
    external: true,
    Icon: mockIcon,
  },
];

describe("ContactLinks", () => {
  it("affiche un lien par item", () => {
    render(<ContactLinks links={mockLinks} />);

    expect(screen.getByRole("link", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
  });

  it("lien external a target _blank et rel noopener noreferrer", () => {
    const { container } = render(<ContactLinks links={mockLinks} />);
    const linkedInLink = within(container).getByRole("link", { name: /linkedin/i });
    expect(linkedInLink).toHaveAttribute("target", "_blank");
    expect(linkedInLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("lien email n'a pas target _blank", () => {
    const { container } = render(<ContactLinks links={mockLinks} />);
    const emailLink = within(container).getByRole("link", { name: /email/i });
    expect(emailLink).not.toHaveAttribute("target");
  });

  it("appelle onLinkClick au clic sur un lien", () => {
    const onLinkClick = vi.fn();
    const { container } = render(<ContactLinks links={mockLinks} onLinkClick={onLinkClick} />);
    fireEvent.click(within(container).getByRole("link", { name: /email/i }));

    expect(onLinkClick).toHaveBeenCalledTimes(1);
  });

  it("affiche une liste non ordonnée", () => {
    const { container } = render(<ContactLinks links={mockLinks} />);
    const list = container.querySelector("ul");
    expect(list).toBeInTheDocument();
    expect(list?.children.length).toBe(2);
  });
});
