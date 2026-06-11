/**
 * Centralized animation variants & timing tokens.
 * Keep durations in the 0.15–0.6s range; ease-out for entrances (UI guideline §7).
 */
import type { Variants, Transition } from "motion/react";

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const transition: Transition = {
  duration: 0.55,
  ease: EASE_OUT,
};

/** Fade + rise — default content reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition },
};

/** Container that staggers its children. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Smaller item used inside staggered grids/lists. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

/** Shared viewport config so reveals fire once and don't jitter. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
