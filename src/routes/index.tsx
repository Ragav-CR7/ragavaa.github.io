import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Background from "@/components/portfolio/Background";
import SmoothScroll from "@/components/portfolio/SmoothScroll";

import Nav from "@/components/portfolio/Nav";
import Footer from "@/components/portfolio/Footer";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Contact from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ragavaa M - Personal portfolio" },
      {
        name: "description",
        content:
          "Software Engineer building production LLM systems — RAG pipelines, agentic workflows, and prompt infrastructure.",
      },
      { property: "og:title", content: "Ragavaa Mani — Software Engineer" },
      {
        property: "og:description",
        content: "Production AI systems: retrieval, reasoning, and reliable shipping.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".section-wipe", { clipPath: "inset(0 0% 0 0)" });
        return;
      }

      // 1) Nav section progress underlines
      const sections = ["about", "skills", "experience", "projects", "contact"];
      sections.forEach((id) => {
        const sec = document.getElementById(id);
        const link = document.querySelector<HTMLElement>(`[data-nav-link="${id}"]`);
        if (!sec || !link) return;
        ScrollTrigger.create({
          trigger: sec,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            link.style.setProperty("--progress", String(self.progress));
            link.style.color =
              self.progress > 0.05 && self.progress < 0.95
                ? "var(--gold)"
                : "var(--text-muted)";
          },
        });
      });

      // 2) Hero parallax layers
      gsap.to(".hero-name", {
        y: -80,
        ease: "none",
        scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".hero-subtitle", {
        y: -40,
        ease: "none",
        scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: 1.5 },
      });
      gsap.to(".hero-ctas", {
        y: -20,
        ease: "none",
        scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: 2 },
      });

      // Hero name slide-up entry
      gsap.from(".hero-name", {
        yPercent: 110,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });

      // 3) Section wipe reveal
      gsap.utils.toArray<HTMLElement>(".section-wipe").forEach((sec) => {
        gsap.to(sec, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sec, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

      // 4) Stagger card reveal — projects + skills
      [".projects-grid", ".skills-grid"].forEach((sel) => {
        const wrap = document.querySelector(sel);
        if (!wrap) return;
        gsap.from(wrap.children, {
          opacity: 0,
          y: 30,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: wrap, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

      // 5) Count-up numbers
      document.querySelectorAll<HTMLElement>(".count-up").forEach((el) => {
        const target = Number(el.dataset.count || "0");
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(el, {
              innerText: target,
              snap: { innerText: 1 },
              duration: 1.5,
              ease: "power2.out",
            });
          },
        });
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <SmoothScroll />
      <Background />
      
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
