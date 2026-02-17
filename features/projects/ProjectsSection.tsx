import { getTranslations } from "next-intl/server";
import { Container } from "@/components/container/Container";
import { SectionHeader } from "@/components/ui/SectionHeader/SectionHeader";
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
    <section className="py-12 md:py-16 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:justify-center lg:py-20">
      <Container>
        <SectionHeader
          eyebrow={tProjects("sectionEyebrow")}
          title={tProjects("sectionTitle")}
          intro={tProjects("sectionIntro")}
          headerClassName="mb-10"
        />
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
