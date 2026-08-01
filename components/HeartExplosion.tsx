"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type HeartExplosionProps = {
  active?: boolean;
};

export function HeartExplosion({ active = true }: HeartExplosionProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => {
        const angle = (i / 28) * Math.PI * 2;
        const dist = 80 + (i % 5) * 36;
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          size: 14 + (i % 6) * 4,
          delay: (i % 8) * 0.04,
        };
      }),
    [],
  );

  if (!active) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
      aria-hidden
    >
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute"
          style={{
            fontSize: h.size,
            color: h.id % 2 === 0 ? "var(--pink)" : "var(--rose-gold)",
          }}
          initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.2, 1.15, 0.8],
            x: h.x,
            y: h.y,
          }}
          transition={{
            duration: 1.8,
            delay: h.delay,
            ease: "easeOut",
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
