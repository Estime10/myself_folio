"use client";

import { LanguageToggle } from "@/components/language-toggle/ui/LanguageToggle";
import { useNavigation } from "@/features/navigation/hooks/useNavigation";
import { MobileMenuButton } from "@/features/navigation/ui/MobileMenuButton/MobileMenuButton";

type MobileHeaderActionsProps = {
  currentLocale: string;
};

export function MobileHeaderActions({ currentLocale }: MobileHeaderActionsProps) {
  const { isMobileMenuOpen } = useNavigation();

  return (
    <div className="flex items-center gap-4">
      {!isMobileMenuOpen && (
        <LanguageToggle currentLocale={currentLocale} />
      )}
      <MobileMenuButton />
    </div>
  );
}
