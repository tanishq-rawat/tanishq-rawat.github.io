"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Fixed parallax background: grid + two glow blobs + faint drifting node graph.
 * Layers move at different speeds so scrolling feels like descending through a
 * system. Fully static when reduced-motion is requested.
 */
export default function Backdrop() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Different speeds per depth layer (no-ops under reduced motion).
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const blobAY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"]);
  const blobBY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "40%"]);
  const nodesY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Grid plane */}
      <motion.div style={{ y: gridY }} className="absolute inset-[-10%] bg-grid opacity-[0.5]" />

      {/* Glow blobs */}
      <motion.div
        style={{ y: blobAY }}
        className="absolute -left-32 top-[8%] h-[34rem] w-[34rem] rounded-full opacity-60 blur-[120px]"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,var(--glow-teal),transparent_70%)]" />
      </motion.div>
      <motion.div
        style={{ y: blobBY }}
        className="absolute right-[-10%] top-[45%] h-[40rem] w-[40rem] rounded-full opacity-60 blur-[140px]"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,var(--glow-violet),transparent_70%)]" />
      </motion.div>

      {/* Faint node-graph constellation */}
      <motion.svg
        style={{ y: nodesY }}
        className="absolute right-[6%] top-[18%] hidden h-[30rem] w-[30rem] opacity-[0.16] lg:block"
        viewBox="0 0 400 400"
        fill="none"
      >
        <g stroke="var(--accent)" strokeWidth="1">
          <line x1="60" y1="80" x2="200" y2="40" />
          <line x1="200" y1="40" x2="330" y2="120" />
          <line x1="60" y1="80" x2="120" y2="220" />
          <line x1="120" y1="220" x2="280" y2="260" />
          <line x1="280" y1="260" x2="330" y2="120" />
          <line x1="200" y1="40" x2="120" y2="220" />
          <line x1="280" y1="260" x2="200" y2="370" />
          <line x1="120" y1="220" x2="200" y2="370" />
        </g>
        <g fill="var(--accent)">
          {[
            [60, 80],
            [200, 40],
            [330, 120],
            [120, 220],
            [280, 260],
            [200, 370],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" />
          ))}
        </g>
      </motion.svg>
    </div>
  );
}
