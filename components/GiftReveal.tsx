"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StarField from "@/components/StarField";
import { useLang } from "@/components/LanguageContext";
import { translations } from "@/data/translations";

// Deterministic confetti — no Math.random at render time
const CONFETTI = [
  { dx: -150, dy: -230, r: 720,  color: "#D9A441", w: 10, h: 6,  d: 0.00 },
  { dx:  150, dy: -200, r: -540, color: "#FFF4DF", w:  8, h: 5,  d: 0.05 },
  { dx:  -80, dy: -290, r: 360,  color: "#F3B68D", w:  9, h: 5,  d: 0.10 },
  { dx:   80, dy: -270, r: -720, color: "#FFD700", w:  7, h: 6,  d: 0.12 },
  { dx: -200, dy: -160, r: 540,  color: "#D9A441", w:  6, h: 8,  d: 0.07 },
  { dx:  200, dy: -180, r: -360, color: "#FFF4DF", w: 10, h: 5,  d: 0.08 },
  { dx: -110, dy: -330, r: 270,  color: "#FFD700", w:  8, h: 6,  d: 0.06 },
  { dx:  110, dy: -310, r: -270, color: "#F3B68D", w:  7, h: 7,  d: 0.11 },
  { dx: -250, dy: -110, r: 180,  color: "#D9A441", w:  6, h: 5,  d: 0.03 },
  { dx:  250, dy: -130, r: -180, color: "#FFF4DF", w:  8, h: 6,  d: 0.09 },
  { dx:    0, dy: -370, r: 720,  color: "#FFD700", w: 11, h: 5,  d: 0.02 },
  { dx: -180, dy: -240, r: -540, color: "#F3B68D", w:  7, h: 8,  d: 0.14 },
  { dx:  180, dy: -220, r: 450,  color: "#D9A441", w:  9, h: 5,  d: 0.16 },
  { dx:  -50, dy: -350, r: -630, color: "#FFF4DF", w:  6, h: 7,  d: 0.18 },
  { dx:   50, dy: -340, r: 540,  color: "#FFD700", w:  8, h: 5,  d: 0.20 },
  { dx: -300, dy:  -80, r: -270, color: "#F3B68D", w:  5, h: 6,  d: 0.04 },
];

export default function GiftReveal() {
  const { lang } = useLang();
  const label = translations[lang].hero.label;
  const [shouldRender, setShouldRender] = useState(false);
  const [opened, setOpened] = useState(false);
  const [burst, setBurst] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("vivansh-opened")) {
      setShouldRender(true);
    }
  }, []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    sessionStorage.setItem("vivansh-opened", "1");
    // Fire event so MusicToggle auto-starts
    window.dispatchEvent(new CustomEvent("vivansh-gift-opened"));
    setTimeout(() => setBurst(true), 450);
    setTimeout(() => setRevealed(true), 800);
    setTimeout(() => setShouldRender(false), 3000);
  };

  if (!shouldRender) return null;

  return (
    <motion.div
      animate={opened ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 1.0, delay: opened ? 1.8 : 0, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9990] flex flex-col items-center justify-center overflow-hidden bg-[#0B1026]"
    >
      <StarField count={90} />

      {/* Ambient centre glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(217,164,65,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── Three concentric burst rings ── */}
      {burst &&
        [
          { scale: 7,  opacityPeak: 0.75, duration: 1.3, delay: 0.00 },
          { scale: 11, opacityPeak: 0.55, duration: 1.6, delay: 0.18 },
          { scale: 15, opacityPeak: 0.35, duration: 1.9, delay: 0.36 },
        ].map((ring, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: ring.scale, opacity: [0, ring.opacityPeak, 0] }}
            transition={{ duration: ring.duration, ease: "easeOut", delay: ring.delay }}
            className="pointer-events-none absolute z-10 h-44 w-44 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(243,182,141,0.85) 0%, rgba(217,164,65,0.55) 35%, transparent 70%)",
            }}
          />
        ))}

      {/* ── Confetti particles ── */}
      {burst &&
        CONFETTI.map((p, i) => (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={{ x: p.dx, y: p.dy, opacity: 0, rotate: p.r, scale: 0.3 }}
            transition={{ duration: 1.5, ease: [0.22, 0.6, 0.36, 1], delay: p.d }}
            className="pointer-events-none absolute z-20"
            style={{ width: p.w, height: p.h, borderRadius: 2, background: p.color }}
          />
        ))}

      {/* ── Happy Birthday reveal text ── */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.65, y: 16 }}
            animate={{ opacity: 1, scale: 1.04, y: -6 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute z-30 flex flex-col items-center text-center"
          >
            <motion.span
              initial={{ scale: 0.5 }}
              animate={{ scale: [0.5, 1.3, 1.1] }}
              transition={{ duration: 0.6, times: [0, 0.6, 1] }}
              className="text-6xl sm:text-7xl"
              aria-hidden="true"
            >
              🎉
            </motion.span>
            <p
              className="mt-4 font-serif text-4xl font-bold text-[#D9A441] sm:text-5xl"
              style={{
                textShadow:
                  "0 0 40px rgba(217,164,65,0.9), 0 0 80px rgba(217,164,65,0.5)",
              }}
            >
              Happy Birthday
            </p>
            <p className="mt-1 font-serif text-3xl font-bold text-[#FFF4DF] sm:text-4xl">
              Vivansh!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Content column ── fades out when revealed */}
      <div
        className="relative z-20 flex flex-col items-center px-6 text-center"
        style={{
          opacity: revealed ? 0 : 1,
          transition: "opacity 0.5s ease",
          pointerEvents: revealed ? "none" : "auto",
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#D9A441]/60"
        >
          For Vivansh · 27 May 2026
        </motion.p>

        {/* ── Envelope ── */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-10 mb-10"
        >
          {/* Idle float / open lift */}
          <motion.div
            animate={
              opened
                ? { y: -22, scale: 1.06 }
                : { y: [0, -12, 0] }
            }
            transition={
              opened
                ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <div
              className="relative pt-[88px] sm:pt-[108px]"
              style={{ perspective: "900px" }}
            >
              {/* Flap */}
              <motion.div
                animate={opened ? { rotateX: -172 } : { rotateX: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transformOrigin: "bottom center",
                  transformStyle: "preserve-3d",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              >
                {/* Mobile flap */}
                <svg
                  width="100%"
                  height="88"
                  viewBox="0 0 300 88"
                  preserveAspectRatio="none"
                  className="sm:hidden"
                >
                  <polygon
                    points="0,0 300,0 150,88"
                    fill="#131d38"
                    stroke="#D9A441"
                    strokeWidth="0.9"
                    strokeOpacity="0.45"
                  />
                </svg>
                {/* Desktop flap */}
                <svg
                  width="100%"
                  height="108"
                  viewBox="0 0 380 108"
                  preserveAspectRatio="none"
                  className="hidden sm:block"
                >
                  <polygon
                    points="0,0 380,0 190,108"
                    fill="#131d38"
                    stroke="#D9A441"
                    strokeWidth="0.9"
                    strokeOpacity="0.45"
                  />
                </svg>
              </motion.div>

              {/* Envelope body */}
              <div className="relative h-[170px] w-[300px] overflow-hidden rounded-b-2xl border border-[#D9A441]/30 bg-gradient-to-b from-[#131d38] to-[#0c1428] sm:h-[210px] sm:w-[380px]">
                {/* Inner warm glow when opened */}
                {opened && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 100%, rgba(243,182,141,0.45) 0%, rgba(217,164,65,0.2) 50%, transparent 80%)",
                    }}
                  />
                )}

                {/* V-fold crease lines */}
                <div className="absolute inset-0 opacity-[0.18]" aria-hidden="true">
                  <svg width="100%" height="100%" viewBox="0 0 300 170" preserveAspectRatio="none">
                    <line x1="0"   y1="0" x2="150" y2="85" stroke="#D9A441" strokeWidth="1" />
                    <line x1="300" y1="0" x2="150" y2="85" stroke="#D9A441" strokeWidth="1" />
                  </svg>
                </div>

                {/* Moon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    animate={
                      opened
                        ? { opacity: 1, scale: 1.5, y: -10 }
                        : { opacity: 0.18, scale: 0.8 }
                    }
                    transition={{ duration: 0.5 }}
                    className="text-5xl sm:text-6xl"
                    aria-hidden="true"
                  >
                    🌙
                  </motion.span>
                </div>

                {/* Gold bottom edge */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D9A441]/35 to-transparent" />
              </div>
            </div>

            {/* Sparkle stars around envelope */}
            {[
              { top: "18%",  left: "-9%",  delay: 0.0 },
              { top:  "5%",  left: "94%",  delay: 0.6 },
              { top: "60%",  left: "-11%", delay: 1.1 },
              { top: "80%",  left: "97%",  delay: 0.2 },
              { top: "106%", left: "14%",  delay: 0.8 },
              { top: "108%", left: "76%",  delay: 0.4 },
            ].map((pos, i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute text-sm text-[#D9A441]/50"
                style={{ top: pos.top, left: pos.left }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.5, 0.8] }}
                transition={{ duration: 2.4 + i * 0.4, repeat: Infinity, delay: pos.delay }}
                aria-hidden="true"
              >
                ✦
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 font-serif text-3xl font-bold leading-snug text-[#FFF4DF] sm:text-4xl md:text-5xl"
        >
          Your first gift
          <br />
          <span className="text-[#D9A441]">is waiting.</span>
        </motion.h1>

        {/* CTA with pulsing glow ring */}
        <div className="relative">
          {!opened && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 0px 0px rgba(217,164,65,0)",
                  "0 0 32px 14px rgba(217,164,65,0.5)",
                  "0 0 0px 0px rgba(217,164,65,0)",
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 1.6, ease: "easeInOut" }}
            />
          )}
          <motion.button
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            onClick={handleOpen}
            disabled={opened}
            className="group relative inline-flex min-h-[54px] items-center gap-3 rounded-full border border-[#D9A441]/45 bg-[#D9A441]/10 px-10 py-4 text-base font-medium text-[#D9A441] transition-all duration-300 hover:bg-[#D9A441]/25 hover:shadow-[0_0_50px_rgba(217,164,65,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>{opened ? "Opening…" : "Open your gift"}</span>
            {!opened && (
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            )}
          </motion.button>
        </div>

        {/* Sub-label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-5 text-[11px] italic text-white/25"
        >
          {label}
        </motion.p>
      </div>

      {/* Background orbit rings */}
      {[320, 500].map((r, i) => (
        <div
          key={r}
          className="pointer-events-none absolute rounded-full border border-[#D9A441]/8"
          style={{
            width: r,
            height: r,
            top: "50%",
            left: "50%",
            marginTop: -r / 2,
            marginLeft: -r / 2,
            animation: `orbitSpin ${24 + i * 14}s linear infinite`,
            animationDirection: i % 2 === 0 ? "normal" : "reverse",
          }}
          aria-hidden="true"
        />
      ))}
    </motion.div>
  );
}
