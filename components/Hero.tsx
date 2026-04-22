"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import HoneycombGallery from "./HoneycombGallery";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 md:pt-40 md:pb-36">
      <div className="hero-glow" />

      <div className="relative mx-auto w-full max-w-[1240px] px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          {/* Top-left honeycomb showcase */}
          <div className="order-1 flex justify-center lg:order-none lg:justify-start">
            <HoneycombGallery />
          </div>

          {/* Hero copy — centered on mobile, left-aligned on desktop */}
          <motion.div
            variants={stagger(0.15, 0.12)}
            initial="hidden"
            animate="visible"
            className="order-2 flex flex-col items-center text-center lg:order-none lg:items-start lg:text-left"
          >
            <motion.div variants={fadeUp}>
              <HeroBadge>All systems operational · v0.1</HeroBadge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="display-clamp mt-7 text-balance text-fg"
            >
              Interfaces with{" "}
              <span className="not-italic font-sans font-extralight tracking-tight text-accent-primary">
                aura.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[520px] text-pretty text-base leading-relaxed text-fg/70 md:text-lg"
            >
              A macOS-inspired component system for teams who care about depth,
              motion, and the quiet details. Built for Next.js and Tailwind v4.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
            >
              <a
                href="#components"
                className="group inline-flex items-center gap-2 rounded-full bg-accent-primary px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02]"
                style={{
                  boxShadow:
                    "0 18px 50px -15px color-mix(in srgb, var(--color-accent-primary) 55%, transparent)",
                }}
              >
                Explore the system
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3.5 7h7m0 0L7.5 4m3 3L7.5 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#docs"
                className="aura-border inline-flex items-center gap-2 rounded-full bg-fg/[0.02] px-5 py-2.5 text-sm font-medium text-fg/85 transition-colors hover:bg-fg/[0.05] hover:text-fg"
              >
                <span className="font-mono text-xs text-fg/50">⌘</span> Read the docs
              </a>
            </motion.div>
          </motion.div>
        </div>
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
