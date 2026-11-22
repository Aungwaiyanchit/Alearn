"use client";

import { AnimatePresence, motion } from "framer-motion";

interface CelebrationBurstProps {
  triggerKey: number;
}

const PARTICLES = [
  { id: "p1", x: -95, y: -70, rotate: -45, color: "#f59e0b", size: 8 },
  { id: "p2", x: -65, y: -105, rotate: 30, color: "#10b981", size: 7 },
  { id: "p3", x: -25, y: -115, rotate: -20, color: "#6366f1", size: 9 },
  { id: "p4", x: 20, y: -118, rotate: 55, color: "#f43f5e", size: 8 },
  { id: "p5", x: 65, y: -102, rotate: -35, color: "#10b981", size: 7 },
  { id: "p6", x: 98, y: -68, rotate: 40, color: "#f59e0b", size: 8 },
  { id: "p7", x: -85, y: -25, rotate: 75, color: "#0ea5e9", size: 6 },
  { id: "p8", x: 88, y: -28, rotate: -65, color: "#8b5cf6", size: 6 },
  { id: "p9", x: -42, y: -80, rotate: 15, color: "#fbbf24", size: 6 },
  { id: "p10", x: 44, y: -82, rotate: -15, color: "#34d399", size: 7 },
] as const;

export function CelebrationBurst({ triggerKey }: CelebrationBurstProps) {
  if (triggerKey === 0) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-1/3 z-40 flex justify-center overflow-visible"
    >
      <AnimatePresence mode="popLayout">
        <div key={triggerKey} className="relative h-1 w-1">
          {PARTICLES.map((particle, index) => (
            <motion.span
              key={particle.id}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
              animate={{
                x: particle.x,
                y: particle.y,
                scale: [0, 1.2, 0.7],
                opacity: [1, 1, 0],
                rotate: particle.rotate * 2,
              }}
              transition={{
                duration: 0.75,
                delay: index * 0.015,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                backgroundColor: particle.color,
                width: particle.size,
                height: particle.size,
              }}
              className="absolute rounded-xs"
            />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
