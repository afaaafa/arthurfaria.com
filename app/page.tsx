import { ReelsFeed, ReelData } from "@/components/ReelsFeed";

const REELS_DATA: ReelData[] = [
  {
    id: "hero",
    label: "Home",
    content: (
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-5xl font-bold">Arthur Faria</h1>
        <p className="text-white/60 text-lg">Between breaking things and building things</p>
      </div>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    content: (
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold">Skills</h2>
        <p className="text-white/60">Coming soon...</p>
      </div>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    content: (
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold">Projects</h2>
        <p className="text-white/60">Coming soon...</p>
      </div>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    content: (
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold">Contact</h2>
        <p className="text-white/60">Coming soon...</p>
      </div>
    ),
  },
];

export default function Home() {
  return (
    <main>
      <ReelsFeed reels={REELS_DATA} />
    </main>
  );
}
