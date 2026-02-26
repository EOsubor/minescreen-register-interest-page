export function Hero() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden topo-lines">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-base via-surface-base/95 to-surface-base" />

      {/* Copper glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-copper/5 blur-[120px] animate-glow-pulse" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 text-center pt-20 sm:pt-24">
        <div className="animate-fade-in">
          <p className="mb-6 font-mono text-sm tracking-widest text-copper-light uppercase">
            AI-Powered Mining Investment Platform
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-off-white">
            Mining Due Diligence,{" "}
            <span className="text-copper-light">Reimagined</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-off-white/60 leading-relaxed">
            Reduce technical report analysis from weeks to hours. Institutional-grade
            intelligence for NI 43-101, JORC, and S-K 1300 reports.
          </p>
        </div>

        <div className="mt-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="inline-flex w-full sm:w-auto flex-col sm:flex-row items-center gap-2 sm:gap-3 rounded-xl border border-copper/30 bg-copper/5 px-5 sm:px-6 py-3 text-center sm:text-left">
            <div className="h-2 w-2 rounded-full bg-copper-light animate-glow-pulse" />
            <span className="text-sm sm:text-base font-medium text-off-white/80">
              PDAC 2026
            </span>
            <span className="hidden sm:inline text-off-white/30">|</span>
            <span className="text-xs sm:text-base text-off-white/60">
              March 1-4, 2026 &middot; Toronto, Canada
            </span>
          </div>
        </div>

        <div className="mt-10 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <a
            href="#register"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-copper px-8 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-copper/25 transition-all duration-200 hover:bg-copper-light hover:shadow-copper/40 focus:outline-none focus:ring-2 focus:ring-copper/50 focus:ring-offset-2 focus:ring-offset-surface-base"
          >
            Register Your Interest
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
