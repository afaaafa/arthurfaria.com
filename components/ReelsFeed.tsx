"use client";

import { useRef } from "react";
import { Reel } from "./Reel";

export interface ReelData {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface ReelsFeedProps {
  reels: ReelData[];
}

export function ReelsFeed({ reels }: ReelsFeedProps) {
  const reelRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  function scrollToReel(id: string) {
    const el = reelRefs.current.get(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function setRef(id: string) {
    return (el: HTMLDivElement | null) => {
      if (el) {
        reelRefs.current.set(id, el);
      } else {
        reelRefs.current.delete(id);
      }
    };
  }

  return (
    <>
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        {reels.map((reel) => (
          <Reel key={reel.id} ref={setRef(reel.id)}>
            {reel.content}
          </Reel>
        ))}
      </div>

      {/* <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {reels.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToReel(id)}
              className="px-3 py-1 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
            >
              {label}
            </button>
          )
        )}
      </nav> */}
    </>
  );
}
