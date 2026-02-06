import { Container } from "@/components/container/Container";
import { NavigationDesktop } from "@/features/navigation/ui/NavigationDesktop/NavigationDesktop";
import { NavigationMobile } from "@/features/navigation/ui/NavigationMobile/NavigationMobile";

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
