"use client";

import { useLang } from "@/components/LanguageContext";
import type { Lang } from "@/data/translations";

const options: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हिन्दी" },
  { code: "gu", label: "ગુજરાતી" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-1 py-1 backdrop-blur-sm"
    >
      {options.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`min-h-[36px] rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] ${
            lang === code
              ? "bg-[#D9A441] text-[#0B1026] shadow-sm"
              : "text-white/70 hover:text-white"
          }`}
          style={{
            fontFamily:
              code === "hi"
                ? "'Noto Sans Devanagari', sans-serif"
                : code === "gu"
                ? "'Noto Sans Gujarati', sans-serif"
                : "inherit",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
