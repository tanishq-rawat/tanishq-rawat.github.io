"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * SIGNATURE ELEMENT — a live 2D system-architecture diagram.
 * Nodes pulse on a stagger; packets of light travel along the edges between
 * services (teal = data flow, violet = flow into the AI model node).
 * Pure SVG + CSS motion-path. No 3D, no canvas. Static lit graph under
 * prefers-reduced-motion.
 */

type NodeKind = "default" | "ai";
interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  kind?: NodeKind;
}

const NODES: Node[] = [
  { id: "gateway", label: "gateway", x: 70, y: 200 },
  { id: "api", label: "api", x: 205, y: 90 },
  { id: "queue", label: "queue", x: 205, y: 310 },
  { id: "cache", label: "cache", x: 365, y: 95 },
  { id: "worker", label: "worker", x: 360, y: 205 },
  { id: "db", label: "db", x: 365, y: 320 },
  { id: "model", label: "model", x: 525, y: 200, kind: "ai" },
];

const EDGES: [string, string][] = [
  ["gateway", "api"],
  ["gateway", "queue"],
  ["api", "cache"],
  ["api", "worker"],
  ["queue", "worker"],
  ["worker", "db"],
  ["worker", "model"],
  ["cache", "model"],
  ["db", "model"],
];

const byId = (id: string) => NODES.find((n) => n.id === id)!;
const pathOf = (a: Node, b: Node) => `M${a.x},${a.y} L${b.x},${b.y}`;
const dist = (a: Node, b: Node) => Math.hypot(b.x - a.x, b.y - a.y);

export default function NetworkDiagram() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 600 400"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Animated diagram of a distributed system: a gateway routing requests through API, queue, cache, worker and database services into an AI model, with data packets flowing along the connections."
      >
        <defs>
          <radialGradient id="nodeTeal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </radialGradient>
          <radialGradient id="nodeViolet" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        <g stroke="var(--border-strong)" strokeWidth="1.5" fill="none">
          {EDGES.map(([a, b]) => {
            const na = byId(a);
            const nb = byId(b);
            return <path key={`${a}-${b}`} d={pathOf(na, nb)} />;
          })}
        </g>

        {/* Packets travelling along edges — animate cx/cy directly so it works
            in every browser (offset-path on SVG is unreliable). Skipped under
            reduced motion. */}
        {!reduce && (
          <g>
            {EDGES.map(([a, b], i) => {
              const na = byId(a);
              const nb = byId(b);
              const toAI = nb.kind === "ai";
              // Constant packet speed: longer edges take proportionally longer.
              const duration = Math.max(1.6, dist(na, nb) / 90);
              const lerp = (t: number) => [
                na.x + (nb.x - na.x) * t,
                na.y + (nb.y - na.y) * t,
              ];
              const [x1, y1] = lerp(0.12);
              const [x2, y2] = lerp(0.88);
              return (
                <motion.circle
                  key={`p-${a}-${b}`}
                  r={3.4}
                  fill={toAI ? "#c4b5fd" : "#5eead4"}
                  filter="url(#softGlow)"
                  initial={{ cx: na.x, cy: na.y, opacity: 0 }}
                  animate={{
                    cx: [na.x, x1, x2, nb.x],
                    cy: [na.y, y1, y2, nb.y],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration,
                    times: [0, 0.12, 0.88, 1],
                    ease: "linear",
                    repeat: Infinity,
                    delay: i * 0.35,
                    repeatDelay: 0.5,
                  }}
                />
              );
            })}
          </g>
        )}

        {/* Nodes */}
        {NODES.map((n, i) => {
          const isAI = n.kind === "ai";
          const fill = isAI ? "url(#nodeViolet)" : "url(#nodeTeal)";
          const ring = isAI ? "#8b5cf6" : "#2dd4bf";
          return (
            <g key={n.id}>
              {/* Pulsing halo */}
              {!reduce && (
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={isAI ? 14 : 11}
                  fill="none"
                  stroke={ring}
                  strokeWidth="1.5"
                  initial={{ scale: 0.6, opacity: 0.5 }}
                  animate={{ scale: [0.7, 2.1], opacity: [0.5, 0] }}
                  transition={{
                    duration: 2.4,
                    ease: "easeOut",
                    repeat: Infinity,
                    delay: i * 0.35,
                  }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                />
              )}
              {/* Core node */}
              <circle
                cx={n.x}
                cy={n.y}
                r={isAI ? 9 : 7}
                fill={fill}
                filter="url(#softGlow)"
              />
              <circle cx={n.x} cy={n.y} r={isAI ? 9 : 7} fill="none" stroke={ring} strokeOpacity="0.5" />
              {/* Mono label */}
              <text
                x={n.x}
                y={n.y + (n.id === "queue" || n.id === "db" ? 34 : -20)}
                textAnchor="middle"
                fontFamily="var(--font-jetbrains-mono), monospace"
                fontSize="19"
                fontWeight="500"
                letterSpacing="0.04em"
                fill={isAI ? "#c4b5fd" : "#b8c2d6"}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
