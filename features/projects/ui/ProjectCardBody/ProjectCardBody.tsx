type ProjectCardBodyProps = {
  project: {
    summary: string;
    tags: string[];
  };
};

export function ProjectCardBody({ project }: ProjectCardBodyProps) {
  return (
    <div className="flex flex-1 flex-col px-6 pt-3 pb-5">
      <div className="flex flex-1 items-center justify-center text-center">
        <p className="text-[13.5px] leading-relaxed text-white md:text-[18px] lg:text-[13.5px] xl:text-[15px]">
          {project.summary}
        </p>
      </div>
      <div
        className="tag-text mt-3 flex flex-wrap justify-center gap-2 uppercase tracking-[0.18em] text-text-secondary/75"
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="tag-text rounded-full bg-white/3 px-2.5 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
