import type { Project } from "@/features/projects/data/projectsConfig";
import { ProjectCardGlobeLink } from "@/features/projects/ui/ProjectCardGlobeLink/ProjectCardGlobeLink";

type ProjectCardHeaderProps = {
  project: Pick<Project, "name" | "url">;
};

export function ProjectCardHeader({ project }: ProjectCardHeaderProps) {
  return (
    <div className="relative h-[25%]">
      {/* Visuel / image abstraite */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-accent-primary/20 to-black/60" />
      <div className="absolute inset-[18px] rounded-xl border border-white/8 bg-black/20 shadow-[0_12px_40px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:translate-y-[-2px] group-hover:shadow-[0_18px_60px_rgba(0,0,0,0.85)]" />

      {/* Titre centré dans la zone haute */}
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center">
        <h3 className="text-xl font-semibold text-text-primary md:text-2xl">
          {project.name}
        </h3>
      </div>

      {/* Barre + icône Earth positionnés à la limite des 25% pour couper la carte */}
      <div className="absolute inset-x-0 top-full -translate-y-1/2 flex h-10 items-center justify-center">
        <div className="h-px w-full bg-white/10" />
        <ProjectCardGlobeLink name={project.name} url={project.url} />
      </div>
    </div>
  );
}
