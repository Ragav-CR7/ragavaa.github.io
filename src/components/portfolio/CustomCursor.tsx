"use client";
import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx, cy = my;
    let lx = mx, ly = my;

    const arrow = document.getElementById("cursor-arrow");
    const label = document.getElementById("cursor-label");
    if (!arrow || !label) return;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    let raf = 0;
    const tick = () => {
      cx += (mx - cx) * 0.35;
      cy += (my - cy) * 0.35;
      lx += (mx - lx) * 0.18;
      ly += (my - ly) * 0.18;
      arrow.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      label.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const body = document.body;
    const setLabel = (text: string | null) => {
      if (text) {
        label.textContent = text;
        label.classList.add("is-visible");
      } else {
        label.classList.remove("is-visible");
      }
    };

    const bind = (selector: string, cls: string, labelText?: string) => {
      const els = document.querySelectorAll<HTMLElement>(selector);
      const enter = () => {
        body.classList.add(cls);
        if (labelText) setLabel(labelText);
      };
      const leave = () => {
        body.classList.remove(cls);
        if (labelText) setLabel(null);
      };
      els.forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
      return () => {
        els.forEach((el) => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        });
      };
    };

    const cleanups: Array<() => void> = [];
    const bindAll = () => {
      cleanups.push(bind(".nav-shell, .nav-shell a, .nav-shell button", "cursor-nav", "navigate"));
      cleanups.push(bind(".card", "cursor-hover", "view"));
      cleanups.push(bind(".skill-tag, .stat-card", "cursor-hover"));
      cleanups.push(bind("a", "cursor-link", "open"));
      cleanups.push(bind("button", "cursor-link"));
      cleanups.push(bind("input, textarea", "cursor-text"));
    };
    const t = window.setTimeout(bindAll, 200);

    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      window.removeEventListener("mousemove", onMove);
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <>
      <div id="cursor-arrow" aria-hidden>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 2.2L3 17.6L7.3 13.7L9.9 19.4L12.4 18.3L9.8 12.6L15.6 12.1L3 2.2Z"
            fill="var(--gold)"
            stroke="#0a0a0a"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div id="cursor-label" aria-hidden />
    </>
  );
}
