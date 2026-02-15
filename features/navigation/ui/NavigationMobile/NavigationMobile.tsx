import { getLocale } from "next-intl/server";
import { SITE_NAME } from "@/lib/config/site";
import { NavigationProvider } from "@/features/navigation/context/NavigationContext";
import { MobileHeaderActions } from "@/features/navigation/ui/NavigationMobile/MobileHeaderActions/MobileHeaderActions";
import { MobileMenuWrapper } from "@/features/navigation/ui/MobileMenuWrapper/MobileMenuWrapper";

export async function NavigationMobile() {
  const locale = await getLocale();

  return (
    <NavigationProvider>
      <nav className="lg:hidden" aria-label="Navigation mobile">
        <div className="relative z-[10001] flex w-full items-center justify-between py-4">
          <p className="font-bold text-2xl uppercase">{SITE_NAME}</p>
          <MobileHeaderActions currentLocale={locale} />
        </div>
        <MobileMenuWrapper />
      </nav>
    </NavigationProvider>
  );
}
