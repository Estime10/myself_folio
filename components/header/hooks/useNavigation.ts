import { useNavigationContext } from "../context/NavigationContext";

export function useNavigation() {
  return useNavigationContext();
}
