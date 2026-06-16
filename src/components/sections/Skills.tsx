"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Section from "@/components/Section";
import { skillCategories } from "@/data/content";

export default function Skills() {
  const [active, setActive] = useState(skillCategories[0].key);
  const current = skillCategories.find((c) => c.key === active)!;

  return (
    <Section
      id="skills"
      index="04"
      eyebrow="Skills"
      title="The toolkit"
      intro="Grouped by where they live in the stack. No proficiency bars — just what I reach for and ship with."
    >
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Skill categories"
        className="flex flex-wrap gap-2"
      >
        {skillCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = cat.key === active;
          return (
            <button
              key={cat.key}
              role="tab"
              type="button"
              id={`tab-${cat.key}`}
              aria-selected={isActive}
              aria-controls={`panel-${cat.key}`}
              onClick={() => setActive(cat.key)}
              className={`relative inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "border-accent/50 bg-surface-2 text-text"
                  : "border-border bg-surface-1/50 text-text-muted hover:border-border-strong hover:text-text"
              }`}
            >
              <Icon size={16} className={isActive ? "text-accent" : "text-text-faint"} />
              {cat.label}
              {isActive && (
                <motion.span
                  layoutId="skills-tab-indicator"
                  className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Chips */}
      <div
        role="tabpanel"
        id={`panel-${current.key}`}
        aria-labelledby={`tab-${current.key}`}
        className="mt-8 min-h-[8rem] rounded-2xl border border-border bg-surface-0/40 p-6 md:p-8"
      >
        <AnimatePresence mode="wait">
          <motion.ul
            key={current.key}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.04 } },
            }}
            className="flex flex-wrap gap-2.5"
          >
            {current.skills.map((skill) => (
              <motion.li
                key={skill}
                variants={{
                  hidden: { opacity: 0, y: 12, scale: 0.96 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-1 px-3.5 py-2 text-sm text-text transition-colors duration-200 hover:border-accent/40 hover:bg-surface-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {skill}
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </Section>
  );
}
