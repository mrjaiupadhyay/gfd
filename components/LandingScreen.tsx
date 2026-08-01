"use client";

import { motion } from "framer-motion";
import { FloatingHearts } from "./FloatingHearts";
import { Sparkles } from "./Stars";
import { Countdown } from "./Countdown";
import { FloatingQuotes } from "./FloatingQuotes";

type LandingScreenProps = {
  onStart: () => void;
};

export function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <motion.section
      className="animated-gradient-bg relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden px-6 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <FloatingHearts count={16} />
      <Sparkles count={24} />
      <FloatingQuotes />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.p
          className="font-script mb-4 text-xl tracking-wide text-[var(--rose-gold)] sm:text-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          For my love
        </motion.p>

        <motion.h1
          className="font-display gradient-text text-5xl leading-[1.1] font-semibold sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.8 }}
        >
          Happy Girlfriend&apos;s Day ❤️
        </motion.h1>

        <motion.p
          className="mt-6 max-w-md text-base text-[var(--text-muted)] sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          A quiet little cinema of us — press play, and let the night remember.
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <Countdown />
        </motion.div>

        <motion.button
          type="button"
          onClick={onStart}
          className="pulse-glow glass font-display mt-12 rounded-2xl px-10 py-4 text-lg font-medium tracking-wide text-[var(--text)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Our Story
        </motion.button>
      </div>
    </motion.section>
  );
}
