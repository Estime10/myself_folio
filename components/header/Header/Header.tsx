import { Container } from "@/components/ui/container/Container";
import { NavigationDesktop } from "../navigation-desktop/NavigationDesktop";
import { NavigationMobile } from "../navigation-mobile/NavigationMobile/NavigationMobile";

export function Header() {
  return (
    <header className="site-header sticky top-0 z-50 glass">
      <Container>
        <NavigationDesktop />
        <NavigationMobile />
      </Container>
    </header>
  );
}
