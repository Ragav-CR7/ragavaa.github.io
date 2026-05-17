"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Background() {
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.to(orb1.current, {
        x: 30, y: 30, duration: 30, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(orb2.current, {
        x: -30, y: -30, duration: 25, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="bg-grid" aria-hidden />
      <div ref={orb1} className="bg-orb bg-orb-1" aria-hidden />
      <div ref={orb2} className="bg-orb bg-orb-2" aria-hidden />
      <svg className="bg-noise" aria-hidden>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      <div className="bg-vignette" aria-hidden />
    </>
  );
}
