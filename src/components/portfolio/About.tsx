export default function About() {
  return (
    <section id="about" className="section section-wipe">
      <div className="container-x grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-16">
        <div>
          <div className="eyebrow mb-6">about</div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
            Building <span className="italic" style={{ color: "var(--gold)" }}> AI </span> solutions that <span className="italic" style={{ color: "var(--gold)" }}>actually work.</span>
          </h2>
        </div>
        <div className="space-y-6 text-[14px] leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          <p>
            I engineer production-grade agentic AI systems — autonomous frameworks that orchestrate
            tools, manage context, and execute multi-step workflows across heterogeneous systems.
            These aren't just UI-based agents; they're code-first systems designed to integrate
            seamlessly with any full-stack application through APIs, SDKs, and custom integrations.
          </p>
          <p>
            I work across the full agent runtime: context retrieval, reasoning orchestration, tool
            invocation, state management, execution tracing, and failure recovery. The{" "}
            <span className="inline-code">perception → planning → action</span> cycle, optimized
            for observability, latency, and operational reliability in production environments.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pt-6">
            {[
              { num: 10, suffix: "+", label: "Agent frameworks used" },
              { num: 50, suffix: "+", label: "Agentic workflows built" },
              { num: 2, suffix: "y", label: "Building production agents" },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <div className="font-display text-3xl sm:text-4xl md:text-5xl" style={{ color: "var(--gold)" }}>
                  <span className="count-up" data-count={s.num}>0</span>
                  {s.suffix}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-widest" style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
