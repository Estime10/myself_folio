import { getLocale } from "next-intl/server";
import { SITE_NAME } from "@/lib/config/site";

import { NavigationDesktopLinks } from "@/features/navigation/ui/NavigationDesktopLinks/NavigationDesktopLinks";
import { LanguageToggle } from "@/components/language-toggle/ui/LanguageToggle";

export async function NavigationDesktop() {
  const locale = await getLocale();

  return (
    <nav className="hidden lg:flex items-center justify-between py-4">
      <div className="flex items-center">
        <p className="font-bold text-base uppercase">{SITE_NAME}</p>
      </div>
      <div className="flex items-center gap-12 lg:gap-16 xl:gap-24 uppercase absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
        <NavigationDesktopLinks />
      </div>
      <div className="flex items-center">
        <LanguageToggle currentLocale={locale} />
      </div>
    </nav>
  );
}
