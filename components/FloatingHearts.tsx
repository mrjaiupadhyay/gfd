"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type FloatingHeartsProps = {
  count?: number;
  className?: string;
};

export function FloatingHearts({ count = 18, className = "" }: FloatingHeartsProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        size: 10 + ((i * 17) % 18),
        delay: (i % 10) * 0.55,
        duration: 10 + (i % 7) * 1.4,
        opacity: 0.25 + (i % 5) * 0.1,
      })),
    [count],
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute bottom-[-5%] text-pink-soft"
          style={{
            left: h.left,
            fontSize: h.size,
            opacity: h.opacity,
            color: iColor(h.id),
          }}
          animate={{
            y: ["0vh", "-115vh"],
            x: [0, (h.id % 2 === 0 ? 1 : -1) * (12 + (h.id % 20))],
            rotate: [0, h.id % 2 === 0 ? 25 : -25],
            opacity: [0, h.opacity, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}

function iColor(i: number) {
  const colors = [
    "var(--pink)",
    "var(--rose-gold)",
    "var(--lavender)",
    "var(--pink-soft)",
  ];
  return colors[i % colors.length];
}
