import { SITE } from "./constants";

export function secondsTogether(since = SITE.togetherSince): number {
  const start = new Date(`${since}T00:00:00`).getTime();
  const now = Date.now();
  return Math.max(0, Math.floor((now - start) / 1000));
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
