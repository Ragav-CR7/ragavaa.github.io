"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className="nav-shell fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        data-scrolled={scrolled ? "true" : "false"}
        style={{
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid var(--gold-dim)`,
          padding: scrolled ? "12px 0" : "20px 0",
        }}
      >
        <div className="container-x flex items-center justify-between">
          <div
            className="nav-pill hidden lg:flex items-center gap-1 px-2 py-2 rounded-full"
            style={{ border: "1px solid var(--border-color)" }}
          >
            {links.map((l) => (
              <button
                key={l.id}
                data-nav-link={l.id}
                onClick={() => scrollTo(l.id)}
                className="nav-link px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md"
            style={{ border: "1px solid var(--border-color)", color: "var(--gold)" }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>

          <div className="flex items-center gap-3 sm:gap-5">
            <ThemeToggle />
            <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              <span className="available-tick" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="8" fill="#22c55e" />
                  <path d="M4.5 8.2l2.3 2.3 4.7-4.7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </span>
              available
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(5, 6, 12, 0.98)", backdropFilter: "blur(12px)", paddingTop: "80px" }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="container-x py-8">
            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="text-left px-6 py-4 font-mono text-[14px] uppercase tracking-widest rounded-lg transition-all"
                  style={{
                    color: "var(--text)",
                    border: "1px solid var(--border-color)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--gold)";
                    e.currentTarget.style.background = "var(--gold-dim)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-color)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
