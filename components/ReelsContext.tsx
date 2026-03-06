"use client";

import { createContext, useContext } from "react";

export interface ReelsContextValue {
  activeReelId: string | null;
  scrollToReel: (id: string) => void;
  muted: boolean;
  setMuted: (muted: boolean) => void;
}

export const ReelsContext = createContext<ReelsContextValue | null>(null);

export function useReels(): ReelsContextValue {
  const ctx = useContext(ReelsContext);
  if (!ctx) throw new Error("useReels must be used inside ReelsFeed");
  return ctx;
}

export function useReelsOptional(): ReelsContextValue | null {
  return useContext(ReelsContext);
}
