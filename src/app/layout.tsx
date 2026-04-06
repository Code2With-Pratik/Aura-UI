import { ThemeProvider } from "@/components/theme-provider";
import { SiteChrome } from "@/components/site-chrome";
import { Arima } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const arima = Arima({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-arima",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NexaUI — Glassmorphism UI for curious engineers",
    template: "%s · NexaUI",
  },
  description:
    "Minimal, glass-forward Next.js experience with motion, bento labs, and typography-led storytelling. Built with Next.js App Router, Tailwind CSS v4, and Framer Motion.",
  keywords: [
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "glassmorphism",
    "UI",
    "design system",
  ],
  authors: [{ name: "NexaUI" }],
  openGraph: {
    title: "NexaUI — Engineering curiosity",
    description:
      "Glass, motion, and systems that feel inevitable. A minimalist landing surface for bold ideas.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexaUI",
    description:
      "Minimalist, creative, glassmorphism-heavy UI kit vibe — built for builders.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffdf7" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${arima.variable} min-h-screen antialiased`}>
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
