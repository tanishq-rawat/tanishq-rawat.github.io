"use client";

import { motion } from "motion/react";
import Section from "@/components/Section";
import { about } from "@/data/content";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export default function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title={<span className="text-gradient">Systems that fail quietly, not loudly.</span>}
    >
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        {/* Bio */}
        <div className="space-y-5">
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-base leading-relaxed text-text-muted md:text-lg"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* System status facts */}
        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid h-fit grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2"
        >
          {about.facts.map((f) => (
            <motion.div
              key={f.label}
              variants={staggerItem}
              className="bg-surface-1 p-5"
            >
              <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-text-faint">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {f.label}
              </dt>
              <dd className="tabular mt-2 font-display text-[1.75rem] font-semibold text-text sm:text-3xl">
                {f.value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </Section>
  );
}
