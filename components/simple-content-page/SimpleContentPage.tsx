import { getTranslations } from "next-intl/server";

const TITLE_CLASS = "text-2xl font-semibold uppercase text-text-primary";
const WRAPPER_CLASS = "flex flex-1 flex-col items-center justify-center p-6";

type SimpleContentPageProps = {
  /** Clé de traduction pour le titre (namespace: common). */
  titleKey: string;
};

/** Contenu centré avec titre traduit. Le layout racine fournit déjà <main>. */
export async function SimpleContentPage({
  titleKey,
}: SimpleContentPageProps) {
  const t = await getTranslations("common");
  const title = t(titleKey);

  return (
    <div className={WRAPPER_CLASS}>
      <h1 className={TITLE_CLASS}>{title}</h1>
    </div>
  );
}
