export function Footer() {
  return (
    <footer className="border-t border-off-white/5 py-12 px-6">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 56 56" fill="none" className="h-6 w-6">
            <path
              d="M8 42 L18 22 L24 30 L32 14 L42 28 L48 42 Z"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M8 32 L16 30 L22 36 L28 24 L34 32 L40 28 L48 30"
              fill="none"
              stroke="#D4956B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm text-off-white/40">
            &copy; {new Date().getFullYear()} MineScreen. All rights reserved.
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-off-white/40">
          <a
            href="mailto:info@minescreen.ai"
            className="hover:text-copper-light transition-colors"
          >
            info@minescreen.ai
          </a>
          <span className="hidden sm:inline text-off-white/10">|</span>
          <span>PDAC 2026 &middot; March 1-4, Toronto</span>
        </div>
      </div>
    </footer>
  );
}
