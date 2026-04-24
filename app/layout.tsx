import type { Metadata } from "next";
import { Arima, Instrument_Serif, Geist_Mono } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider";
import ThemePicker from "@/components/ThemePicker";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const arima = Arima({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arima",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura UI — A macOS-inspired component system",
  description:
    "A high-fidelity component library inspired by macOS — glassmorphic surfaces, lime accents, and tactile motion.",
  metadataBase: new URL("https://aura-ui.local"),
  openGraph: {
    title: "Aura UI",
    description:
      "macOS-inspired component system built with Next.js 15 and Tailwind v4.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#080808",
};

/**
 * Pre-paint script. Runs before React hydrates so we don't flash the
 * default lime accent before the user's saved choice is applied.
 */
const ACCENT_REHYDRATE = `
try {
  var a = localStorage.getItem('aura-accent');
  if (a) document.documentElement.style.setProperty('--color-accent-primary', a);
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${arima.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: ACCENT_REHYDRATE }} />
      </head>
      <body>
        {/* search.enabled = false disables Fumadocs' built-in ⌘K/Ctrl+K
            search dialog so the shortcut belongs exclusively to our
            custom Spotlight (mounted from Navbar.tsx). */}
        <RootProvider search={{ enabled: false }}>
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <ThemePicker />
        </RootProvider>
      </body>
    </html>
  );
}
