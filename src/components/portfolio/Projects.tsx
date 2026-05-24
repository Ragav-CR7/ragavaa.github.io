"use client";
import { useState } from "react";
import { gsap } from "gsap";

type ProjectKind = "work" | "personal";

type Project = {
  kind: ProjectKind;
  type: string;
  name: string;
  desc: string;
  stack: string[];
  github?: string;
  kaggle?: string;
};

const PROJECTS: Project[] = [
  {
    kind: "work",
    type: "QA AUTOMATION",
    name: "AIMFIRE - QA Copilot",
    desc: "AI-powered testing platform that automates the entire QA lifecycle by analyzing codebases, generating API documentation, and transforming screenshots, flows, and requirements into executable test assets across UI, API, Database, and Unit testing. Organizes work by projects, modules, and test suites with test data management and run orchestration.",
    stack: ["Agentic AI", "Custom tools","Express.js", "FastAPI", "Custom Integrations", "PostgreSQL"],
  },
  {
    kind: "work",
    type: "PERFORMANCE ENG",
    name: "Performance Engineering Assistant",
    desc: "Application built for performance engineers to create, manage, and edit performance test scripts. Streamlines script authoring workflows and reduces repetitive setup so engineers can focus on tuning and analysis.",
    stack: ["LangGraph", "Webload", "locust", "JMeter", "K6"],
  },
  {
    kind: "work",
    type: "COMMAND CENTRE",
    name: "AIMFIRE Command Centre",
    desc: "Centralized control hub consolidating all AIMFIRE projects, runs, and data into a single pane of glass. Provides unified visibility across teams with project hierarchies, execution history, run analytics, and live status monitoring.",
    stack: ["React", "TypeScript", "ExpressJS", "Dashboards"],
  },
  {
    kind: "personal",
    type: "COMPUTER VISION",
    name: "Lens for Blind",
    desc: "Image captioning system with voice assistance to help visually impaired users. Generates descriptive captions and detects emotions in images with people, built from scratch with custom model training.",
    stack: ["TensorFlow", "Computer Vision", "NLP", "Voice Synthesis"],
    github: "https://github.com/Ragav-CR7/Lens-for-blind-An-Image-Captioner-With-Voice-Assistance",
  },
  {
    kind: "personal",
    type: "MEDICAL AI",
    name: "Diabetic Retinopathy Detection",
    desc: "Kaggle competition solution for automated detection and classification of diabetic retinopathy from retinal images. Implemented DenseNet-201 architecture with transfer learning to identify disease severity levels.",
    stack: ["DenseNet-201", "TensorFlow", "Computer Vision", "Medical Imaging"],
    kaggle: "https://www.kaggle.com/code/mragav/notebookb8bc838a3c",
  },
  {
    kind: "personal",
    type: "RAG",
    name: "DocQuery AI",
    desc: "Chat with any document using semantic search and GPT-4 reranking. Handles 100k+ page corpora with sub-second retrieval for fast, accurate document question-answering.",
    stack: ["LangChain", "Pinecone", "FastAPI"],
    github: "https://github.com/",
  },
  {
    kind: "personal",
    type: "AGENTS",
    name: "AutoTask Agent",
    desc: "Multi-step LLM agent for automated code review workflows. Plans, executes, and reflects across PR diffs to provide intelligent, context-aware code analysis and suggestions.",
    stack: ["OpenAI API", "Python", "Agents"],
    github: "https://github.com/",
  },
  
];

export default function Projects() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [kind, setKind] = useState<ProjectKind>("work");

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.06;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.06;
    gsap.to(card, { x, y, duration: 0.4, ease: "power2.out" });
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
  };

  const filtered = PROJECTS.filter((p) => p.kind === kind);

  return (
    <section id="projects" className="section section-wipe">
      <div className="container-x">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="eyebrow">projects</div>
          <div className="flex gap-1 p-1 rounded-full" style={{ border: "1px solid var(--border-color)" }}>
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all"
                style={{
                  background: view === v ? "var(--gold-dim)" : "transparent",
                  color: view === v ? "var(--gold)" : "var(--text-muted)",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mb-10">
          {(["work", "personal"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className="px-5 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all"
              style={{
                background: kind === k ? "var(--gold-dim)" : "transparent",
                border: `1px solid ${kind === k ? "var(--gold-border)" : "var(--border-color)"}`,
                color: kind === k ? "var(--gold)" : "var(--text-muted)",
              }}
            >
              {k} projects
            </button>
          ))}
        </div>

        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 gap-6 projects-grid"
              : "flex flex-col gap-4 projects-grid"
          }
        >
          {filtered.map((p) => (
            <div
              key={p.name}
              className="card group project-item"
              data-stack={p.stack.join("|")}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
            >
              <div className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: "var(--gold)" }}>
                {p.type} · {p.kind}
              </div>
              <h3 className="font-syne font-bold text-lg mb-3">{p.name}</h3>
              <p className="font-mono text-[13px] leading-relaxed min-h-[80px]" style={{ color: "var(--text-muted)" }}>
                {p.desc}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {p.kind === "personal" &&
                    p.stack.map((s) => (
                      <span key={s} className="skill-tag">
                        {s}
                      </span>
                    ))}
                </div>
                {p.kind === "personal" && (p.github || p.kaggle) && (
                  <a
                    href={p.github || p.kaggle}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${p.name} on ${p.kaggle ? 'Kaggle' : 'GitHub'}`}
                    className="opacity-80 hover:opacity-100 transition-all w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ border: "1px solid var(--gold-border)", color: "var(--gold)" }}
                  >
                    {p.kaggle ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
                      </svg>
                    )}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
