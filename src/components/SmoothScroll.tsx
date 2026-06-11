"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig, useReducedMotion } from "motion/react";

/**
 * Lenis smooth scrolling, integrated with the browser scroll so Framer Motion's
 * useScroll stays in sync. Disabled entirely under prefers-reduced-motion.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Smooth-scroll for in-page anchor clicks.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [reduce]);

  // reducedMotion="user" makes every Framer Motion animation honor the OS
  // setting (JS animations ignore the CSS prefers-reduced-motion rule otherwise).
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
