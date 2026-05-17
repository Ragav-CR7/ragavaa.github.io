"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Cat = "all" | "ai" | "eng" | "infra";

const SKILLS: { name: string; cat: Exclude<Cat, "all">; core?: boolean }[] = [
  { name: "Agentic AI", cat: "ai", core: true },
  { name: "LLM Engineering", cat: "ai", core: true },
  { name: "RAG Systems", cat: "ai", core: true },
  { name: "LangChain", cat: "ai", core: true },
  { name: "LangGraph", cat: "ai", core: true },
  { name: "Agents", cat: "ai" },
  { name: "Prompt Eng.", cat: "ai" },
  { name: "Fine-tuning", cat: "ai" },
  { name: "Pinecone", cat: "ai" },
  { name: "Python", cat: "eng", core: true },
  { name: "TypeScript", cat: "eng", core: true },
  { name: "FastAPI", cat: "eng", core: true },
  { name: "Express.js", cat: "eng", core: true },
  { name: "React", cat: "eng", core: true },
  { name: "Node.js", cat: "eng" },
  { name: "Custom Integrations", cat: "eng" },
  { name: "PostgreSQL", cat: "infra", core: true },
  { name: "Docker", cat: "infra" },
  { name: "Podman", cat: "infra" },
  { name: "JMeter", cat: "infra" },
  { name: "K6", cat: "infra" },
  { name: "Dashboards", cat: "infra" },
];

const FILTERS: { id: Cat; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI / ML" },
  { id: "eng", label: "Engineering" },
  { id: "infra", label: "Infra" },
];

export default function Skills() {
  const [active, setActive] = useState<Cat>("all");
  const [highlight, setHighlight] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (active === "all" ? SKILLS : SKILLS.filter((s) => s.cat === active)),
    [active]
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      setActive("all");
      setHighlight(name);
      setTimeout(() => {
        const el = wrapRef.current?.querySelector<HTMLElement>(`[data-skill="${CSS.escape(name)}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
      setTimeout(() => setHighlight(null), 2400);
    };
    window.addEventListener("highlight-skill", handler);
    return () => window.removeEventListener("highlight-skill", handler);
  }, []);

  return (
    <section id="skills" className="section section-wipe">
      <div className="container-x">
        <div className="eyebrow mb-8">skills & stack</div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-xl">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className="font-mono text-[11px] uppercase tracking-widest py-3 rounded-md transition-all"
              style={{
                background: active === f.id ? "var(--gold-dim)" : "transparent",
                border: `1px solid ${active === f.id ? "var(--gold-border)" : "var(--border-color)"}`,
                color: active === f.id ? "var(--gold)" : "var(--text-muted)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div ref={wrapRef} className="flex flex-wrap gap-3 skills-grid">
          {filtered.map((s) => (
            <button
              key={s.name}
              data-skill={s.name}
              onClick={() => {
                const sel = `[data-stack*="${CSS.escape(s.name)}"]`;
                const targets = Array.from(
                  document.querySelectorAll<HTMLElement>(sel)
                ).filter((el) =>
                  (el.getAttribute("data-stack") || "").split("|").includes(s.name)
                );
                if (!targets.length) return;
                const target = targets[0];
                target.scrollIntoView({ behavior: "smooth", block: "center" });
                targets.forEach((t) => {
                  t.classList.add("is-flash");
                  setTimeout(() => t.classList.remove("is-flash"), 1800);
                });
              }}
              className={`skill-tag ${s.core ? "is-core" : ""} ${highlight === s.name ? "is-highlight" : ""}`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
