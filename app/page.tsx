import fs from "fs";
import path from "path";

import { Sidebar } from "@/components/Sidebar";
import { ReelsFeed, ReelData } from "@/components/ReelsFeed";
import { ReelWelcome } from "@/components/ReelWelcome";
import { ReelExperience } from "@/components/ReelExperience";
import { ReelVideo } from "@/components/ReelVideo";
import { ReelContact } from "@/components/ReelContact";
import { ReelProjects } from "@/components/ReelProjects";

function randomBrainrotVideos(count: number): string[] {
  const dir = path.join(process.cwd(), "public", "reels", "brainrot");
  
  if (!fs.existsSync(dir)) {
    console.warn(`Directory ${dir} does not exist. No brainrot videos will be loaded.`);

    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mp4"));
  const shuffled = files.sort(() => Math.random() - 0.5);
  
  return shuffled.slice(0, count).map((f) => `/reels/brainrot/${f}`);
}

export default function Home() {
  const [fitVideo, freelanceVideo, pingbackVideo] = randomBrainrotVideos(3);

  const reels: ReelData[] = [
    {
      id: "welcome",
      label: "Welcome",
      content: <ReelWelcome reelId="welcome" video={<ReelVideo src="/reels/return-to-monke.mp4" />} />,
    },
    {
      id: "experience-fit",
      label: "FIT Energia",
      content: (
        <ReelExperience
          reelId="experience-fit"
          role="Software Engineer"
          company="FIT Energia (Santander Group)"
          period="Mar 2025 – Present"
          type="Full time · Fullstack"
          location="Belo Horizonte, Brazil"
          tags={[
            { label: "Ruby on Rails", className: "border-red-500/60 text-red-400 bg-red-500/5" },
          ]}
          highlights={[
            "Promoted 3x in a single year",
            "Patched a critical IDOR vulnerability, preventing unauthorized modification of user financial data",
            "Increased user acquisition by 30% via a backend reward-referral system",
            "Reduced RAM usage by 70% using rate-limiting and concurrency in background jobs",
            "Led technical talks on OOD, Sidekiq Enterprise, and Clean Code",
          ]}
          video={<ReelVideo src={fitVideo} />}
        />
      ),
    },
    {
      id: "experience-freelance",
      label: "Freelancing",
      content: (
        <ReelExperience
          reelId="experience-freelance"
          role="Fullstack Software Engineer"
          company="Freelancing"
          period="Jul 2024 – Mar 2025"
          type="Contract"
          location="Remote"
          tags={[
            { label: "React", className: "border-cyan-400/50 text-cyan-300 bg-cyan-500/5" },
            { label: "Next.js", className: "border-white/40 text-white/80 bg-white/5" }
          ]}
          highlights={[
            "Built a real estate management platform with Next.js for centralized cataloging and automated price updates",
            "Implemented automated property sync via third-party APIs, reducing manual overhead",
            "Increased CTR by 60% on a solar energy landing page",
          ]}
          video={<ReelVideo src={freelanceVideo} />}
        />
      ),
    },
    {
      id: "experience-pingback",
      label: "Pingback",
      content: (
        <ReelExperience
          reelId="experience-pingback"
          role="Software Engineer"
          company="Pingback"
          period="Oct 2023 – Jul 2024"
          type="Full time · Backend"
          location="Belo Horizonte, Brazil"
          tags={[
            { label: "Node.js", className: "border-green-500/60 text-green-400 bg-green-500/5" },
          ]}
          highlights={[
            "Built an AI-driven analytics engine using OpenAI APIs, turning raw newsletter metrics into actionable insights",
            "Developed a lead-generation page with gated content delivery to drive newsletter subscription growth",
          ]}
          video={<ReelVideo src={pingbackVideo} />}
        />
      ),
    },
    {
      id: "projects",
      label: "Projects",
      content: (
        <ReelProjects
          projects={[
            {
              name: "arthurfaria.com",
              description: "Personal portfolio built as a brainrot experience.",
              language: "TypeScript",
              github: "https://github.com/afaaafa/arthurfaria.com",
            },
            {
              name: "linkai",
              description: "Linktree clone built with Rails 8.",
              language: "Ruby",
              github: "https://github.com/afaaafa/linkai",
            },
            {
              name: "smoni",
              description: "Scope monitor for bug bounty programs. Stay aware of any updates on the scopes you hunt.",
              language: "Python",
              github: "https://github.com/afaaafa/smoni",
            },
            {
              name: "ipfas",
              description: "IP Finder as well as Server Names.",
              language: "Go",
              github: "https://github.com/afaaafa/ipfas",
            },
            {
              name: "photon-energia",
              description: "Institutional site for Photon Energia, a solar energy company.",
              language: "TypeScript",
              github: "https://github.com/afaaafa/photon-energia",
            },
            {
              name: "ruby-oop",
              description: "Educational material on OOP in Ruby — classes, modules, namespaces, and mixins.",
              language: "Ruby",
              github: "https://github.com/afaaafa/ruby-oop",
            },
            {
              name: "memento-mori",
              description: "A web experience on the philosophy of Memento Mori — remember that you will die.",
              language: "JavaScript",
              github: "https://github.com/afaaafa/memento-mori",
            },
          ]}
        />
      ),
    },
    {
      id: "education",
      label: "Education",
      description: "B.Sc. Software Engineering, The Pontifical Catholic University of Minas Gerais",
      content: (
        <ReelVideo src="/reels/PUC-Minas.mp4" />
      ),
    },
    {
      id: "contact",
      label: "Contact",
      content: <ReelContact reelId="contact" />,
    },
  ];

  return (
    <ReelsFeed reels={reels} sidebar={<Sidebar key="sidebar" />} />
  );
}
