"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type SparklesProps = {
  count?: number;
};

export function Sparkles({ count = 28 }: SparklesProps) {
  const sparks = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${(i * 53) % 100}%`,
        left: `${(i * 29) % 100}%`,
        size: 2 + (i % 4),
        delay: (i % 12) * 0.35,
        duration: 2 + (i % 5) * 0.4,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background:
              s.id % 3 === 0
                ? "var(--rose-gold-bright)"
                : s.id % 3 === 1
                  ? "var(--pink-soft)"
                  : "var(--lavender)",
            boxShadow: `0 0 ${s.size * 3}px currentColor`,
          }}
          animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.25, 0.7] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
