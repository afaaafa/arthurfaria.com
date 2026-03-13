"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Comment {
  id: string;
  username: string | null;
  content: string;
  created_at: string;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

// ---------------------------------------------------------------------------
// CommentSection — renders as a full overlay inside the reel
// ---------------------------------------------------------------------------

interface CommentSectionProps {
  reelId: string;
  open: boolean;
  onClose: () => void;
}

export function CommentSection({ reelId, open, onClose }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    fetch(`/api/comments/${reelId}`)
      .then((r) => r.json())
      .then((d) => setComments(d.comments ?? []));
  }, [open, reelId]);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [comments, open]);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    const res = await fetch(`/api/comments/${reelId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, content }),
    });
    if (res.ok) {
      const { comment } = await res.json();
      setComments((prev) => [...prev, comment]);
      setContent("");
    }
    setSubmitting(false);
  }

  return (
    <div
      className={`absolute inset-0 z-20 flex flex-col justify-end transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* panel */}
      <div className="relative flex flex-col bg-[#111] rounded-t-2xl max-h-[75%]">
        {/* drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-b border-[#222427]">
          <span className="text-white text-sm font-semibold">Comments</span>
          <button onClick={onClose} className="text-white/40 hover:text-white text-xl leading-none">×</button>
        </div>

        <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4 min-h-0">
          {comments.length === 0 && (
            <p className="text-white/30 text-xs text-center mt-4">No comments yet. Be the first!</p>
          )}
          {comments.map((c) => (
            <div key={c.id} className="flex flex-col gap-0.5">
              <div className="flex items-baseline gap-2">
                <span className="text-white text-xs font-semibold">{c.username || "Anonymous"}</span>
                <span className="text-white/30 text-[10px]">{timeAgo(c.created_at)}</span>
              </div>
              <p className="text-white/80 text-xs leading-relaxed">{c.content}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-[#222427] flex flex-col gap-2">
          <input
            type="text"
            placeholder="Username (optional)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-[#1a1a1a] text-white text-xs placeholder-white/30 rounded-lg px-3 py-2 outline-none border border-[#333] focus:border-white/30"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a comment…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 bg-[#1a1a1a] text-white text-xs placeholder-white/30 rounded-lg px-3 py-2 outline-none border border-[#333] focus:border-white/30"
            />
            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="text-white text-xs px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-colors"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CommentButton — just the icon + count, state lives in Reel
// ---------------------------------------------------------------------------

interface CommentButtonProps {
  count: number | null;
  onClick: () => void;
}

export function CommentButton({ count, onClick }: CommentButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 hover:scale-105"
      aria-label="Comments"
    >
      <Image src="/Comment.svg" alt="Comments" width={28} height={28} />
      {count !== null && (
        <span className="text-white text-xs">{count}</span>
      )}
    </button>
  );
}
