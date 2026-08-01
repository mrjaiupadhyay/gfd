"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
};

export function HeartCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    let id = 0;
    let last = 0;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 55) return;
      last = now;
      const next: Particle = { id: id++, x: e.clientX, y: e.clientY };
      setParticles((prev) => [...prev.slice(-18), next]);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden>
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute text-sm"
            style={{ left: p.x, top: p.y, color: "var(--pink)" }}
            initial={{ opacity: 0.85, scale: 0.6, y: 0 }}
            animate={{ opacity: 0, scale: 1.2, y: -28 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            ♥
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
