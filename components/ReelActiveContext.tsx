"use client";

import { createContext, useContext } from "react";

interface ReelActiveContextValue {
  isActive: boolean;
  shouldPreload: boolean;
}

export const ReelActiveContext = createContext<ReelActiveContextValue>({
  isActive: false,
  shouldPreload: false,
});

export function useReelActive() {
  return useContext(ReelActiveContext).isActive;
}

export function useReelShouldPreload() {
  return useContext(ReelActiveContext).shouldPreload;
}
