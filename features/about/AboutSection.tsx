import { aboutItemsConfig } from "./data/aboutConfig";
import { AboutImagesBlock } from "./ui/AboutImagesBlock/AboutImagesBlock";

export async function AboutSection() {
  return (
    <section className="relative flex min-h-full w-full flex-1 flex-col lg:overflow-hidden">
      <div className="flex-1 min-h-0" />
      <AboutImagesBlock items={aboutItemsConfig} />
    </section>
  );
}
