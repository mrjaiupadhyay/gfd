import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit, Great_Vibes } from "next/font/google";
import { ThemeProvider } from "@/lib/ThemeContext";
import { MusicProvider } from "@/lib/MusicContext";
import { SITE } from "@/lib/constants";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE.title} ❤️`,
  description: SITE.description,
  keywords: [
    "Girlfriend's Day",
    "romantic",
    "love story",
    "anniversary",
    "cinematic slideshow",
  ],
  authors: [{ name: "With love" }],
  openGraph: {
    title: `${SITE.title} ❤️`,
    description: SITE.description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.title} ❤️`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a0f2e" },
    { media: "(prefers-color-scheme: light)", color: "#fff5f8" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${script.variable}`}
    >
      <body className="font-body antialiased">
        <ThemeProvider>
          <MusicProvider>{children}</MusicProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
