"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/components/LanguageContext";
import { translations } from "@/data/translations";
import StarField from "@/components/StarField";
import OrbitLines from "@/components/OrbitLines";

export default function ClosingSection() {
  const { lang } = useLang();
  const t = translations[lang].closing;
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-[#0B1026] flex items-center py-28 md:py-40">
      <StarField count={120} />
      <OrbitLines />

      {/* Center radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-[#D9A441]/4 blur-[120px]" />
      </div>

      {/* Larger signature glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/4 rounded-full bg-[#D9A441]/6 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-12">
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A441]/70 md:text-sm"
        >
          {t.eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mb-14 font-serif text-5xl font-bold leading-tight text-[#FFF4DF] md:text-6xl lg:text-7xl"
        >
          {t.heading}
        </motion.h2>

        <div className="space-y-7">
          {t.lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`leading-relaxed ${
                i === 0
                  ? "font-serif text-xl italic text-[#D9A441]/80 md:text-2xl"
                  : i === 1
                  ? "text-sm text-white/35 italic md:text-base"
                  : i === t.lines.length - 1
                  ? "font-serif text-lg font-medium italic text-[#FFF4DF]/80 md:text-xl"
                  : "text-base leading-loose text-white/55 md:text-lg"
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-20 flex flex-col items-center"
        >
          <div className="mb-8 flex w-full max-w-xs items-center gap-4" aria-hidden="true">
            <div className="h-px flex-1 bg-[#D9A441]/20" />
            <span className="text-[#D9A441]/40">✦</span>
            <div className="h-px flex-1 bg-[#D9A441]/20" />
          </div>
          <p className="text-base italic text-white/40">{t.signature}</p>
          <p className="mt-2 font-serif text-3xl font-bold text-[#D9A441] md:text-4xl">{t.from}</p>

          {/* Moon glyph */}
          <div className="mt-10 text-5xl opacity-25" aria-hidden="true">🌙</div>
        </motion.div>
      </div>

      {/* Bottom stamp */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-white/20">
          Vivansh · 27 May 2026 · First Orbit Complete
        </p>
      </div>
    </section>
  );
}
