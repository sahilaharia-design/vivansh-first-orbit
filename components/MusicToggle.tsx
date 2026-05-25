"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  const getAudio = () => {
    if (!audioRef.current) {
      const a = new Audio("/audio/birthday-tune.mp3");
      a.loop = true;
      a.volume = 0;
      a.preload = "auto";
      audioRef.current = a;
    }
    return audioRef.current;
  };

  const stopFade = () => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  };

  const startPlay = () => {
    const a = getAudio();
    a.play().catch(() => {});
    stopFade();
    fadeRef.current = setInterval(() => {
      if (!audioRef.current) return;
      const v = Math.min(audioRef.current.volume + 0.015, 0.45);
      audioRef.current.volume = v;
      if (v >= 0.45) stopFade();
    }, 80);
    setPlaying(true);
  };

  const startPause = () => {
    stopFade();
    fadeRef.current = setInterval(() => {
      if (!audioRef.current) return;
      const v = Math.max(audioRef.current.volume - 0.02, 0);
      audioRef.current.volume = v;
      if (v <= 0) {
        audioRef.current.pause();
        stopFade();
      }
    }, 80);
    setPlaying(false);
  };

  // Auto-play when envelope is opened
  useEffect(() => {
    const onGiftOpened = () => {
      setVisible(true);
      startPlay();
    };
    window.addEventListener("vivansh-gift-opened", onGiftOpened);
    return () => window.removeEventListener("vivansh-gift-opened", onGiftOpened);
    // startPlay uses only refs + stable setState — no stale closure risk
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="music-toggle"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => (playing ? startPause() : startPlay())}
          aria-label={playing ? "Pause music" : "Play music"}
          title={playing ? "Pause music" : "Play music"}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#D9A441]/30 bg-[#0B1026]/80 backdrop-blur-sm text-[#D9A441] transition-all duration-300 hover:border-[#D9A441]/60 hover:bg-[#D9A441]/10 hover:shadow-[0_0_28px_rgba(217,164,65,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441]"
        >
          {playing ? (
            /* Pause bars */
            <svg width="13" height="14" viewBox="0 0 13 14" fill="currentColor" aria-hidden="true">
              <rect x="1" y="1" width="4" height="12" rx="1.5" />
              <rect x="8" y="1" width="4" height="12" rx="1.5" />
            </svg>
          ) : (
            /* Music note */
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
              <path d="M5 12.5V3.2L13 1v9.3" />
              <circle cx="3" cy="12.5" r="2.2" />
              <circle cx="11" cy="10.3" r="2.2" />
            </svg>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
