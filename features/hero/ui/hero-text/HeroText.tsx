type HeroTextProps = {
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  bio: string;
};

export function HeroText({
  titleLine1,
  titleLine2,
  titleLine3,
  bio,
}: HeroTextProps) {
  return (
    <>
      <h1 className="flex flex-col gap-0 text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl lg:flex-row lg:flex-wrap lg:gap-x-2 lg:gap-y-0 lg:text-6xl">
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
