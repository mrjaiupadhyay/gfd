"use client";

import { motion } from "framer-motion";

type LoadingScreenProps = {
  onComplete: () => void;
};

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  return (
    <motion.div
      className="animated-gradient-bg fixed inset-0 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative flex h-28 w-28 items-center justify-center"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="text-6xl"
          style={{ color: "var(--pink)" }}
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        >
          ♥
        </motion.span>
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "0 0 0 2px color-mix(in srgb, var(--pink) 40%, transparent)",
          }}
          animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.div>

      <motion.p
        className="font-script mt-8 text-2xl text-[var(--text-muted)] sm:text-3xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Preparing our story…
      </motion.p>

      <motion.div
        className="mt-10 h-[2px] w-40 overflow-hidden rounded-full bg-white/15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, var(--pink), var(--rose-gold), var(--lavender))",
          }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
          onAnimationComplete={onComplete}
        />
      </motion.div>
    </motion.div>
  );
}
