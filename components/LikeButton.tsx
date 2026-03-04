"use client";

import { useState } from "react";
import Image from "next/image";

export function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked((prev) => !prev)}
      className="flex flex-col items-center gap-1 hover:scale-105"
      aria-label={liked ? "Unlike" : "Like"}
    >
      <Image
        src={liked ? "/Unlike.svg" : "/Like.svg"}
        alt={liked ? "Unlike" : "Like"}
        width={28}
        height={28}
      />
    </button>
  );
}
