"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Clock } from "lucide-react";
import Section from "@/components/Section";
import { blogs } from "@/data/content";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

export default function Blogs() {
  return (
    <Section
      id="blog"
      index="05"
      eyebrow="Writing"
      title="Notes from the trenches"
      intro="Occasional essays on distributed systems, reliability, and applied AI — published on Medium."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="flex flex-wrap justify-center gap-4"
      >
        {blogs.map((post) => (
          <motion.a
            key={post.title}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={staggerItem}
            className="group flex w-full flex-col rounded-2xl border border-border bg-surface-1/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-surface-2/60 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-md border border-border bg-ink/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                {post.tag}
              </span>
              <ArrowUpRight
                size={18}
                className="text-text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </div>
            <h3 className="font-display text-lg font-semibold leading-snug text-text transition-colors group-hover:text-accent">
              {post.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-muted">
              {post.excerpt}
            </p>
            <div className="mt-auto flex items-center gap-3 pt-6 font-mono text-xs text-text-faint">
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-border-strong" />
              <span className="inline-flex items-center gap-1">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}
