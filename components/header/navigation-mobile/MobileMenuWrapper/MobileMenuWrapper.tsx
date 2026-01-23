"use client";

import { useTranslations } from "next-intl";
import { useNavigation } from "../../hooks/useNavigation";
import { navigationItems } from "../../navigation-items/navigationItems";
import Link from "next/link";

export function MobileMenuWrapper() {
  const t = useTranslations("common");
  const { isMobileMenuOpen, closeMobileMenu } = useNavigation();

  if (!isMobileMenuOpen) {
    return null;
  }

  return (
    <div className="glass-strong rounded-2xl p-4 space-y-2">
      {navigationItems.map((item) => {
        const key = item.translationKey.replace("common.", "");
        return (
          <Link
            key={item.href}
            href={item.href}
            className="block py-2 text-sm font-medium"
            onClick={closeMobileMenu}
          >
            {t(key)}
          </Link>
        );
      })}
    </div>
  );
}
