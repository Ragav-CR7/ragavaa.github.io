"use client";
import { useState, useRef, useEffect } from "react";
import contactVideo from "@/assets/14238540_3840_2160_24fps.mp4";

const LINKS = [
  { label: "email", value: "ragavaapersonal@gmail.com", href: "mailto:ragavaapersonal@gmail.com", copy: true, copyValue: "ragavaapersonal@gmail.com" },
  { label: "linkedin", value: "/in/ragavaa-m", href: "https://www.linkedin.com/in/ragavaa-m/", target: "_blank" as const, copy: true, copyValue: "https://www.linkedin.com/in/ragavaa-m/" },
  { label: "github", value: "@ragavaamani", href: "https://github.com", target: "_blank" as const },
  { label: "x / twitter", value: "@ragavaabuilds", href: "https://x.com", target: "_blank" as const },
];

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section id="contact" className="section section-wipe contact-section relative">
      <div className="hero-media" aria-hidden>
        <video
          ref={videoRef}
          className="hero-video"
          src={contactVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="hero-media__overlay" />
      </div>
      <div className="container-x relative z-10">
        <div className="max-w-2xl">
          <div className="eyebrow mb-6">contact</div>
          <h2
            className="font-display leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(36px, 6vw, 84px)", color: "var(--contact-text)" }}
          >
            Let&apos;s build something{" "}
            <span className="italic" style={{ color: "var(--contact-gold)" }}>real.</span>
          </h2>

          <div className="mt-8 md:mt-10 space-y-1">
            {LINKS.map((l) => (
              <div
                key={l.label}
                className="group flex items-center justify-between py-4 px-3 transition-all duration-300 hover:translate-x-1.5"
                style={{ borderLeft: "1px solid transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = "var(--contact-gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = "transparent")}
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--contact-text-dim)" }}>
                    {l.label}
                  </div>
                  <a
                    href={l.href}
                    target={l.target}
                    rel={l.target ? "noopener noreferrer" : undefined}
                    className="font-mono text-[14px] mt-1 inline-block hover:text-[var(--contact-gold)] transition-colors"
                    style={{ color: "var(--contact-text)" }}
                  >
                    {l.value}
                  </a>
                </div>
                {l.copy && (
                  <button
                    onClick={() => copyToClipboard(l.copyValue!, l.label)}
                    aria-label={`copy ${l.label}`}
                    className="copy-btn"
                    style={{
                      color: copied === l.label ? "#4ade80" : "var(--contact-gold)",
                    }}
                  >
                    {copied === l.label ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="https://forms.gle/c3a25P3tNi7XZ3yx5"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: "16px", fontWeight: 500, padding: "16px 32px" }}
            >
              Fill Contact Form
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
