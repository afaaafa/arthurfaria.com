"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface LikeButtonProps {
  reelId: string;
}

export function LikeButton({ reelId }: LikeButtonProps) {
  const storageKey = `liked_${reelId}`;
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setLiked(localStorage.getItem(storageKey) === "1");

    fetch(`/api/likes/${reelId}`)
      .then((r) => r.json())
      .then((d) => setCount(d.count));
  }, [reelId, storageKey]);

  async function handleClick() {
    const next = !liked;
    setLiked(next);
    setCount((c) => (c === null ? null : c + (next ? 1 : -1)));

    if (next) {
      localStorage.setItem(storageKey, "1");
    } else {
      localStorage.removeItem(storageKey);
    }

    await fetch(`/api/likes/${reelId}`, { method: next ? "POST" : "DELETE" });
  }

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center gap-1 hover:scale-105"
      aria-label={liked ? "Unlike" : "Like"}
    >
      <Image
        src={liked ? "/Unlike.svg" : "/Like.svg"}
        alt={liked ? "Unlike" : "Like"}
        width={28}
        height={28}
      />
      {count !== null && (
        <span className="text-white text-xs">{count}</span>
      )}
    </button>
  );
}
