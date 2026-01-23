import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "./lib/locale";

export default getRequestConfig(async () => {
  // Obtenir la locale depuis le cookie côté serveur
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
