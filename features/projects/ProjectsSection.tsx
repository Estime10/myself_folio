import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container/Container";
import { ProjectCard } from "@/features/projects/ui/ProjectCard/ProjectCard";
import { projects } from "./data/projectsConfig";

export async function ProjectsSection() {
  const t = await getTranslations("projects");

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-text-secondary/80">
              {t("sectionEyebrow")}
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-text-primary">
              {t("sectionTitle")}
            </h1>
          </div>
          <p className="max-w-md text-sm text-white md:text-[15px] lg:text-[15.5px]">
            {t("sectionIntro")}
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
