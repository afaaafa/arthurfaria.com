"use client";

import { useEffect, useRef, useState } from "react";

interface ReelVideoProps {
  src: string;
  className?: string;
}

export function ReelVideo({ src, className = "" }: ReelVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        src={src}
        className={`h-full w-full object-cover ${className}`}
        autoPlay
        loop
        muted
        playsInline
      />
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 flex items-center justify-center rounded-full bg-black/50 p-2 text-white"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        <img
          src={muted ? "/audio-muted.svg" : "/audio-playing.svg"}
          alt={muted ? "Audio is muted" : "Audio is playing"}
          width={20}
          height={20}
          className="invert"
        />
      </button>
    </div>
  );
}
