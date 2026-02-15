import type { Project } from "@/features/projects/data/projectsConfig";
import { ProjectCardHeader } from "@/features/projects/ui/ProjectCardHeader/ProjectCardHeader";
import { ProjectCardBody } from "@/features/projects/ui/ProjectCardBody/ProjectCardBody";

type ProjectCardProps = {
  project: Pick<Project, "id" | "name" | "url">;
  summary: string;
  tags: string[];
};

export function ProjectCard({
  project,
  summary,
  tags,
}: ProjectCardProps) {
  return (
    <article className="card-base group relative flex h-full min-h-[360px] flex-col overflow-hidden">
      <ProjectCardHeader project={{ name: project.name, url: project.url }} />
      <ProjectCardBody project={{ summary, tags }} />
    </article>
  );
}
