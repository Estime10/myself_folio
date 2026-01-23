import { MobileMenuButton } from "../MobileMenuButton/MobileMenuButton";
import { MobileMenuWrapper } from "../MobileMenuWrapper/MobileMenuWrapper";

export function NavigationMobile() {
  return (
    <nav className="lg:hidden">
      <div className="flex items-center justify-between py-4">
        <MobileMenuButton />
      </div>
      <MobileMenuWrapper />
    </nav>
  );
}
