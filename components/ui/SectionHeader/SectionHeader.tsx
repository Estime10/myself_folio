import type { ReactNode } from "react";

const EYEBROW_CLASS =
  "text-xs font-semibold uppercase tracking-[0.28em] text-text-secondary/80";
const TITLE_CLASS =
  "mt-2 text-2xl font-semibold text-text-primary md:text-3xl";
const INTRO_CLASS =
  "max-w-md text-sm text-text-secondary/90 md:text-[15px] lg:text-[15.5px]";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  /** Marges sous le bloc (ex. mb-10, mb-12). Défaut : mb-12 */
  headerClassName?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  intro,
  headerClassName = "mb-12",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col gap-3 md:flex-row md:items-end md:justify-between ${headerClassName}`}
    >
      <div>
        <p className={EYEBROW_CLASS}>{eyebrow}</p>
        <h1 className={TITLE_CLASS}>{title}</h1>
      </div>
      <p className={INTRO_CLASS}>{intro}</p>
    </div>
  );
}
