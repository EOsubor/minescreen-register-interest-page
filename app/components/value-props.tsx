const props = [
  {
    stat: "Hours, Not Weeks",
    label: "Analysis Speed",
    description:
      "What takes analysts 2-3 weeks, MineScreen delivers in 2-3 hours. Automated extraction and cross-referencing at scale.",
  },
  {
    stat: "3+ Standards",
    label: "NI 43-101 / JORC / S-K 1300",
    description:
      "Coverage for NI 43-101, JORC, and S-K 1300 today, with SAMREC and Chile/Peru/Brazil standards next.",
  },
  {
    stat: "80+ Fields",
    label: "Metallurgical Data",
    description:
      "Deep extraction of metallurgical parameters, recovery rates, and process flow data from technical reports.",
  },
  {
    stat: "Institutional",
    label: "Grade Analysis",
    description:
      "Built for portfolio managers, fund analysts, and mining investment professionals who need accuracy at speed.",
  },
];

export function ValueProps() {
  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10 sm:mb-16 reveal">
          <p className="font-mono text-sm tracking-widest text-copper-light uppercase mb-3">
            Why MineScreen
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-off-white">
            Purpose-Built for Mining Investment
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {props.map((prop, i) => (
            <div
              key={prop.label}
              className="reveal group rounded-xl border border-off-white/5 bg-surface-mid/30 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-copper/20 hover:bg-surface-mid/50"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="text-xl sm:text-2xl font-bold text-copper-light">{prop.stat}</p>
              <p className="mt-1 text-xs font-mono tracking-wider text-off-white/40 uppercase">
                {prop.label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-off-white/60">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
