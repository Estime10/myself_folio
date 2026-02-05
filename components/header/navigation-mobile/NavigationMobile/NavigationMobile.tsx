import { SITE_NAME } from "@/lib/config/site";
import { NavigationProvider } from "../../context/NavigationContext";
import { MobileMenuButton } from "../MobileMenuButton/MobileMenuButton";
import { MobileMenuWrapper } from "../MobileMenuWrapper/MobileMenuWrapper";

export function NavigationMobile() {
  return (
    <NavigationProvider>
      <nav className="lg:hidden" aria-label="Navigation mobile">
        <div className="flex items-center justify-between py-4 w-full">
          <p className="font-bold text-xl uppercase">{SITE_NAME}</p>
          <MobileMenuButton />
        </div>
        <MobileMenuWrapper />
      </nav>
    </NavigationProvider>
  );
}
