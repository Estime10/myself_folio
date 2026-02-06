import { useTransition } from "react";
import { changeLanguage } from "@/lib/changeLanguage";

export function useLanguage() {
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (locale: string, currentLocale: string) => {
    if (locale === currentLocale) return;

    startTransition(async () => {
      await changeLanguage(locale);
    });
  };

  return {
    isPending,
    handleLanguageChange,
  };
}
