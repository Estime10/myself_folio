"use client";

import { useLanguage } from "../hook/useLanguage";

const languages = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
] as const;

type LanguageToggleProps = {
  currentLocale: string;
};

export function LanguageToggle({ currentLocale }: LanguageToggleProps) {
  const { isPending, handleLanguageChange } = useLanguage();

  return (
    <div className="flex items-center text-lg font-bold">
      {languages.map((lang, index) => (
        <div key={lang.code} className="flex items-center ">
          <button
            onClick={() => handleLanguageChange(lang.code, currentLocale)}
            disabled={isPending}
            className={`
              transition-all
              ${
                currentLocale === lang.code
                  ? "text-accent-primary"
                  : "text-text-primary lg:hover:text-accent-primary hover:cursor-pointer"
              }
              ${isPending ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && (
            <span className="text-text-secondary mx-1">/</span>
          )}
        </div>
      ))}
    </div>
  );
}
