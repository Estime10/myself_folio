type ProjectCardBodyProps = {
  project: {
    summary: string;
    tags: string[];
  };
};

export function ProjectCardBody({ project }: ProjectCardBodyProps) {
  return (
    <div className="flex flex-1 flex-col px-6 pb-5 pt-3">
      <div className="flex flex-1 items-center justify-center text-center">
        <p className="text-[13px] leading-relaxed text-text-muted">
          {project.summary}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2 text-[11px] uppercase tracking-[0.18em] text-text-secondary/75">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/3 px-2.5 py-0.5 text-[10px]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
