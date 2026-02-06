import { useNavigationContext } from "@/features/navigation/context/NavigationContext";

export function useNavigation() {
  return useNavigationContext();
}
