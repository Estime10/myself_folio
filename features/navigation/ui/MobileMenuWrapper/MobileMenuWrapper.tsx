"use client";

import { AppLink } from "@/components/page-transition";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/features/navigation";
import { useNavigation } from "@/features/navigation/hooks/useNavigation";
import { useMobileMenuAnimation } from "@/features/navigation/hooks/useMobileMenuAnimation";

export function MobileMenuWrapper() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const { isMobileMenuOpen, closeMobileMenu } = useNavigation();
  const { overlayRef, panelRef, navRef } = useMobileMenuAnimation({
    isOpen: isMobileMenuOpen,
  });

  return (
    <>
      <div
        ref={overlayRef}
        className="overlay lg:hidden"
        onClick={closeMobileMenu}
        aria-hidden
      />
      <div
        ref={panelRef}
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[min(320px,85vw)] rounded-l-2xl p-6 pt-[calc(1.5rem+env(safe-area-inset-top))] glass-strong lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        <nav ref={navRef} className="mt-8 flex flex-col gap-1">
          {navigationItems.map((item) => {
            const key = item.translationKey.replace("common.", "");
            const isActive = pathname === item.href;
            return isActive ? (
              <span
                key={item.href}
                className="nav-link-mobile nav-link-mobile--active"
                aria-current="page"
              >
                {t(key)}
              </span>
            ) : (
              <AppLink
                key={item.href}
                href={item.href}
                className="nav-link-mobile nav-link-mobile--inactive"
                onNavigate={closeMobileMenu}
              >
                {t(key)}
              </AppLink>
            );
          })}
        </nav>
      </div>
    </>
  );
}
