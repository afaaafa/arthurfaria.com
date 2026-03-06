"use client";

const LANGUAGE_STYLES: Record<string, { dot: string; label: string }> = {
  TypeScript: { dot: "bg-blue-400", label: "text-blue-300" },
  JavaScript: { dot: "bg-yellow-400", label: "text-yellow-300" },
  Ruby: { dot: "bg-red-400", label: "text-red-300" },
  Python: { dot: "bg-green-400", label: "text-green-300" },
  Go: { dot: "bg-cyan-400", label: "text-cyan-300" },
};

export interface Project {
  name: string;
  description: string;
  language: string;
  github: string;
}

interface ReelProjectsProps {
  projects: Project[];
}

export function ReelProjects({ projects }: ReelProjectsProps) {
  return (
    <div className="flex h-full flex-col text-white">
      <div className="flex flex-col gap-1 px-8 pt-8 pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-white/30">Projects</p>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto px-8 pb-8">
        {projects.map((project) => {
          const lang = LANGUAGE_STYLES[project.language] ?? {
            dot: "bg-white/40",
            label: "text-white/50",
          };

          return (
            <a
              key={project.name}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 border border-white/10 bg-white/5 p-4 transition hover:border-white/25 hover:bg-white/10"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-semibold text-white">
                  <span className="mr-1.5 text-white/30">~/</span>
                  {project.name}
                </span>

                <img
                  src="/arrow-up-right.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="shrink-0 opacity-20 invert transition group-hover:opacity-60"
                />
              </div>

              <p className="text-xs leading-relaxed text-white/50">{project.description}</p>

              <div className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${lang.dot}`} />
                <span className={`text-[10px] font-semibold ${lang.label}`}>
                  {project.language}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
