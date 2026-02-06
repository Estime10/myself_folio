"use client";

import type { Project } from "@/features/projects/projectsConfig";
import { ProjectCardHeader } from "../ProjectCardHeader/ProjectCardHeader";
import { ProjectCardBody } from "../ProjectCardBody/ProjectCardBody";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative flex h-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-bg-tertiary/60 shadow-[0_18px_45px_rgba(0,0,0,0.7)] backdrop-blur-xl">
      <ProjectCardHeader project={{ name: project.name, url: project.url }} />
      <ProjectCardBody
        project={{
          summary: project.summary,
          role: project.role,
          stack: project.stack,
        }}
      />
    </article>
  );
}
