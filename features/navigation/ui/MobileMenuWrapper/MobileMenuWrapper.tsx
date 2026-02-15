"use client";

import { useEffect } from "react";
import { AppLink } from "@/components/page-transition";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/features/navigation";
import { useNavigation } from "@/features/navigation/hooks/useNavigation";
import { useMobileMenuAnimation } from "@/features/navigation/hooks/useMobileMenuAnimation";

const BODY_MENU_OPEN_ATTR = "data-menu-open";

export function MobileMenuWrapper() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const { isMobileMenuOpen, closeMobileMenu } = useNavigation();
  const { overlayRef, panelRef, navRef } = useMobileMenuAnimation({
    isOpen: isMobileMenuOpen,
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.setAttribute(BODY_MENU_OPEN_ATTR, "");
    } else {
      document.body.removeAttribute(BODY_MENU_OPEN_ATTR);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <div
        ref={overlayRef}
        className="overlay overlay--menu lg:hidden"
        onClick={closeMobileMenu}
        aria-hidden
      />
      <div
        ref={panelRef}
        className="fixed inset-0 z-10000 flex w-full items-center justify-center p-6 glass-menu lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        <nav
          ref={navRef}
          className="flex flex-col items-center justify-center gap-5"
        >
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
