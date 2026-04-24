"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import HoneycombGallery from "./HoneycombGallery";
import {
  MarkBox,
  MarkBrush,
  MarkCircle,
  MarkDoubleUnderline,
  MarkScribble,
  MarkSunburst,
} from "./HandMarkers";

/**
 * Hero
 *
 * Centered intro copy with the HoneycombGallery decoration on the left.
 * The right-side SnakeAnimation now lives in `<SnakeRail />`, which is
 * mounted in `app/(site)/page.tsx` so it can span both the Hero and the
 * WindowMockup section as a sticky overlay.
 */
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-16 pb-12 md:pt-24 md:pb-20">
      <div className="hero-glow" />

      {/* Top-left decoration — Honeycomb showcase */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-2 top-8 z-10 hidden lg:block"
      >
        <div className="pointer-events-auto">
          <HoneycombGallery />
        </div>
      </div>

      {/* Hero copy — always centered, sits in the middle on top of decorations */}
      <motion.div
        variants={stagger(0.15, 0.12)}
        initial="hidden"
        animate="visible"
        className="relative z-20 mx-auto flex w-full max-w-[760px] flex-col items-center px-6 text-center"
      >
        <motion.div variants={fadeUp}>
          <HeroBadge>All systems operational · v0.1</HeroBadge>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="display-clamp mt-6 text-balance text-fg"
        >
          Interfaces with
          <br />
          <span className="not-italic font-sans font-extralight tracking-tight text-accent-primary">
            Aura
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-[520px] text-pretty text-base leading-relaxed text-fg/70 md:text-lg"
        >
          A <MarkCircle>macOS-inspired</MarkCircle> component system for teams
          who care about <MarkDoubleUnderline>depth</MarkDoubleUnderline>,{" "}
          <MarkBrush>motion</MarkBrush>, and the{" "}
          <MarkScribble>quiet details</MarkScribble>. Built for{" "}
          <MarkBox>Next.js</MarkBox> and{" "}
          <MarkSunburst>Tailwind v4</MarkSunburst>.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href="/components"
            className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
            style={{
              background:
                "color-mix(in srgb, var(--color-accent-primary) 28%, transparent)",
              backdropFilter: "blur(18px) saturate(180%)",
              WebkitBackdropFilter: "blur(18px) saturate(180%)",
              border:
                "1px solid color-mix(in srgb, var(--color-accent-primary) 55%, transparent)",
              color: "var(--color-fg)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.18), 0 18px 50px -15px color-mix(in srgb, var(--color-accent-primary) 55%, transparent)",
            }}
          >
            Explore Components
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3.5 7h7m0 0L7.5 4m3 3L7.5 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="/docs"
            className="aura-glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-fg/90 transition-colors hover:text-fg"
          >
            <span className="font-mono text-xs text-fg/50">⌘</span> Read the docs
          </Link>
        </motion.div>
      </motion.div>

      {/* Mobile fallback — honeycomb shown once, centered, below hero copy */}
      <div className="relative z-10 mx-auto mt-12 flex w-full justify-center px-6 lg:hidden">
        <HoneycombGallery />
      </div>
    </section>
  );
}

function HeroBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="aura-glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-fg/85">
      <span className="relative inline-flex h-2 w-2">
        <span
          className="absolute inset-0 rounded-full bg-accent-primary opacity-60 blur-[2px]"
          style={{ animation: "var(--animate-blink)" }}
        />
        <span className="relative h-2 w-2 rounded-full bg-accent-primary" />
      </span>
      {children}
    </span>
  );
}

