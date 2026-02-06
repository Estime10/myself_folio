import type { Project } from "@/features/projects/data/projectsConfig";

type ProjectCardBodyProps = {
  project: Pick<Project, "summary" | "role" | "stack">;
};

export function ProjectCardBody({ project }: ProjectCardBodyProps) {
  return (
    <div className="flex flex-1 flex-col justify-between px-6 pb-5 pt-3">
      <p className="text-[13px] leading-relaxed text-text-muted">
        {project.summary}
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-text-secondary/75">
        <span className="rounded-full bg-white/5 px-3 py-1 text-[10px]">
          {project.role}
        </span>
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-white/3 px-2.5 py-0.5 text-[10px]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
