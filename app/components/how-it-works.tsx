const steps = [
  {
    number: "01",
    title: "Ingest via API",
    description:
      "Send NI 43-101, JORC, or S-K 1300 reports through our API. We handle PDFs, scanned documents, and multi-section filings.",
  },
  {
    number: "02",
    title: "AI Analyzes",
    description:
      "Advanced AI extracts resource estimates, metallurgical data, economic parameters, and risk factors. Cross-references across sections for consistency.",
  },
  {
    number: "03",
    title: "Receive Intelligence",
    description:
      "Get structured, queryable data with flagged discrepancies, compliance gaps, and investment-relevant insights ready for your workflow.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6 border-t border-off-white/5">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10 sm:mb-16 reveal">
          <p className="font-mono text-sm tracking-widest text-copper-light uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-off-white">
            From Reports to Intelligence
          </h2>
        </div>

        <div className="space-y-12">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="reveal flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <span className="shrink-0 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-lg border border-copper/30 bg-copper/10 font-mono text-base sm:text-lg font-bold text-copper-light">
                {step.number}
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-off-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-off-white/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
