"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    const audio = new Audio("/audio/birthday-instrumental.mp3");
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "none"; // don't preload — only load on first play
    audioRef.current = audio;
    return audio;
  }, []);

  const fadeIn = useCallback((audio: HTMLAudioElement) => {
    if (fadeRef.current) clearInterval(fadeRef.current);
    audio.volume = 0;
    fadeRef.current = setInterval(() => {
      if (!audioRef.current) return;
      const next = Math.min(audioRef.current.volume + 0.02, 0.35);
      audioRef.current.volume = next;
      if (next >= 0.35 && fadeRef.current) {
        clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    }, 60);
  }, []);

  const fadeOut = useCallback(() => {
    if (fadeRef.current) clearInterval(fadeRef.current);
    fadeRef.current = setInterval(() => {
      if (!audioRef.current) return;
      const next = Math.max(audioRef.current.volume - 0.03, 0);
      audioRef.current.volume = next;
      if (next <= 0 && fadeRef.current) {
        clearInterval(fadeRef.current);
        fadeRef.current = null;
        audioRef.current?.pause();
      }
    }, 60);
  }, []);

  const toggle = useCallback(() => {
    const audio = ensureAudio();

    if (!loaded) setLoaded(true);

    if (playing) {
      fadeOut();
      setPlaying(false);
    } else {
      audio.play().catch(() => {
        // Silently handle browsers that still block after interaction
      });
      fadeIn(audio);
      setPlaying(true);
    }
  }, [playing, loaded, ensureAudio, fadeIn, fadeOut]);

  return (
    <AnimatePresence>
      <motion.button
        key="music-toggle"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={toggle}
        aria-label={playing ? "Pause birthday music" : "Play birthday music"}
        title={playing ? "Pause music" : "Play birthday music"}
        className="fixed bottom-6 right-6 z-50 flex h-12 items-center gap-2.5 rounded-full border border-[#D9A441]/30 bg-[#0B1026]/85 px-4 backdrop-blur-sm transition-all duration-300 hover:border-[#D9A441]/60 hover:bg-[#D9A441]/10 hover:shadow-[0_0_28px_rgba(217,164,65,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441]"
      >
        {/* Icon */}
        <span className="flex-shrink-0" aria-hidden="true">
          {playing ? (
            /* Pause bars */
            <svg width="14" height="16" viewBox="0 0 14 16" fill="#D9A441">
              <rect x="0" y="0" width="4" height="16" rx="1.5" />
              <rect x="8" y="0" width="4" height="16" rx="1.5" />
            </svg>
          ) : (
            /* Music note */
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="#D9A441" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13V3l8-2v10" />
              <circle cx="3" cy="13" r="2" />
              <circle cx="11" cy="11" r="2" />
            </svg>
          )}
        </span>

        {/* Label */}
        <span className="text-[11px] font-medium tracking-wide text-[#D9A441]">
          {playing ? "Pause" : "Play music"}
        </span>

        {/* Live indicator dot when playing */}
        {playing && (
          <span
            className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#D9A441]"
            style={{ animation: "pulse 1.8s ease-in-out infinite" }}
            aria-hidden="true"
          />
        )}
      </motion.button>
    </AnimatePresence>
  );
}
