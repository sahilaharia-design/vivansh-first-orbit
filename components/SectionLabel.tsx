"use client";

import { motion } from "framer-motion";

interface Props {
  children: string;
  light?: boolean;
}

export default function SectionLabel({ children, light }: Props) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className={`mb-4 text-xs font-semibold uppercase tracking-[0.2em] ${
        light ? "text-[#D9A441]/70" : "text-[#D9A441]"
      }`}
    >
      {children}
    </motion.p>
  );
}
