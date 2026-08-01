"use client";

import { useTheme } from "@/lib/ThemeContext";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light romantic mode" : "Switch to dark romantic mode"
      }
      className={cn(
        "glass flex h-11 w-11 items-center justify-center rounded-xl text-base transition-transform hover:scale-105 active:scale-95",
        className,
      )}
    >
      {theme === "dark" ? "✧" : "☾"}
    </button>
  );
}
