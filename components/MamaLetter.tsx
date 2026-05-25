"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/components/LanguageContext";
import { translations } from "@/data/translations";

export default function MamaLetter() {
  const { lang } = useLang();
  const t = translations[lang].mamaLetter;
  const reduced = useReducedMotion();

  return (
    <section
      id="letter"
      className="relative overflow-hidden bg-[#0B1026] py-20 md:py-32"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#D9A441]/6 blur-[100px]" />

      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A441]/70 md:text-sm"
        >
          {t.eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-12 text-center font-serif text-4xl font-bold text-[#FFF4DF] md:text-5xl"
        >
          {t.heading}
        </motion.h2>

        {/* Letter card */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative rounded-3xl border border-[#D9A441]/35 bg-gradient-to-br from-[#FFF4DF] to-[#FAEED8] px-8 py-12 shadow-2xl md:px-16 md:py-16"
          style={{
            boxShadow: "0 32px 80px rgba(0,0,0,0.4), 0 0 60px rgba(217,164,65,0.08)",
          }}
        >
          {/* Gold corner accent */}
          <div className="absolute right-8 top-8 h-16 w-16 opacity-20" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" stroke="#D9A441" strokeWidth="1" />
              <circle cx="24" cy="24" r="12" stroke="#D9A441" strokeWidth="0.5" />
              <line x1="24" y1="4" x2="24" y2="44" stroke="#D9A441" strokeWidth="0.5" />
              <line x1="4" y1="24" x2="44" y2="24" stroke="#D9A441" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="space-y-6">
            {t.body.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className={`leading-relaxed text-[#8A5A32] ${
                  i === 0
                    ? "font-serif text-2xl font-bold text-[#6b4423] md:text-3xl"
                    : "text-base md:text-lg"
                }`}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 border-t border-[#D9A441]/25 pt-8"
          >
            <p className="text-base italic text-[#8A5A32]/80">{t.signature}</p>
            <p className="mt-2 font-serif text-3xl font-bold text-[#6b4423] md:text-4xl">{t.from}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
