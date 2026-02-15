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
    <article className="group relative flex h-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-bg-tertiary/60 shadow-[0_18px_45px_rgba(0,0,0,0.7)] backdrop-blur-xl">
      <ProjectCardHeader project={{ name: project.name, url: project.url }} />
      <ProjectCardBody project={{ summary, tags }} />
    </article>
  );
}
