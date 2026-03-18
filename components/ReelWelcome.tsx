"use client";

import Image from "next/image";
import { useReelsOptional } from "./ReelsContext";
import Link from "next/link";

const STATS = [
  { value: "3+", label: "yrs exp" },
  { value: "7", label: "projects" },
  { value: "B.Sc.", label: "degree" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", icon: "/Linkedin.svg", href: "https://linkedin.com/in/arfaria" },
  { label: "GitHub", icon: "/Github.svg", href: "https://github.com/afaaafa" },
  { label: "Substack", icon: "/Substack.svg", href: "https://afaaafa.substack.com/" },
];

const NAV_HIGHLIGHTS = [
  { id: "experience-fit", emoji: "😎", label: "Experience" },
  { id: "projects", emoji: "👍", label: "Projects" },
  { id: "education", emoji: "🧠", label: "Education" },
  { id: "contact", emoji: "📱", label: "Contact" },
];

const IG_GRADIENT = "linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7)";

interface ReelWelcomeProps {
  reelId?: string;
  video?: React.ReactNode;
}

export function ReelWelcome({ video }: ReelWelcomeProps) {
  const reels = useReelsOptional();

  return (
    <div className="relative h-full">
      {video && (
        <>
          <div className="absolute inset-0">{video}</div>
          <div className="absolute inset-0 bg-black/80" />
        </>
      )}

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-7 px-6 py-12 text-white">

        <div className="rounded-full p-0.75" style={{ background: IG_GRADIENT }}>
          <div className="rounded-full bg-black p-0.75">
            <Link href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} target="_blank" rel="noopener noreferrer">
              <Image
                src="/Profile.jpg"
                alt="Arthur Faria"
                  width={86}
                  height={86}
                className="rounded-full object-cover"
              />
            </Link>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-black tracking-tight">Arthur Faria</h1>
          <p className="mt-1 text-sm text-white/60">Software Engineer · 🇧🇷</p>
        </div>

        {/* Stats */}
        <div className="flex w-full max-w-65 divide-x divide-white/15">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-0.5">
              <span className="text-lg font-black">{value}</span>
              <span className="text-[11px] text-white/50">{label}</span>
            </div>
          ))}
        </div>

        {/* Bio */}
        <p className="max-w-60 text-center text-sm leading-relaxed text-white/70">
          I'm a Product Engineer (or at least this what I say to my mom and co-workers).
        </p>

        {/* Social links */}
        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map(({ label, icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="opacity-60 transition hover:opacity-100"
            >
              <Image src={icon} alt={label} width={22} height={22} />
            </a>
          ))}
        </div>

        <div className="flex gap-5">
          {NAV_HIGHLIGHTS.map(({ id, emoji, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => reels?.scrollToReel(id)}
              className="flex cursor-pointer flex-col items-center gap-1.5 transition-transform active:scale-90"
            >
              <div className="rounded-full p-[2.5px]" style={{ background: IG_GRADIENT }}>
                <div className="flex h-13.5 w-13.5 items-center justify-center rounded-full bg-black text-2xl transition hover:bg-neutral-900">
                  {emoji}
                </div>
              </div>
              <span className="text-[11px] font-medium text-white/70">{label}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
