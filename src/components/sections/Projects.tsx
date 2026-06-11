"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import Section from "@/components/Section";
import { projects, type Project } from "@/data/content";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";

function ProjectCard({ project }: { project: Project }) {
  const featured = project.featured;
  return (
    <motion.article
      variants={staggerItem}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-1/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-surface-2/60 md:p-8 ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      {/* glow border accent on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(40rem 20rem at var(--mx,50%) 0%, var(--glow-teal), transparent 60%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-border-strong bg-ink font-mono text-sm text-accent">
            {project.name[0]}
          </span>
          <h3 className="font-display text-xl font-semibold text-text">
            {project.name}
          </h3>
          {featured && (
            <span className="rounded-full border border-violet/40 bg-violet/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-violet">
              Featured
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
              className="grid h-10 w-10 place-items-center rounded-lg text-text-muted transition-colors hover:bg-surface-3 hover:text-text"
            >
              <Github size={18} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} live site`}
              className="grid h-10 w-10 place-items-center rounded-lg text-text-muted transition-colors hover:bg-surface-3 hover:text-accent"
            >
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </div>

      <p
        className={`relative mt-4 leading-relaxed text-text-muted ${
          featured ? "max-w-2xl text-base md:text-lg" : "text-sm"
        }`}
      >
        {project.problem}
      </p>

      <ul className="relative mt-auto flex flex-wrap gap-2 pt-6">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-md border border-border bg-ink/60 px-2.5 py-1 font-mono text-[11px] text-text-muted"
          >
            {t}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      eyebrow="Projects"
      title="Things I've built"
      intro="A selection of systems work — orchestration, retrieval, observability, and the occasional algorithm I built to understand it properly."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-5 sm:grid-cols-2"
      >
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </motion.div>
    </Section>
  );
}
