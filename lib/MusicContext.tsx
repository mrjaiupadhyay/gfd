"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type MusicContextValue = {
  isPlaying: boolean;
  isReady: boolean;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => Promise<void>;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const unlockBoundRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    try {
      await audio.play();
    } catch {
      // Autoplay blocked until a user gesture — unlock listeners handle this.
    }
  }, []);

  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.setAttribute("loop", "");
    audio.preload = "auto";
    audio.volume = 0.45;
    audio.autoplay = true;
    audioRef.current = audio;

    const onCanPlay = () => {
      setIsReady(true);
      void audio.play().catch(() => undefined);
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      audio.currentTime = 0;
      void audio.play().catch(() => undefined);
    };

    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    // Try immediately (some browsers allow it)
    void audio.play().catch(() => undefined);

    const unlock = () => {
      if (unlockBoundRef.current) return;
      if (!audio.paused) {
        unlockBoundRef.current = true;
        return;
      }
      void audio.play().then(() => {
        unlockBoundRef.current = true;
      });
    };

    const unlockEvents: Array<keyof WindowEventMap> = [
      "pointerdown",
      "touchstart",
      "keydown",
      "click",
    ];
    unlockEvents.forEach((event) =>
      window.addEventListener(event, unlock, { capture: true, passive: true }),
    );

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      unlockEvents.forEach((event) =>
        window.removeEventListener(event, unlock, { capture: true }),
      );
      audioRef.current = null;
    };
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(async () => {
    if (isPlaying) pause();
    else await play();
  }, [isPlaying, pause, play]);

  const value = useMemo(
    () => ({ isPlaying, isReady, play, pause, toggle }),
    [isPlaying, isReady, play, pause, toggle],
  );

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
