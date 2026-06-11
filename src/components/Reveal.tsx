"use client";

import { motion } from "motion/react";
import { fadeUp, viewportOnce } from "@/lib/motion";

/** Wraps content in a once-only fade/rise reveal as it enters the viewport. */
export default function Reveal({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}
