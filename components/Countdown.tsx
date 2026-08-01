"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { secondsTogether } from "@/lib/utils";

export function Countdown() {
  const [seconds, setSeconds] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setSeconds(secondsTogether());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (seconds == null) {
    return (
      <div className="glass inline-flex rounded-xl px-5 py-2.5 text-sm opacity-0">
        Together
      </div>
    );
  }

  return (
    <motion.div
      className="glass inline-flex items-baseline gap-2 rounded-xl px-5 py-2.5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span className="font-body text-sm text-[var(--text-muted)]">
        Together for
      </span>
      <span className="font-display text-xl font-semibold text-[var(--pink)] sm:text-2xl">
        {seconds.toLocaleString()}
      </span>
      <span className="font-body text-sm text-[var(--text-muted)]">seconds</span>
    </motion.div>
  );
}
