import { setUserLocale } from "@/lib/locale";

export async function changeLanguage(locale: string): Promise<void> {
  await setUserLocale(locale);
  // Recharger la page pour appliquer les nouvelles traductions
  window.location.reload();
}
