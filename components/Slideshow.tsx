"use client";

import { SLIDES, SLIDE_DURATION_MS, SITE, slidePhotoSrc } from "@/lib/constants";
import { useSwipe } from "@/lib/useSwipe";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type SlideshowProps = {
  onComplete: () => void;
};

export function Slideshow({ onComplete }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);
  const progressRef = useRef(0);
  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  const goNext = useCallback(() => {
    if (isLast) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
      return;
    }
    progressRef.current = 0;
    setProgress(0);
    setIndex((i) => i + 1);
  }, [isLast, onComplete]);

  const goPrev = useCallback(() => {
    progressRef.current = 0;
    setProgress(0);
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const swipe = useSwipe({
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
  });

  useEffect(() => {
    SLIDES.forEach((s) => {
      const img = new window.Image();
      img.src = slidePhotoSrc(s);
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const started = performance.now();
    const base = progressRef.current;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - started;
      const pct = Math.min(1, base + elapsed / SLIDE_DURATION_MS);
      progressRef.current = pct;
      setProgress(pct);
      if (pct >= 1) {
        goNext();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [index, paused, goNext]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === " " || e.key === "k") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  return (
    <motion.section
      className="fixed inset-0 z-30 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      {...swipe}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${slide.id}-${slide.cacheVersion ?? SITE.photoCacheVersion}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={slidePhotoSrc(slide)}
              alt={slide.alt}
              fill
              priority={slide.id <= 2}
              loading={slide.id <= 2 ? undefined : "lazy"}
              sizes="100vw"
              className="ken-burns object-cover"
              unoptimized
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,5,20,0.35) 0%, rgba(10,5,20,0.15) 40%, rgba(10,5,20,0.75) 100%)",
              }}
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-6 pb-28 pt-16 sm:pb-32">
            <motion.p
              className="font-display max-w-2xl text-center text-2xl leading-snug font-medium text-white sm:text-3xl md:text-4xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
            >
              {slide.caption}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress segments */}
      <div className="absolute top-0 right-0 left-0 z-20 flex gap-1.5 px-3 pt-3 sm:px-5 sm:pt-5">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className="h-1 flex-1 overflow-hidden rounded-full bg-white/25"
          >
            <div
              className="h-full rounded-full bg-white transition-[width] duration-100 ease-linear"
              style={{
                width:
                  i < index ? "100%" : i === index ? `${progress * 100}%` : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-3 px-4 pb-6 sm:px-8 sm:pb-8">
        <button
          type="button"
          onClick={goPrev}
          disabled={index === 0}
          className="glass rounded-xl px-4 py-2.5 text-sm text-white disabled:opacity-35"
          aria-label="Previous photo"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="glass flex h-11 w-11 items-center justify-center rounded-xl text-white"
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
        >
          {paused ? "▶" : "❚❚"}
        </button>

        <button
          type="button"
          onClick={goNext}
          className="glass rounded-xl px-4 py-2.5 text-sm text-white"
          aria-label={isLast ? "Finish story" : "Next photo"}
        >
          {isLast ? "Finish" : "Next"}
        </button>
      </div>

      <p className="pointer-events-none absolute bottom-20 left-1/2 z-20 hidden -translate-x-1/2 text-xs text-white/50 sm:bottom-24 sm:block">
        ← → keys · Space to pause · Swipe on mobile
      </p>
    </motion.section>
  );
}
