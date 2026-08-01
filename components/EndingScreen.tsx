"use client";

import { motion } from "framer-motion";
import { Confetti } from "./Confetti";
import { HeartExplosion } from "./HeartExplosion";
import { RosePetals } from "./RosePetals";
import { StarsField } from "./StarsField";

export function EndingScreen() {
  return (
    <motion.section
      className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden px-6 py-20"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(74,44,106,0.55), transparent 60%), linear-gradient(180deg, #07041a 0%, #120a28 45%, #1a0f2e 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <StarsField denser />
      <RosePetals count={22} />
      <Confetti count={36} />
      <HeartExplosion />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <motion.h1
          className="font-display gradient-text text-4xl font-semibold sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
        >
          Happy Girlfriend&apos;s Day ❤️
        </motion.h1>

        <motion.div
          className="font-display mt-10 space-y-2 text-xl text-white/90 sm:text-2xl md:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            You are my today,
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            my tomorrow,
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0 }}
          >
            and every beautiful moment in between.
          </motion.p>
        </motion.div>

        <motion.p
          className="font-script mt-12 text-3xl text-[var(--pink-soft)] sm:text-4xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.6, duration: 0.8 }}
        >
          I Love You ❤️
        </motion.p>

        <motion.p
          className="font-display mt-6 text-sm tracking-[0.35em] text-[var(--rose-gold)] uppercase sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
        >
          Forever & Always
        </motion.p>
      </div>
    </motion.section>
  );
}
