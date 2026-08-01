# Happy Girlfriend's Day ❤️

A premium cinematic romantic experience built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Optimized for instant deployment on **Vercel** — no backend required.

## Features

- Loading screen with animated heart
- Landing hero: **Happy Girlfriend's Day** + glowing **Start Our Story** CTA
- Full-screen cinematic photo slideshow (auto-advance, pause/play, next/prev)
- Ken Burns zoom, glassmorphism UI, gradient animated background
- Floating hearts, sparkles, stars, cursor heart particles
- Ending sequence with heart explosion, rose petals, confetti, and starry night
- Together-for-X-seconds countdown (live)
- Floating romantic quotes
- Dark/light romantic mode
- Mobile swipe + keyboard navigation (`←` `→` Space)
- Lazy-loaded images & SEO metadata

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

### 1. Photos

Replace the placeholders in `public/photos/`:

- `photo1.jpg` … `photo8.jpg`

Keep the same filenames (or update paths in `lib/constants.ts`).

If you replace a photo with the same filename and still see the old image, bump that slide's `cacheVersion` in `lib/constants.ts` (e.g. `"3"` → `"4"`) and hard-refresh the page. You can also bump `SITE.photoCacheVersion` to refresh every photo at once.

### 2. Music

Replace `public/music.mp3` with your own romantic track (MP3 recommended).

### 3. Captions & anniversary

Edit `lib/constants.ts`:

- `SITE.togetherSince` — relationship start date (`YYYY-MM-DD`)
- `SLIDES` — captions and photo paths
- `FLOATING_QUOTES` — ambient quotes on the landing screen

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Local development server |
| `npm run build`| Production build         |
| `npm run start`| Serve production build   |
| `npm run lint` | Run ESLint               |

## Deploy on Vercel

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts, then promote to production:

```bash
vercel --prod
```

### Option B — GitHub + Vercel Dashboard

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the repository.
4. Framework Preset: **Next.js** (auto-detected).
5. Click **Deploy**.

No environment variables are required.

## Project structure

```
/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
├── lib/
├── public/
│   ├── photos/
│   └── music.mp3
└── package.json
```

## Notes

- Browsers may block autoplay with sound; music starts on page load when allowed, otherwise on the first tap/click.
- For reduced motion preferences, heavy CSS loops are disabled via `prefers-reduced-motion`.

Made with love.
