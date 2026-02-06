"use client";

import { AppLink } from "@/components/page-transition";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/features/navigation";

export function NavigationDesktopLinks() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <>
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;
        return isActive ? (
          <span
            key={item.href}
            className="shrink-0 font-bold text-base text-accent-primary"
            aria-current="page"
          >
            {t(item.translationKey)}
          </span>
        ) : (
          <AppLink
            key={item.href}
            href={item.href}
            className="shrink-0 font-bold text-base transition-colors lg:hover:text-accent-primary"
          >
            {t(item.translationKey)}
          </AppLink>
        );
      })}
    </>
  );
}
