"use client";

import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-base/80 backdrop-blur-xl border-b border-off-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4">
        <a href="#" className="flex items-center gap-3">
          <svg viewBox="0 0 56 56" fill="none" className="h-7 w-7 sm:h-8 sm:w-8">
            <path
              d="M8 42 L18 22 L24 30 L32 14 L42 28 L48 42 Z"
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M8 42 L18 22 L24 30 L32 14 L42 28 L48 42 Z"
              fill="url(#navMtnGrad)"
              opacity="0.18"
            />
            <path
              d="M8 32 L16 30 L22 36 L28 24 L34 32 L40 28 L48 30"
              fill="none"
              stroke="#D4956B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="navMtnGrad" x1="28" y1="14" x2="28" y2="42">
                <stop offset="0%" stopColor="white" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-off-white">
            MineScreen
          </span>
        </a>
        <span className="rounded-full border border-copper/40 bg-copper/10 px-3 py-1 text-[11px] sm:text-xs font-semibold tracking-wider text-copper-light uppercase">
          PDAC 2026
        </span>
      </div>
    </nav>
  );
}
