"use client";


interface Tag {
  label: string;
  className: string;
}

export interface ReelExperienceProps {
  reelId?: string;
  role: string;
  company: string;
  period: string;
  type: string;
  location: string;
  tags: Tag[];
  highlights: string[];
  video?: React.ReactNode;
}

export function ReelExperience({
  role,
  company,
  period,
  type,
  location,
  tags,
  highlights,
  video,
}: ReelExperienceProps) {

  return (
    <div className="flex h-full flex-col text-white">
      <div className="flex flex-col gap-2 px-8 py-8">
        <p className="text-xs font-bold uppercase tracking-widest text-white/30">Experience</p>
        <h2 className="text-3xl font-black tracking-tight">{company}</h2>
        <p className="text-sm font-semibold text-white/70">{role}</p>
        <div className="flex items-center gap-2 text-[10px] text-white/40">
          <span>{type}</span>
          <span>·</span>
          <span>{location}</span>
          <span>·</span>
          <span>{period}</span>
        </div>
        <div className="mt-1 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className={`border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tag.className}`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <ul className="mt-2 flex flex-col gap-2">
          {highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm leading-relaxed text-white/70">
              <span className="mt-0.5 shrink-0 text-white/30">→</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {video && (
        <div className="relative min-h-0 flex-1 overflow-hidden">
          {video}
        </div>
      )}
    </div>
  );
}
