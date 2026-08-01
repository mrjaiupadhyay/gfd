export const SITE = {
  title: "Happy Girlfriend's Day",
  description:
    "A cinematic love letter for Girlfriend's Day — our story, our memories, forever.",
  /** Change this to the day your relationship began (YYYY-MM-DD). */
  togetherSince: "2025-09-21",
  /** Bump when you replace any photo (same filename) so browsers load the new files. */
  photoCacheVersion: "4",
} as const;

export type Slide = {
  id: number;
  src: string;
  caption: string;
  alt: string;
  /** Bump when you replace this photo (same filename). */
  cacheVersion?: string;
};

export function slidePhotoSrc(slide: Slide): string {
  const version = slide.cacheVersion ?? SITE.photoCacheVersion;
  return `${slide.src}?v=${version}`;
}

export const SLIDES: Slide[] = [
  {
    id: 1,
    src: "/photos/photo1.jpg",
    cacheVersion: "4",
    caption: "Every love story is beautiful, but ours is my favorite ❤️",
    alt: "Memory one",
  },
  {
    id: 2,
    src: "/photos/photo2.jpg",
    cacheVersion: "4",
    caption: "Thank you for coming into my life.",
    alt: "Memory two",
  },
  {
    id: 3,
    src: "/photos/photo3.jpg",
    cacheVersion: "4",
    caption: "You make every ordinary day magical.",
    alt: "Memory three",
  },
  {
    id: 4,
    src: "/photos/photo4.jpg",
    cacheVersion: "4",
    caption: "Every smile of yours is my favorite memory.",
    alt: "Memory four",
  },
  {
    id: 5,
    src: "/photos/photo5.jpg",
    cacheVersion: "4",
    caption: "Home is wherever you are.",
    alt: "Memory five",
  },
  {
    id: 6,
    src: "/photos/photo6.jpg",
    cacheVersion: "4",
    caption: "You're my best friend and my forever.",
    alt: "Memory six",
  },
  {
    id: 7,
    src: "/photos/photo7.jpg",
    cacheVersion: "4",
    caption: "Thank you for loving me.",
    alt: "Memory seven",
  },
  {
    id: 8,
    src: "/photos/photo8.jpg",
    cacheVersion: "4",
    caption: "Happy Girlfriend's Day ❤️",
    alt: "Memory eight",
  },
];

export const FLOATING_QUOTES = [
  "You are my favorite notification.",
  "In your eyes, I found home.",
  "Love is patient. Love is kind. Love is you.",
  "My heart chose you — every single day.",
  "You are poetry I never want to finish.",
  "Forever looks beautiful with you.",
] as const;

export const SLIDE_DURATION_MS = 5000;
