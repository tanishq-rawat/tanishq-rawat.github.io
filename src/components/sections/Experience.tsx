"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Section from "@/components/Section";
import { experience } from "@/data/content";
import { viewportOnce } from "@/lib/motion";

export default function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 65%", "end 60%"],
  });
  // The timeline line "draws" itself as the user scrolls through entries.
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Experience"
      title="Where I've shipped"
      intro="Six years across data platforms, billing infrastructure, and AI services — building systems that stay up while they grow."
    >
      <div ref={railRef} className="relative">
        {/* Rail track — sits at the node-column centre (mobile col0, desktop col1). */}
        <div
          aria-hidden
          className="absolute left-4 top-2 bottom-2 w-px bg-border md:left-[9.5rem]"
        />
        {/* Animated drawn line */}
        <motion.div
          aria-hidden
          style={{ scaleY: lineScale }}
          className="absolute left-4 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent via-accent to-violet md:left-[9.5rem]"
        />

        <ol className="space-y-12 md:space-y-16">
          {experience.map((job, i) => (
            <motion.li
              key={job.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid grid-cols-[2rem_1fr] gap-x-4 md:grid-cols-[7rem_2rem_1fr] md:gap-x-6"
            >
              {/* Duration (desktop left column) */}
              <span className="hidden pt-0.5 text-right font-mono text-xs leading-relaxed text-text-faint md:block">
                {job.duration}
              </span>

              {/* Node */}
              <div className="relative flex justify-center">
                <motion.span
                  initial={{ scale: 0.4, opacity: 0.3 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="mt-1 grid h-4 w-4 place-items-center rounded-full border border-accent bg-ink"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--glow-teal)]" />
                </motion.span>
              </div>

              {/* Entry card */}
              <div className="pb-2">
                <span className="mb-2 inline-block font-mono text-xs text-text-faint md:hidden">
                  {job.duration}
                </span>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <h3 className="font-display text-xl font-semibold text-text">
                    {job.role}
                  </h3>
                  <span className="text-text-faint">·</span>
                  <span className="text-accent">{job.company}</span>
                  {job.location && (
                    <span className="font-mono text-xs text-text-faint">
                      / {job.location}
                    </span>
                  )}
                </div>
                <ul className="mt-4 space-y-2">
                  {job.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      className="flex gap-3 text-sm leading-relaxed text-text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-faint" />
                      {b}
                    </li>
                  ))}
                </ul>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-md border border-border bg-surface-1 px-2.5 py-1 font-mono text-[11px] text-text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
