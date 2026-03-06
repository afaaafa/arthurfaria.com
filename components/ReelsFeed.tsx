"use client";

import { useRef, useState, useEffect } from "react";
import { Reel } from "./Reel";
import { ReelsContext } from "./ReelsContext";

export interface ReelData {
  id: string;
  label: string;
  content: React.ReactNode;
  description?: string;
}

interface ReelsFeedProps {
  reels: ReelData[];
  sidebar?: React.ReactNode;
}

export function ReelsFeed({ reels, sidebar }: ReelsFeedProps) {
  const reelRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [activeReelId, setActiveReelId] = useState<string | null>(
    reels[0]?.id ?? null
  );
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    reelRefs.current.forEach((el, id) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveReelId(id);
          }
        },
        { threshold: 0.6 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [reels]);

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
    <ReelsContext.Provider value={{ activeReelId, scrollToReel, muted, setMuted }}>
      {sidebar}
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        {reels.map((reel) => (
          <Reel key={reel.id} ref={setRef(reel.id)} description={reel.description} isActive={reel.id === activeReelId}>
            {reel.content}
          </Reel>
        ))}
      </div>
    </ReelsContext.Provider>
  );
}
