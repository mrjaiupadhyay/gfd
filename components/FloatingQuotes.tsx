"use client";

import { FLOATING_QUOTES } from "@/lib/constants";
import { motion } from "framer-motion";
import { useMemo } from "react";

export function FloatingQuotes() {
  const quotes = useMemo(
    () =>
      FLOATING_QUOTES.map((text, i) => ({
        text,
        top: `${12 + ((i * 14) % 70)}%`,
        left: i % 2 === 0 ? `${4 + (i % 3) * 3}%` : "auto",
        right: i % 2 === 1 ? `${4 + (i % 3) * 3}%` : "auto",
        delay: 0.8 + i * 0.35,
        duration: 6 + (i % 3),
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden>
      {quotes.map((q) => (
        <motion.p
          key={q.text}
          className="font-script absolute max-w-[180px] text-sm text-[var(--text-muted)] opacity-40"
          style={{ top: q.top, left: q.left, right: q.right }}
          animate={{ y: [0, -10, 0], opacity: [0.25, 0.5, 0.25] }}
          transition={{
            duration: q.duration,
            delay: q.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {q.text}
        </motion.p>
      ))}
    </div>
  );
}
