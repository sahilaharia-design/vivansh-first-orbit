"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/components/LanguageContext";
import { translations } from "@/data/translations";
import StarField from "@/components/StarField";

const blessingIcons = ["✦", "◇", "○", "✧"];

export default function BlessingsSection() {
  const { lang } = useLang();
  const t = translations[lang].blessings;
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#121B3A] py-24 md:py-36">
      <StarField count={50} />

      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-12">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#D9A441]/70"
          >
            {t.eyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-5 font-serif text-4xl font-bold text-[#FFF4DF] md:text-5xl"
          >
            {t.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-lg text-base italic leading-relaxed text-white/50 md:text-lg"
          >
            {t.intro}
          </motion.p>
        </div>

        {/* Blessing cards — 2-col on md+ */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {t.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative overflow-hidden rounded-xl border border-[#D9A441]/15 bg-gradient-to-br from-[#1a2444]/80 to-[#0e1630]/80 px-8 py-8 backdrop-blur-sm"
            >
              {/* Icon — large and atmospheric */}
              <span
                className="mb-5 block text-4xl text-[#D9A441]/35"
                aria-hidden="true"
              >
                {blessingIcons[i]}
              </span>

              <p className="text-base leading-loose text-white/70 md:text-lg">
                {card}
              </p>

              {/* Corner glow */}
              <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[#D9A441]/5 blur-2xl" />
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16 flex items-center gap-4" aria-hidden="true">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D9A441]/20" />
          <span className="text-[#D9A441]/30 text-sm">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D9A441]/20" />
        </div>
      </div>
    </section>
  );
}
