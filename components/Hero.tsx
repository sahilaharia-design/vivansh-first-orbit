"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/components/LanguageContext";
import { translations } from "@/data/translations";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import StarField from "@/components/StarField";
import OrbitLines from "@/components/OrbitLines";

export default function Hero() {
  const { lang } = useLang();
  const t = translations[lang].hero;
  const reduced = useReducedMotion();

  const easing = [0.22, 1, 0.36, 1] as [number, number, number, number];
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: easing },
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#0B1026] flex flex-col"
    >
      <StarField count={100} />
      <OrbitLines />

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-8">
        <motion.p
          {...fadeUp(0.1)}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D9A441]/60 md:text-sm"
        >
          27 · 05 · 2026
        </motion.p>
        <LanguageSwitcher />
      </div>

      {/* Main content — image FIRST on mobile (flex-col-reverse), side-by-side on desktop */}
      <div className="relative z-10 flex flex-1 flex-col-reverse items-center justify-center gap-8 px-6 pb-10 pt-6 md:flex-row md:items-center md:gap-16 md:px-16 md:pb-0 md:pt-0 lg:gap-24 lg:px-24">
        {/* Text block */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left md:max-w-[520px]">
          <motion.p
            {...fadeUp(0.2)}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A441]/70 md:text-sm"
          >
            {t.eyebrow}
          </motion.p>

          <motion.h1
            {...fadeUp(0.35)}
            className="mb-5 font-serif text-5xl font-bold leading-[1.08] text-[#FFF4DF] sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {t.title}
          </motion.h1>

          <motion.p
            {...fadeUp(0.5)}
            className="mb-6 text-lg font-light italic text-[#D9A441] sm:text-xl md:text-2xl"
          >
            {t.subtitle}
          </motion.p>

          <motion.p
            {...fadeUp(0.65)}
            className="mb-10 max-w-sm text-base leading-relaxed text-white/60 md:max-w-md md:text-lg"
          >
            {t.body}
          </motion.p>

          <motion.a
            {...fadeUp(0.8)}
            href="#letter"
            data-cursor
            className="group relative inline-flex min-h-[52px] items-center gap-3 rounded-full border border-[#D9A441]/40 bg-[#D9A441]/10 px-10 py-4 text-base font-medium text-[#D9A441] transition-all duration-300 hover:bg-[#D9A441]/20 hover:shadow-[0_0_40px_rgba(217,164,65,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441]"
          >
            <span>{t.cta}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.a>

          <motion.p
            {...fadeUp(0.95)}
            className="mt-5 text-xs text-white/30 italic"
          >
            {t.label}
          </motion.p>
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: reduced ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-shrink-0"
        >
          <motion.div
            animate={reduced ? {} : { y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Glow behind image — larger and warmer */}
            <div className="absolute inset-0 scale-95 rounded-full bg-[#D9A441]/20 blur-[80px]" />
            <div className="absolute inset-0 scale-75 rounded-full bg-[#F3B68D]/10 blur-[60px]" />
            <Image
              src="/images/hero-first-orbit.png"
              alt="Vivansh laughing on a crescent moon with the sun, planets, and symbols of possibility floating around him."
              width={1672}
              height={941}
              priority
              className="relative z-10 w-[340px] rounded-2xl object-contain drop-shadow-2xl sm:w-[440px] md:w-[540px] lg:w-[660px]"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1026] to-transparent" />

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-px bg-gradient-to-b from-transparent to-[#D9A441]/40" />
          <div
            className="h-1 w-1 rounded-full bg-[#D9A441]/50"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
