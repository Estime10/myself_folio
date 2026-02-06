import { Header } from "@/components/header";
import { ProjectsSection } from "@/features/projects";

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <ProjectsSection />
      </main>
    </div>
  );
}
