"use client";

import { useMemo } from "react";

type ConfettiProps = {
  count?: number;
};

const COLORS = [
  "var(--pink)",
  "var(--rose-gold)",
  "var(--lavender)",
  "var(--pink-soft)",
  "#fff",
];

export function Confetti({ count = 40 }: ConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 23) % 100}%`,
        delay: `${(i % 15) * 0.12}s`,
        duration: `${3.5 + (i % 5) * 0.5}s`,
        w: 6 + (i % 5),
        h: 8 + (i % 7),
        color: COLORS[i % COLORS.length],
        round: i % 4 === 0,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0"
          style={{
            left: p.left,
            width: p.w,
            height: p.h,
            borderRadius: p.round ? "999px" : "2px",
            background: p.color,
            animation: `confetti-fall ${p.duration} ease-in ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
