"use client";

import { useMemo } from "react";

type RosePetalsProps = {
  count?: number;
};

export function RosePetals({ count = 24 }: RosePetalsProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 41) % 100}%`,
        delay: `${(i % 12) * 0.45}s`,
        duration: `${7 + (i % 6)}s`,
        size: 10 + (i % 10),
        hue: i % 3,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-0"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.35,
            borderRadius: "50% 0 50% 50%",
            background:
              p.hue === 0
                ? "linear-gradient(135deg, #ff8fab, #c9184a)"
                : p.hue === 1
                  ? "linear-gradient(135deg, #ffb3c1, #e8a0b0)"
                  : "linear-gradient(135deg, #f7cad0, #d4a574)",
            opacity: 0.75,
            animation: `fall-petal ${p.duration} linear ${p.delay} infinite`,
            transform: `rotate(${p.id * 20}deg)`,
          }}
        />
      ))}
    </div>
  );
}
