"use client";

import { useEffect, useRef } from "react";

interface ReelVideoProps {
  src: string;
  className?: string;
}

export function ReelVideo({ src, className = "" }: ReelVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={`h-full w-full object-cover ${className}`}
      autoPlay
      loop
      muted
      playsInline
    />
  );
}
