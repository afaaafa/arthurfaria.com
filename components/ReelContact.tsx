"use client";

import { useState } from "react";
import { useReelsOptional } from "./ReelsContext";

interface ReelContactProps {
  reelId?: string;
}

type Status = "idle" | "loading" | "success" | "error";

const CONTACT_FALLBACK = { link: "https://linkedin.com/in/arfaria", label: "LinkedIn" };

export function ReelContact({ reelId }: ReelContactProps) {
  const reels = useReelsOptional();
  const isActive =
    reels == null || reelId == null ? true : reels.activeReelId === reelId;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-8 py-12 text-white">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-white/30">
          Contact
        </p>
        <h2 className="text-3xl font-black tracking-tight">Send me a Reels</h2>
        <p className="text-sm text-white/50">
          Or maybe just say hi? Fill the form below or reach me.
        </p>
      </div>

      {status === "success" ? (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-2xl">✓</span>
          <p className="text-sm font-semibold text-white/80">Message sent!</p>
          <p className="text-xs text-white/40">
            I&apos;ll get back to you soon.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-2 text-xs text-white/40 underline underline-offset-2 hover:text-white/70 transition-colors"
          >
            Send another
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-sm flex-col gap-3"
        >
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-white/40 focus:bg-white/10"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-white/40 focus:bg-white/10"
          />
          <textarea
            placeholder="Message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-none border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-white/40 focus:bg-white/10"
          />

          {status === "error" && (
            <p className="text-xs text-red-400">
              This is currently not working, but you can reach me at <a href={CONTACT_FALLBACK.link} className="underline underline-offset-2 hover:text-red-300 transition-colors" target="_blank" rel="noopener noreferrer">
                {CONTACT_FALLBACK.label}
              </a>
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending..." : "Send message"}
          </button>
        </form>
      )}
    </div>
  );
}
