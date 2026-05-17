"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import heroVideo from "@/assets/8093593-hd_1920_1080_30fps.mp4";

const ROLES = ["Agentic AI Engineer", "Full Stack Engineer", "AI Systems Builder", "Agent Architect"];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const slotRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [introReady, setIntroReady] = useState(false);

  const revealStyle = (delayMs: number): CSSProperties => ({
    "--delay": `${delayMs}ms`,
  } as CSSProperties);

  useEffect(() => {
    const timer = setTimeout(() => setIntroReady(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="top"
      className={`hero relative min-h-screen flex flex-col justify-center pt-32 pb-24 z-10${
        introReady ? " is-intro-ready" : ""
      }`}
    >
      <div className="hero-media" aria-hidden>
        <video
          ref={videoRef}
          className="hero-video"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="hero-media__overlay" />
      </div>
      <div className="container-x">
        <div className="eyebrow mb-10 hero-reveal" style={revealStyle(150)}>
          software engineer · india
        </div>

        <h1
          className="hero-title hero-reveal font-display leading-[1.05] tracking-[-0.03em] whitespace-nowrap pb-4"
          style={{ fontSize: "clamp(48px, 9vw, 140px)", ...revealStyle(450) }}
        >
          <span className="overflow-hidden inline-block align-bottom pb-2">
            <span className="hero-name inline-block">Ragavaa</span>
          </span>
          <span className="inline-block" style={{ width: "0.35em" }} />
          <span className="overflow-hidden inline-block align-bottom pb-2">
            <span className="hero-name italic inline-block" style={{ color: "#D6F4ED" }}>M.</span>
          </span>
        </h1>

        <div
          className="hero-subtitle hero-reveal mt-8 flex items-center gap-3 flex-wrap"
          style={revealStyle(700)}
        >
          <span className="font-mono text-[15px] font-medium" style={{ color: "var(--text)" }}>
            I am a
          </span>
          <div
            className="px-3 py-1.5 rounded-md font-mono text-[13px] overflow-hidden relative"
            style={{
              background: "var(--gold-dim)",
              border: "1px solid var(--gold-border)",
              color: "var(--gold)",
              minWidth: "150px",
              height: "30px",
            }}
          >
            <span
              ref={slotRef}
              key={idx}
              className="block"
              style={{ animation: "slot-flip 0.5s ease" }}
            >
              {ROLES[idx]}
            </span>
          </div>
          {ROLES.filter((_, i) => i !== idx).slice(0, 2).map((r) => (
            <span key={r} className="font-mono text-[13px]" style={{ color: "var(--text-muted)" }}>
              {r}
            </span>
          ))}
        </div>

        <p
          className="hero-subtitle hero-reveal mt-8 max-w-[640px] font-mono text-[15px] leading-relaxed font-medium"
          style={{ color: "var(--text)", ...revealStyle(950) }}
        >
          Full-stack engineer building <span className="inline-code">agentic AI systems</span> that
          reason, plan, and execute. I focus on making agents reliable enough for production —
          bridging the gap between what models can do and what users actually need.
        </p>

        <div className="hero-ctas hero-reveal mt-10 flex flex-wrap items-center gap-4" style={revealStyle(1200)}>
          <a href="#projects" className="btn-primary" style={{ fontSize: "14px", fontWeight: 500 }}>
            View work
            <span>→</span>
          </a>
          <a href="#contact" className="btn-ghost" style={{ fontSize: "14px", fontWeight: 500 }}>Get in touch</a>
        </div>
      </div>

      <div
        className="hero-reveal absolute left-8 bottom-10 hidden md:flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-widest"
        style={{ color: "var(--text-dim)", ...revealStyle(1400) }}
      >
        <div className="w-px h-16" style={{ background: "linear-gradient(var(--gold), transparent)" }} />
        scroll
      </div>

      <style>{`
        @keyframes slot-flip {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
