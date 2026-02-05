import { Header } from "@/components/header";
import { getTranslations } from "next-intl/server";

export default async function ProjectsPage() {
  const t = await getTranslations("common");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold uppercase text-text-primary">
          {t("projects")}
        </h1>
      </main>
    </div>
  );
}
