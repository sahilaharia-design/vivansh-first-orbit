"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Lang } from "@/data/translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("vivansh-lang") as Lang | null;
    if (stored && ["en", "hi", "gu"].includes(stored)) {
      setLangState(stored);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("vivansh-lang", l);
  };

  const bodyClass =
    lang === "hi" ? "font-devanagari" : lang === "gu" ? "font-gujarati" : "";

  useEffect(() => {
    document.body.className = bodyClass;
  }, [bodyClass]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
