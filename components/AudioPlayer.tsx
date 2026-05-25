"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [active, setActive] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (audioRef.current) return; // already playing

      const audio = new Audio("/audio/music.mp3");
      audio.loop = true;
      audio.volume = 0;
      audioRef.current = audio;

      audio.play().catch(() => {
        // Silently ignore if blocked — music is enhancement only
      });

      // Fade in: 0 → 0.32 over ~2.7s
      let v = 0;
      fadeRef.current = setInterval(() => {
        v = Math.min(v + 0.01, 0.32);
        if (audioRef.current) audioRef.current.volume = v;
        if (v >= 0.32 && fadeRef.current) {
          clearInterval(fadeRef.current);
          fadeRef.current = null;
        }
      }, 85);

      setActive(true);
    };

    window.addEventListener("vivansh-gift-opened", handler);
    return () => {
      window.removeEventListener("vivansh-gift-opened", handler);
      if (fadeRef.current) clearInterval(fadeRef.current);
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    const next = !muted;
    audioRef.current.muted = next;
    setMuted(next);
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.button
          key="audio-toggle"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={toggleMute}
          aria-label={muted ? "Unmute music" : "Mute music"}
          title={muted ? "Unmute music" : "Mute music"}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#D9A441]/30 bg-[#0B1026]/80 backdrop-blur-sm transition-all duration-300 hover:border-[#D9A441]/60 hover:bg-[#D9A441]/10 hover:shadow-[0_0_24px_rgba(217,164,65,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441]"
        >
          {muted ? (
            /* Muted icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9A441" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            /* Playing icon — speaker with two waves */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9A441" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
