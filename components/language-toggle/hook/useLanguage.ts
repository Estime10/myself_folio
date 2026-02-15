"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { changeLanguage } from "@/lib/changeLanguage";

export function useLanguage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (locale: string, currentLocale: string) => {
    if (locale === currentLocale) return;

    startTransition(async () => {
      await changeLanguage(locale);
      router.refresh();
    });
  };

  return {
    isPending,
    handleLanguageChange,
  };
}
