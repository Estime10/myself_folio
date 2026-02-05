import { getTranslations, getLocale } from "next-intl/server";
import { navigationItems } from "../navigation-items/navigationItems";
import { LanguageToggle } from "@/components/ui/language-toggle/ui/LanguageToggle";
import Link from "next/link";

export async function NavigationDesktop() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <nav className="hidden lg:flex items-center justify-between py-4">
      {/* Logo à gauche */}
      <div className="flex items-center">
        <p
          className="font-bold text-base uppercase"
        >
          Estime Vangu
        </p>
      </div>

      {/* Navigation au centre */}
      <div className="flex items-center gap-24 uppercase absolute left-1/2 -translate-x-1/2">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-bold text-base transition-colors lg:hover:text-accent-primary "
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
