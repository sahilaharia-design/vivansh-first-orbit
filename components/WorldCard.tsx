"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/components/LanguageContext";

interface World {
  id: string;
  image: string;
  alt: string;
  en: { title: string; description: string; line: string };
  hi: { title: string; description: string; line: string };
  gu: { title: string; description: string; line: string };
}

export default function WorldCard({ world, index }: { world: World; index: number }) {
  const { lang } = useLang();
  const reduced = useReducedMotion();
  const t = world[lang];

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12 }}
      whileHover={reduced ? {} : { y: -6, transition: { duration: 0.3 } }}
      data-cursor
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-[#1a2444] to-[#0e1630] transition-shadow duration-300 hover:shadow-[0_0_48px_rgba(217,164,65,0.2)]"
    >
      {/* Gold top edge on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D9A441]/0 to-transparent transition-all duration-500 group-hover:via-[#D9A441]/60" />

      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#121B3A]">
        <Image
          src={world.image}
          alt={world.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-contain p-3 transition-transform duration-700 group-hover:scale-106"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1630]/70 to-transparent" />
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col p-7">
        <h3 className="mb-3 font-serif text-xl font-bold text-[#FFF4DF] md:text-2xl">{t.title}</h3>
        <p className="mb-5 flex-1 text-base leading-relaxed text-white/60">{t.description}</p>
        <p className="border-t border-[#D9A441]/20 pt-5 text-sm italic text-[#D9A441]/70">
          {t.line}
        </p>
      </div>
    </motion.div>
  );
}
