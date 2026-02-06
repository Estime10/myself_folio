import { Container } from "@/components/container/Container";
import { ProjectCard } from "@/features/projects/ui/ProjectCard/ProjectCard";
import { projects } from "./data/projectsConfig";

export function ProjectsSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-text-secondary/80">
              Projects
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-text-primary md:text-3xl">
              Sélection de produits livrés
            </h1>
          </div>
          <p className="max-w-md text-sm text-text-muted">
            Quelques projets représentatifs de ma façon de travailler : focus
            produit, design system robuste et exécution front soignée.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
