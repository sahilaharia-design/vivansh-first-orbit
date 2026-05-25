"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/components/LanguageContext";
import { translations } from "@/data/translations";
import StarField from "@/components/StarField";

export default function WorldBornInto() {
  const { lang } = useLang();
  const t = translations[lang].worldBornInto;
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#121B3A] py-24 md:py-36">
      <StarField count={70} />

      {/* Center glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-[#9EB8D9]/6 blur-[80px]" />
      </div>

      {/* Orbit rings */}
      {[460, 640].map((r) => (
        <div
          key={r}
          className="pointer-events-none absolute rounded-full border border-[#D9A441]/8"
          style={{
            width: r, height: r,
            top: "50%", left: "50%",
            marginTop: -r / 2, marginLeft: -r / 2,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center md:px-12">
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
          initial={{ opacity: 0, y: reduced ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-14 font-serif text-4xl font-bold text-[#FFF4DF] md:text-5xl lg:text-6xl"
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
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`leading-relaxed ${
                i === t.lines.length - 1 || i === t.lines.length - 2
                  ? "font-serif text-xl italic text-[#D9A441]/80 md:text-2xl"
                  : "text-base text-white/60 md:text-lg"
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Decorative stars */}
        <div className="mt-16 flex items-center justify-center gap-3" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D9A441]/30 to-transparent"
            />
          ))}
          <span className="text-[#D9A441]/50 text-lg">✦</span>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D9A441]/30 to-transparent"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
