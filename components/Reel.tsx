import { forwardRef } from "react";
import { LikeButton } from "./LikeButton";
import { ReelActiveContext } from "./ReelActiveContext";

interface ReelProps {
  children: React.ReactNode;
  description?: string;
  isActive?: boolean;
  shouldPreload?: boolean;
}

export const Reel = forwardRef<HTMLDivElement, ReelProps>(function Reel(
  { children, description, isActive = false, shouldPreload = false },
  ref
) {
  return (
    <ReelActiveContext.Provider value={{ isActive, shouldPreload }}>
    <div
      ref={ref}
      className="h-screen flex justify-center snap-start"
    >
      <div className="relative w-full md:w-150 md:my-4 h-full md:h-[calc(100%-2rem)] overflow-hidden md:border border-[#222427] md:rounded-2xl bg-black shadow-[0_4px_50px_20px_rgba(0,0,80,0.1)]">
        <div className="h-full w-full">{children}</div>
        {description && (
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-linear-to-t from-black/80 to-transparent">
            <p className="text-white text-sm leading-snug">{description}</p>
          </div>
        )}
      </div>
      <div className="hidden md:flex flex-col items-center justify-end pb-[20%] pl-4 gap-4">
        <LikeButton />
      </div>
    </div>
    </ReelActiveContext.Provider>
  );
});
