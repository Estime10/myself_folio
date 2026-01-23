"use client";

import { useTranslations } from "next-intl";
import { useNavigation } from "../../hooks/useNavigation";

export function MobileMenuButton() {
  const t = useTranslations("navigation");
  const { toggleMobileMenu } = useNavigation();

  return (
    <button
      onClick={toggleMobileMenu}
      className="p-2"
      aria-label="Toggle menu"
    >
      <span className="text-sm font-medium">{t("menu")}</span>
    </button>
  );
}
