"use client";

import { forwardRef, useState, useEffect } from "react";
import { LikeButton } from "./LikeButton";
import { CommentButton, CommentSection } from "./CommentSection";
import { ReelActiveContext } from "./ReelActiveContext";

interface ReelProps {
  children: React.ReactNode;
  description?: string;
  isActive?: boolean;
  shouldPreload?: boolean;
  reelId: string;
}

export const Reel = forwardRef<HTMLDivElement, ReelProps>(function Reel(
  { children, description, isActive = false, shouldPreload = false, reelId },
  ref
) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentCount, setCommentCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/comments/${reelId}`)
      .then((r) => r.json())
      .then((d) => setCommentCount((d.comments ?? []).length));
  }, [reelId]);

  return (
    <ReelActiveContext.Provider value={{ isActive, shouldPreload }}>
      <div ref={ref} className="h-dvh flex justify-center snap-start">
        <div className="relative w-full md:w-150 md:my-4 h-full md:h-[calc(100%-2rem)] overflow-hidden md:border border-[#222427] md:rounded-2xl bg-black shadow-[0_4px_50px_20px_rgba(0,0,80,0.1)]">
          <div className="h-full w-full">{children}</div>
          {description && (
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-linear-to-t from-black/80 to-transparent">
              <p className="text-white text-sm leading-snug">{description}</p>
            </div>
          )}
          <div className="md:hidden absolute right-3 bottom-[15%] flex flex-col items-center gap-4 z-20">
            <LikeButton reelId={reelId} />
            <CommentButton
              count={commentCount}
              onClick={() => setCommentOpen((o) => !o)}
            />
          </div>
          <CommentSection
            reelId={reelId}
            open={commentOpen}
            onClose={() => setCommentOpen(false)}
          />
        </div>
        <div className="hidden md:flex flex-col items-center justify-end pb-[20%] pl-4 gap-4">
          <LikeButton reelId={reelId} />
          <CommentButton
            count={commentCount}
            onClick={() => setCommentOpen((o) => !o)}
          />
        </div>
      </div>
    </ReelActiveContext.Provider>
  );
});
