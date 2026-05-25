"use client";

import { useEffect, useRef } from "react";

export default function StarField({ count = 80 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 2 + 0.5;
      star.style.cssText = `
        position:absolute;
        border-radius:50%;
        background:white;
        width:${size}px;
        height:${size}px;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        opacity:${Math.random() * 0.6 + 0.1};
        animation:twinkle ${2 + Math.random() * 4}s ease-in-out infinite;
        animation-delay:${Math.random() * 4}s;
      `;
      el.appendChild(star);
    }
  }, [count]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
