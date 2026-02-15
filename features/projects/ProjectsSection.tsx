import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container/Container";
import { ProjectCard } from "@/features/projects/ui/ProjectCard/ProjectCard";
import type { Project } from "./data/projectsConfig";
import { projects } from "./data/projectsConfig";

export async function ProjectsSection() {
  const tProjects = await getTranslations("projects");
  const tTech = await getTranslations("tech");

  const cardsData = projects.map((project) => ({
    project: {
      id: project.id,
      name: project.name,
      url: project.url,
    } satisfies Pick<Project, "id" | "name" | "url">,
    summary: tProjects(project.summaryKey),
    tags: project.tagKeys.map((key) => tTech(key)),
  }));

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-text-secondary/80">
              {tProjects("sectionEyebrow")}
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-text-primary">
              {tProjects("sectionTitle")}
            </h1>
          </div>
          <p className="max-w-md text-sm text-white md:text-[15px] lg:text-[15.5px]">
            {tProjects("sectionIntro")}
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {cardsData.map(({ project, summary, tags }) => (
            <ProjectCard
              key={project.id}
              project={project}
              summary={summary}
              tags={tags}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
