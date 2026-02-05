import { getTranslations, getLocale } from "next-intl/server";
import { SITE_NAME } from "@/lib/config/site";
import { navigationItems } from "@/features/navigation";
import { LanguageToggle } from "@/components/ui/language-toggle/ui/LanguageToggle";
import Link from "next/link";

export async function NavigationDesktop() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <nav className="hidden lg:flex items-center justify-between py-4">
      {/* Logo à gauche */}
      <div className="flex items-center">
        <p className="font-bold text-base uppercase">{SITE_NAME}</p>
      </div>

      {/* Navigation au centre */}
      <div className="flex items-center gap-12 lg:gap-16 xl:gap-24 uppercase absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 font-bold text-base transition-colors lg:hover:text-accent-primary"
          >
            {t(item.translationKey)}
          </Link>
        ))}
      </div>

      {/* Toggle de langue à droite */}
      <div className="flex items-center">
        <LanguageToggle currentLocale={locale} />
      </div>
    </nav>
  );
}
