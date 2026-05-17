const ITEMS = [
  {
    period: "May 2025 — Present",
    role: "Software Engineer",
    company: "Agentic AI · QA Autonomous Copilot",
    desc: "Building an Agentic AI–powered QA autonomous tool. Designing multi-agent systems that plan, generate, and validate test cases end-to-end across enterprise web apps.",
    stack: ["Agentic AI", "LLM Engineering", "Agents", "RAG Systems", "FastAPI","Express JS"],
  },
  {
    period: "Jan 2025 — May 2025",
    role: "Trainee Software Engineer",
    company: "AI Foundations Program",
    desc: "Learned the foundations of Agentic AI, Retrieval-Augmented Generation, and applied LLM use cases. Built prototypes spanning prompt engineering, vector search, and agent loops.",
    stack: ["Agentic AI", "RAG Systems", "Prompt Eng.", "LangChain", "Python"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section section-wipe">
      <div className="container-x">
        <div className="eyebrow mb-10">experience</div>
        <div className="relative pl-8" style={{ borderLeft: "1px solid var(--border-color)" }}>
          {ITEMS.map((it, i) => (
            <div
              key={i}
              className="relative mb-14 stat-card group experience-item"
              data-stack={it.stack.join("|")}
            >
              <span
                className="absolute -left-[37px] top-1.5 w-[10px] h-[10px] rounded-full"
                style={{ border: "1px solid var(--gold)", background: "var(--bg)" }}
              />
              <div className="font-mono text-[12px] font-semibold uppercase tracking-widest" style={{ color: "var(--gold)" }}>
                {it.period}
              </div>
              <h3 className="font-syne font-bold text-xl mt-2">{it.role}</h3>
              <div className="font-mono text-[13px] mt-1" style={{ color: "var(--gold)" }}>
                {it.company}
              </div>
              <p className="mt-3 max-w-2xl font-mono text-[13px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {it.desc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {it.stack.map((s) => (
                  <span key={s} className="skill-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
