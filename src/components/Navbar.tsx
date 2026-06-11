"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("hero");
  const [open, setOpen] = useState(false);

  // Show navbar after scrolling past the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section highlighting via IntersectionObserver.
  useEffect(() => {
    const ids = ["hero", ...navLinks.map((l) => l.id)];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {scrolled && (
          <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-50 px-4 pt-3"
          >
            <nav
              aria-label="Primary"
              className="glass container-page flex h-14 items-center justify-between rounded-xl px-4 sm:px-6"
            >
              <a
                href="#hero"
                className="group flex items-center gap-2 font-display text-sm font-semibold tracking-tight text-text"
                aria-label={`${profile.name} — home`}
              >
                <span className="grid h-7 w-7 place-items-center rounded-md border border-border-strong bg-surface-2 font-mono text-xs text-accent">
                  {profile.firstName[0]}
                </span>
                <span className="hidden sm:inline">{profile.name}</span>
              </a>

              {/* Desktop links */}
              <ul className="hidden items-center gap-1 md:flex">
                {navLinks.map((link) => {
                  const isActive = active === link.id;
                  return (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        aria-current={isActive ? "true" : undefined}
                        className={`relative rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                          isActive ? "text-text" : "text-text-muted hover:text-text"
                        }`}
                      >
                        {link.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-x-2 -bottom-0.5 h-px bg-accent"
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <a
                href="#contact"
                className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5 md:inline-block"
              >
                Let&apos;s talk
              </a>

              {/* Mobile toggle */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="grid h-11 w-11 place-items-center rounded-lg text-text md:hidden"
              >
                <Menu size={22} />
              </button>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            />
            <motion.nav
              aria-label="Mobile"
              variants={{
                open: { x: 0 },
                closed: { x: "100%" },
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass absolute right-0 top-0 flex h-full w-[78%] max-w-xs flex-col p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-text-faint">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-lg text-text"
                >
                  <X size={22} />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 text-lg ${
                        active === link.id ? "text-accent" : "text-text"
                      }`}
                    >
                      <span className="font-mono text-xs text-text-faint">
                        0{i + 1}
                      </span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-auto rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-ink"
              >
                Let&apos;s talk
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
