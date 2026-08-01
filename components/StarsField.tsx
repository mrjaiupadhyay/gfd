"use client";

import { useMemo } from "react";

type StarsFieldProps = {
  count?: number;
  denser?: boolean;
};

export function StarsField({ count = 60, denser = false }: StarsFieldProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: denser ? count + 40 : count }, (_, i) => ({
        id: i,
        top: `${(i * 47 + 13) % 100}%`,
        left: `${(i * 31 + 7) % 100}%`,
        size: 1 + (i % 3),
        delay: `${(i % 20) * 0.25}s`,
        duration: `${2 + (i % 5) * 0.6}s`,
      })),
    [count, denser],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: 0.35 + (s.id % 5) * 0.1,
            animation: `twinkle ${s.duration} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
