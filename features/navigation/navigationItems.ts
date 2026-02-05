export type NavigationItem = {
  translationKey: string;
  href: string;
  icon?: string;
};

export const navigationItems: NavigationItem[] = [
  { translationKey: "common.home", href: "/" },
  { translationKey: "common.projects", href: "/projects" },
  { translationKey: "common.about", href: "/about" },
  { translationKey: "common.contact", href: "/contact" },
];
