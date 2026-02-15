import { SITE_NAME } from "@/lib/config/site";
import { NavigationProvider } from "@/features/navigation/context/NavigationContext";
import { MobileMenuButton } from "@/features/navigation/ui/MobileMenuButton/MobileMenuButton";
import { MobileMenuWrapper } from "@/features/navigation/ui/MobileMenuWrapper/MobileMenuWrapper";

export function NavigationMobile() {
  return (
    <NavigationProvider>
      <nav className="lg:hidden" aria-label="Navigation mobile">
        <div className="flex items-center justify-between py-4 w-full">
          <p className="font-bold text-2xl uppercase">{SITE_NAME}</p>
          <MobileMenuButton />
        </div>
        <MobileMenuWrapper />
      </nav>
    </NavigationProvider>
  );
}
