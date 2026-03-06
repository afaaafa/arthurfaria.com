"use client";

import { createContext, useContext } from "react";

export const ReelActiveContext = createContext(false);

export function useReelActive() {
  return useContext(ReelActiveContext);
}
