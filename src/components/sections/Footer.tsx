"use client";

import { ArrowUp } from "lucide-react";
import SocialRow from "@/components/SocialRow";
import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="container-page flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <a
            href="#hero"
            className="font-display text-lg font-semibold text-text"
          >
            {profile.name}
          </a>
          <p className="mt-2 font-mono text-xs text-text-faint">
            Built with Next.js, Tailwind &amp; Framer Motion. Deployed on the edge.
          </p>
          <p className="mt-1 font-mono text-xs text-text-faint">
            © {new Date().getFullYear()} {profile.name} — all systems operational.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <SocialRow />
          <a
            href="#hero"
            aria-label="Back to top"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-border-strong bg-surface-1 px-4 text-sm text-text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowUp size={16} />
            <span className="hidden sm:inline">Top</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
