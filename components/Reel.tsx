import { forwardRef } from "react";
import { LikeButton } from "./LikeButton";

interface ReelProps {
  children: React.ReactNode;
}

export const Reel = forwardRef<HTMLDivElement, ReelProps>(function Reel(
  { children },
  ref
) {
  return (
    <div
      ref={ref}
      className="h-screen flex justify-center snap-start"
    >
      <div className="w-150 my-4 h-[calc(100%-2rem)] overflow-hidden border border-[#222427] rounded-2xl bg-black shadow-[0_4px_50px_20px_rgba(0,0,80,0.1)]">
        {children}
      </div>
      <div className="flex flex-col items-center justify-end pb-[20%] pl-4 gap-4">
        <LikeButton />
      </div>
    </div>
  );
});
