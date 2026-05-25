"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StarField from "@/components/StarField";

export default function GiftReveal() {
  const [shouldRender, setShouldRender] = useState(false);
  const [opened, setOpened] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("vivansh-opened")) {
      setShouldRender(true);
    }
  }, []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    sessionStorage.setItem("vivansh-opened", "1");
    setTimeout(() => setBurst(true), 550);
    setTimeout(() => setShouldRender(false), 2000);
  };

  if (!shouldRender) return null;

  return (
    <motion.div
      animate={opened ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: opened ? 1.1 : 0, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9990] flex flex-col items-center justify-center overflow-hidden bg-[#0B1026]"
    >
      <StarField count={90} />

      {/* Radial ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(217,164,65,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Light burst on open */}
      {burst && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 7, opacity: [0, 0.55, 0] }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="pointer-events-none absolute z-10 h-48 w-48 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(243,182,141,0.7) 0%, rgba(217,164,65,0.4) 40%, transparent 70%)",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="mb-5 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#D9A441]/60"
        >
          For Vivansh · 27 May 2026
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 font-serif text-4xl font-bold leading-tight text-[#FFF4DF] sm:text-5xl md:text-6xl"
        >
          Your first gift
          <br />
          <span className="text-[#D9A441]">is waiting.</span>
        </motion.h1>

        {/* Envelope */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-14"
        >
          {/* Float wrapper */}
          <motion.div
            animate={opened ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Envelope */}
            <div style={{ perspective: "800px" }} className="relative">
              {/* Body */}
              <div className="relative h-[160px] w-[260px] overflow-hidden rounded-b-2xl border border-[#D9A441]/30 bg-gradient-to-b from-[#16203a] to-[#0c1428] sm:h-[190px] sm:w-[310px]">
                {/* Inner glow when open */}
                {opened && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 80%, rgba(243,182,141,0.25) 0%, rgba(217,164,65,0.1) 50%, transparent 80%)",
                    }}
                  />
                )}

                {/* V-fold lines */}
                <div className="absolute inset-0 opacity-15" aria-hidden="true">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 260 160"
                    preserveAspectRatio="none"
                  >
                    <line x1="0" y1="0" x2="130" y2="80" stroke="#D9A441" strokeWidth="1" />
                    <line x1="260" y1="0" x2="130" y2="80" stroke="#D9A441" strokeWidth="1" />
                  </svg>
                </div>

                {/* Moon inside */}
                <div className="absolute inset-0 flex items-center justify-center pt-6">
                  <motion.span
                    initial={{ opacity: 0.15, scale: 0.8 }}
                    animate={opened ? { opacity: 1, scale: 1.2 } : { opacity: 0.15, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl sm:text-6xl"
                    aria-hidden="true"
                  >
                    🌙
                  </motion.span>
                </div>
              </div>

              {/* Flap — animates open on click */}
              <motion.div
                animate={opened ? { rotateX: -165 } : { rotateX: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "bottom center", transformStyle: "preserve-3d" }}
                className="absolute -top-[79px] left-0 w-[260px] sm:-top-[95px] sm:w-[310px]"
              >
                <svg
                  width="100%"
                  height="80"
                  viewBox="0 0 260 80"
                  preserveAspectRatio="none"
                  className="sm:hidden"
                >
                  <polygon
                    points="0,0 260,0 130,80"
                    fill="#16203a"
                    stroke="#D9A441"
                    strokeWidth="0.8"
                    strokeOpacity="0.4"
                  />
                </svg>
                <svg
                  width="100%"
                  height="96"
                  viewBox="0 0 310 96"
                  preserveAspectRatio="none"
                  className="hidden sm:block"
                >
                  <polygon
                    points="0,0 310,0 155,96"
                    fill="#16203a"
                    stroke="#D9A441"
                    strokeWidth="0.8"
                    strokeOpacity="0.4"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Sparkle stars */}
            {[
              { top: "-24%", left: "5%", delay: 0 },
              { top: "-10%", left: "90%", delay: 0.5 },
              { top: "50%", left: "-12%", delay: 1.0 },
              { top: "80%", left: "95%", delay: 0.3 },
              { top: "110%", left: "20%", delay: 0.8 },
              { top: "110%", left: "70%", delay: 0.2 },
            ].map((pos, i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute text-[#D9A441]/50 text-sm"
                style={{ top: pos.top, left: pos.left }}
                animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.3, 0.8] }}
                transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: pos.delay }}
                aria-hidden="true"
              >
                ✦
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          onClick={handleOpen}
          disabled={opened}
          className="group inline-flex min-h-[54px] items-center gap-3 rounded-full border border-[#D9A441]/40 bg-[#D9A441]/10 px-10 py-4 text-base font-medium text-[#D9A441] transition-all duration-300 hover:bg-[#D9A441]/25 hover:shadow-[0_0_48px_rgba(217,164,65,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{opened ? "Opening…" : "Open your gift"}</span>
          {!opened && (
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          )}
        </motion.button>

        {/* Sub-label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="mt-6 text-[11px] italic text-white/25"
        >
          A first-birthday gift from your mama.
        </motion.p>
      </div>

      {/* Bottom orbit ring hints */}
      {[320, 480].map((r, i) => (
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
            animation: `orbitSpin ${22 + i * 12}s linear infinite`,
            animationDirection: i % 2 === 0 ? "normal" : "reverse",
          }}
          aria-hidden="true"
        />
      ))}
    </motion.div>
  );
}
