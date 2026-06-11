"use client";

import { motion } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import Section from "@/components/Section";
import SocialRow from "@/components/SocialRow";
import { profile } from "@/data/content";
import { viewportOnce } from "@/lib/motion";

export default function Contact() {
  return (
    <Section
      id="contact"
      index="06"
      eyebrow="Contact"
      title={<span className="text-gradient">Let&apos;s build something resilient.</span>}
      intro="Open to backend & AI engineering roles and the occasional systems-design conversation. The fastest way to reach me is email."
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-border bg-surface-1/60 p-8 md:p-12"
      >
        {/* faint node motif backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            background:
              "radial-gradient(30rem 18rem at 100% 0%, var(--glow-violet), transparent 65%)",
          }}
        />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 font-display text-2xl font-semibold text-text transition-colors hover:text-accent sm:text-3xl md:text-4xl"
            >
              {profile.email}
              <ArrowUpRight
                className="text-text-faint transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                size={28}
              />
            </a>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-text-muted">
              <MapPin size={15} className="text-accent" />
              {profile.location}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <span className="font-mono text-xs uppercase tracking-widest text-text-faint">
              Elsewhere
            </span>
            <SocialRow />
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
