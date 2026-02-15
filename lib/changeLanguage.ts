"use server";

import { setUserLocale } from "@/lib/locale";

// Server action: met à jour la locale utilisateur via cookie.
export async function changeLanguage(locale: string): Promise<void> {
  await setUserLocale(locale);
}
