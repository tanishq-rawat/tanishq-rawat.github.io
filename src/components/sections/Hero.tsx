"use client";

import { motion } from "motion/react";
import { ArrowRight, Download, Mail } from "lucide-react";
import NetworkDiagram from "@/components/NetworkDiagram";
import SocialRow from "@/components/SocialRow";
import { profile } from "@/data/content";
import { EASE_OUT } from "@/lib/motion";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-dvh items-center overflow-hidden pt-28 pb-16 md:pt-32"
    >
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — identity */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="eyebrow mb-6"
          >
            Backend · AI · Distributed Systems
          </motion.p>

          <motion.h1
            variants={item}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="display text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-7xl"
          >
            <span className="text-text">{profile.name}</span>
          </motion.h1>

          <motion.p
            variants={item}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mt-5 max-w-xl text-lg sm:text-xl text-text-muted"
          >
            <span className="text-text">{profile.role}</span> —{" "}
            <span className="text-gradient font-medium">{profile.tagline}</span>
          </motion.p>

          <motion.p
            variants={item}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mt-5 max-w-lg leading-relaxed text-text-faint"
          >
            {profile.oneLiner}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
            >
              View Projects
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="group inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface-1/60 px-5 py-3 text-sm font-semibold text-text transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <Download
                size={16}
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              />
              Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface-1/60 px-5 py-3 text-sm font-semibold text-text transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <Mail size={16} />
              Contact
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={item}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mt-8 flex items-center gap-3"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-text-faint">
              Find me
            </span>
            <span className="h-px w-8 bg-border-strong" />
            <SocialRow />
          </motion.div>
        </motion.div>

        {/* Right — signature diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.25 }}
          className="relative"
        >
          <div className="relative rounded-2xl border border-border bg-surface-0/40 p-5 backdrop-blur-sm sm:p-8">
            {/* terminal-style chrome bar */}
            <div className="mb-5 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
              <span className="ml-2 font-mono text-[11px] tracking-wider text-text-faint">
                system.topology — live
              </span>
              <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                healthy
              </span>
            </div>
            <NetworkDiagram />
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-text-faint"
      >
        scroll
      </motion.div>
    </section>
  );
}
