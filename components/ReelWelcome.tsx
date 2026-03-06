"use client";

import Image from "next/image";
import { useReelsOptional } from "./ReelsContext";

const LANGUAGES = [
  { label: "Ruby", className: "border-red-500/60 text-red-400" },
  { label: "JavaScript", className: "border-yellow-400/60 text-yellow-300" },
  { label: "TypeScript", className: "border-blue-400/60 text-blue-300" },
];

const FRAMEWORKS = [
  { label: "Rails", className: "border-white/20 text-white/70" },
  { label: "Node.js", className: "border-white/20 text-white/70" },
  { label: "Next.js", className: "border-white/20 text-white/70" },
  { label: "React", className: "border-white/20 text-white/70" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", icon: "/Linkedin.svg", href: "https://linkedin.com/in/arfaria" },
  { label: "GitHub", icon: "/Github.svg", href: "https://github.com/afaaafa", invert: true },
  { label: "Substack", icon: "/Substack.svg", href: "https://afaaafa.substack.com/" },
];

interface ReelWelcomeProps {
  reelId?: string;
  video?: React.ReactNode;
}

export function ReelWelcome({ reelId, video }: ReelWelcomeProps) {
  const reels = useReelsOptional();
  const isActive =
    reels == null || reelId == null ? true : reels.activeReelId === reelId;

  const handleJumpToReel = (targetId: string) => {
    reels?.scrollToReel(targetId);
  };

  return (
    <div className="relative h-full">
      {video && (
        <>
          <div className="absolute inset-0">{video}</div>
          <div className="absolute inset-0 bg-black/80" />
        </>
      )}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-8 px-8 py-12 text-white">
      <div className="flex flex-col items-center gap-4 text-center">
        <Image
          src="/Profile.jpg"
          alt="Arthur Faria"
          width={72}
          height={72}
          className="rounded-full border border-white/20 object-cover"
        />

        <div>
          <h1 className="text-3xl font-black tracking-tight">Arthur Faria</h1>
          <p className="mt-1 text-xs font-medium text-white/70">🇧🇷 Belo Horizonte, Brazil 🇧🇷</p>
        </div>

        <p className="max-w-sm text-sm leading-relaxed text-white/70">
          Software Engineer with 3+ years of experience building products.
          I bridge the gap between technical excellence and business growth.
        </p>

        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map(({ label, icon, href, invert }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="opacity-70 transition-opacity hover:opacity-100"
            >
              <Image src={icon} alt={label} width={24} height={24} />
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-wrap justify-center gap-2">
          {LANGUAGES.map((badge) => (
            <span
              key={badge.label}
              className={`border-2 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,0,0,0.6)] ${badge.className}`}
            >
              {badge.label}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {FRAMEWORKS.map((badge) => (
            <span
              key={badge.label}
              className={`border bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${badge.className}`}
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => handleJumpToReel("experience-fit")}
          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 transition hover:border-white/40 hover:bg-white/10"
        >
          😎 Experience
        </button>
        <button
          type="button"
          onClick={() => handleJumpToReel("education")}
          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 transition hover:border-white/40 hover:bg-white/10"
        >
          🧠 Education
        </button>
        <button
          type="button"
          onClick={() => handleJumpToReel("contact")}
          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 transition hover:border-white/40 hover:bg-white/10"
        >
          📱 Send me a Reels
        </button>
      </div>

      <p className="animate-bounce text-xs text-white/40">scroll down ↓</p>
      </div>
    </div>
  );
}
