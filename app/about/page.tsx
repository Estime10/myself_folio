import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("common");

  return (
    <main className="flex flex-1 flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold uppercase text-text-primary">
        {t("about")}
      </h1>
    </main>
  );
}
