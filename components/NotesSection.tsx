"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/components/LanguageContext";
import { translations } from "@/data/translations";

function LetterCard({
  t,
  delay,
  offsetClass,
}: {
  t: { label: string; heading: string; body: readonly string[]; signature: string; from: string };
  delay: number;
  offsetClass?: string;
}) {
  const reduced = useReducedMotion();
  const { lang } = useLang();
  const isIndic = lang === "hi" || lang === "gu";

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-3xl border border-[#D9A441]/30 bg-gradient-to-br from-[#FFF4DF] to-[#F7E9CC] px-8 py-12 shadow-2xl md:px-10 md:py-14 ${offsetClass ?? ""}`}
      style={{
        boxShadow: "0 24px 64px rgba(0,0,0,0.35), 0 0 40px rgba(217,164,65,0.07)",
      }}
    >
      {/* Corner orbit accent */}
      <div className="absolute right-7 top-7 h-14 w-14 opacity-15" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="#D9A441" strokeWidth="1" />
          <circle cx="24" cy="24" r="11" stroke="#D9A441" strokeWidth="0.6" />
          <circle cx="24" cy="4" r="2" fill="#D9A441" />
        </svg>
      </div>

      {/* Label pill */}
      <span className="inline-block rounded-full border border-[#D9A441]/50 bg-[#D9A441]/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A5A32]">
        {t.label}
      </span>

      {/* Body paragraphs */}
      <div className={`mt-7 space-y-5 ${isIndic ? "font-devanagari" : ""}`}>
        {t.body.map((para, i) => (
          <p
            key={i}
            className={`text-[#6b4423] ${
              i === 0
                ? "font-serif text-xl font-bold md:text-2xl"
                : isIndic
                ? "text-base leading-[2.1] text-[#8A5A32] md:text-lg"
                : "text-base leading-relaxed text-[#8A5A32] md:text-[17px]"
            }`}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Signature */}
      <div className="mt-10 border-t border-[#D9A441]/25 pt-7">
        <p className={`text-sm italic text-[#8A5A32]/70 ${isIndic ? "font-devanagari" : ""}`}>
          {t.signature}
        </p>
        <p className={`mt-1 font-serif text-2xl font-bold text-[#6b4423] md:text-3xl`}>
          {t.from}
        </p>
      </div>
    </motion.div>
  );
}

export default function NotesSection() {
  const { lang } = useLang();
  const t = translations[lang].notes;
  const reduced = useReducedMotion();

  return (
    <section
      id="letter"
      className="relative overflow-hidden bg-[#0B1026] py-20 md:py-32"
    >
      {/* Warm ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#D9A441]/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#F3B68D]/4 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A441]/70 md:text-sm"
          >
            {t.eyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl font-bold text-[#FFF4DF] md:text-5xl"
          >
            {t.heading}
          </motion.h2>
        </div>

        {/* Two-column on md+, stacked on mobile */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          {/* Sahil Mama — slightly higher on desktop */}
          <LetterCard
            t={t.sahil}
            delay={0.15}
            offsetClass="md:-translate-y-4"
          />

          {/* Sakshi Mami — slightly lower on desktop */}
          <LetterCard
            t={t.sakshi}
            delay={0.3}
            offsetClass="md:translate-y-4"
          />
        </div>

        {/* Connecting star divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-6"
          aria-hidden="true"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#D9A441]/25" />
          <span className="text-lg text-[#D9A441]/30">✦</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#D9A441]/25" />
        </motion.div>
      </div>
    </section>
  );
}
