"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import { EndingScreen } from "./EndingScreen";
import { HeartCursor } from "./HeartCursor";
import { LandingScreen } from "./LandingScreen";
import { LoadingScreen } from "./LoadingScreen";
import { Slideshow } from "./Slideshow";
import { ThemeToggle } from "./ThemeToggle";

type Stage = "loading" | "landing" | "slideshow" | "ending";

export function Experience() {
  const [stage, setStage] = useState<Stage>("loading");

  const handleLoaded = useCallback(() => {
    setStage("landing");
  }, []);

  const handleStart = useCallback(() => {
    setStage("slideshow");
  }, []);

  const handleSlideshowComplete = useCallback(() => {
    setStage("ending");
  }, []);

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <HeartCursor />

      {stage !== "loading" && (
        <div className="fixed top-4 right-4 z-50 sm:top-6 sm:right-6">
          <ThemeToggle />
        </div>
      )}

      <AnimatePresence mode="wait">
        {stage === "loading" && (
          <LoadingScreen key="loading" onComplete={handleLoaded} />
        )}
        {stage === "landing" && (
          <LandingScreen key="landing" onStart={handleStart} />
        )}
        {stage === "slideshow" && (
          <Slideshow key="slideshow" onComplete={handleSlideshowComplete} />
        )}
        {stage === "ending" && <EndingScreen key="ending" />}
      </AnimatePresence>
    </main>
  );
}
