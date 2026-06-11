"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin top progress bar tracking overall page scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-gradient-to-r from-accent via-accent-strong to-violet"
    />
  );
}
