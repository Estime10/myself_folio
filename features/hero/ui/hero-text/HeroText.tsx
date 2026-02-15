type HeroTextProps = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  bio: string;
};

const EYEBROW_CLASS =
  "text-xs font-semibold uppercase tracking-[0.28em] text-text-secondary/80";

export function HeroText({
  eyebrow,
  titleLine1,
  titleLine2,
  titleLine3,
  bio,
}: HeroTextProps) {
  return (
    <>
      <p className={EYEBROW_CLASS}>{eyebrow}</p>
      <h1 className="mt-2 flex flex-col gap-0 text-3xl font-semibold uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl lg:flex-row lg:flex-wrap lg:gap-x-2 lg:gap-y-0 lg:text-6xl">
        <span>{titleLine1}</span>
        <span>{titleLine2}</span>
        <span>{titleLine3}</span>
      </h1>
      <p className="mt-4 max-w-lg text-lg text-text-secondary md:text-xl lg:max-w-4xl lg:text-3xl">
        {bio}
      </p>
    </>
  );
}
