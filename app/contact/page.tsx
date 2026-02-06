import { getTranslations } from "next-intl/server";

export default async function ContactPage() {
  const t = await getTranslations("common");

  return (
    <main className="flex flex-1 flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold uppercase text-text-primary">
        {t("contact")}
      </h1>
    </main>
  );
}
