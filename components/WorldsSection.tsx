"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/components/LanguageContext";
import { translations } from "@/data/translations";
import { worlds } from "@/data/worlds";
import WorldCard from "@/components/WorldCard";

export default function WorldsSection() {
  const { lang } = useLang();
  const t = translations[lang].worlds;
  const reduced = useReducedMotion();

  return (
    <section className="relative bg-[#0B1026] py-24 md:py-36">
      {/* Top fade from previous section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#121B3A] to-transparent" />

      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Heading */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A441]/70"
          >
            {t.eyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 font-serif text-4xl font-bold text-[#FFF4DF] md:text-5xl lg:text-6xl"
          >
            {t.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-xl text-base leading-relaxed text-white/50 md:text-lg"
          >
            {t.intro}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {worlds.map((world, i) => (
            <WorldCard key={world.id} world={world} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
