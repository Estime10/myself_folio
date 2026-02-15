import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "./lib/locale";
import { validateMessages } from "./lib/messagesSchema";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  const raw = (await import(`./messages/${locale}.json`)).default;
  const messages = validateMessages(raw);

  return {
    locale,
    messages,
  };
});
