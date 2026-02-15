"use client";

import { Menu, X } from "lucide-react";
import { useNavigation } from "@/features/navigation/hooks/useNavigation";

const ICON_SIZE = 24;

export function MobileMenuButton() {
  const { isMobileMenuOpen, toggleMobileMenu } = useNavigation();

  return (
    <button
      type="button"
      onClick={toggleMobileMenu}
      className="flex size-10 items-center justify-center rounded-lg tap-highlight-transparent"
      aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={isMobileMenuOpen}
    >
      {isMobileMenuOpen ? (
        <X size={ICON_SIZE} className="text-current" aria-hidden />
      ) : (
        <Menu size={ICON_SIZE} className="text-current" aria-hidden />
      )}
    </button>
  );
}
