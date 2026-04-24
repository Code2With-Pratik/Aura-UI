"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auraEase } from "@/lib/motion";
import {
  MarkBox,
  MarkBrush,
  MarkCircle,
  MarkScribble,
  Sparkle,
} from "./HandMarkers";

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Is Aura UI free to use?",
    a: "Yes — Aura UI is fully open source under the MIT licence. Use it in personal projects, commercial products, client work, or internal tooling without restriction or attribution. We only ask that you keep the licence header in any source files you redistribute. Stars on GitHub help us prioritise what to build next, but they are entirely optional. If your team wants priority support, custom themes, or a private fork, get in touch — paid arrangements exist but are never required to use the library.",
  },
  {
    q: "Does it support React 19 and Next.js 15?",
    a: "Yes. Aura is built from the ground up for React 19 and the Next.js 15 App Router, including Server Components, Server Actions, streaming, and the new use() hook for promises. Every primitive is marked appropriately — interactive pieces opt into 'use client' only when they need to, so most of your tree stays on the server. We use Tailwind v4 with @theme tokens (not the legacy config file), and our motion layer is Framer Motion 11. All components are edge-compatible and run on Vercel, Cloudflare, and Node — no Node-only dependencies in the runtime bundle.",
  },
  {
    q: "How do I customise the accent colour?",
    a: "Three options. (1) For end users: click the floating Theme picker on the bottom-right of any page to swap the accent live — the change persists in localStorage and re-tints every component, including hand-drawn markers and SVG decorations, on the same frame. (2) For brand owners: override the --color-accent-primary CSS variable in your stylesheet, and the entire system retunes. There are also --color-accent-secondary and --color-accent-tertiary if you want a coordinated palette. (3) For deeper changes, every token (radii, shadows, easings, grain) lives in app/globals.css under a single @theme block — edit that file once and the change ripples through.",
  },
  {
    q: "Can I use Aura in production today?",
    a: "Yes, but pin the version. We are still pre-1.0, so APIs may shift between minor releases as we refine the primitive surface. Several teams already ship Aura in production for marketing sites, internal dashboards, and SaaS apps — the components themselves are stable and battle-tested. For larger codebases we recommend wrapping Aura in your own thin layer (e.g. <YourButton /> that re-exports <AuraButton />), which insulates your product from upstream renames and gives you a single place to add company-specific defaults. The 1.0 release will lock the public API and switch to semver; until then, treat minor version bumps as you would a careful refactor.",
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative mx-auto w-full max-w-[860px] px-6 pb-0 md:pb-6 lg:max-w-[1080px]"
    >
      {/* Header — same recipe as Showcase / Composable primitives */}
      <header className="mb-6 flex flex-col items-center px-2 text-center md:mb-8">
        <p className="eyebrow mb-3">Help</p>

        <h2 className="display-clamp text-balance md:whitespace-nowrap">
          Frequently asked
          <span className="relative ml-2 inline-block px-2.5 align-baseline">
            <Sparkle
              className="absolute -left-1 -top-1 h-4 w-4"
              delay="0s"
            />
            <Sparkle
              className="absolute -right-2 top-2 h-3 w-3"
              delay="0.5s"
            />
            <Sparkle
              className="absolute -bottom-1 left-3 h-2.5 w-2.5"
              delay="1s"
            />
            <Sparkle
              className="absolute -right-1 -bottom-2 h-3.5 w-3.5"
              delay="1.4s"
            />
            <span
              className="relative not-italic font-sans font-light"
              style={{ color: "var(--color-accent-primary)" }}
            >
              questions
            </span>
          </span>
        </h2>

        <div aria-hidden className="mt-5 flex items-center gap-2.5">
          <span
            className="h-[2px] w-14 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent-primary) 75%, transparent))",
            }}
          />
          <span
            className="h-1.5 w-1.5 rotate-45"
            style={{
              backgroundColor: "var(--color-accent-primary)",
              boxShadow:
                "0 0 12px color-mix(in srgb, var(--color-accent-primary) 70%, transparent)",
            }}
          />
          <span
            className="h-[2px] w-14 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--color-accent-primary) 75%, transparent), transparent)",
            }}
          />
        </div>

        <p className="mt-7 max-w-[560px] text-pretty text-base leading-relaxed text-fg/70 md:text-lg">
          Quick answers about <MarkBrush>themes</MarkBrush>,{" "}
          <MarkCircle>tokens</MarkCircle>,{" "}
          <MarkScribble>motion</MarkScribble>, and shipping with{" "}
          <MarkBox>Next.js</MarkBox>.
        </p>
      </header>

      {/* Accordion */}
      <div className="space-y-3">
        {FAQS.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <article
              key={item.q}
              /* hover:transform-none cancels the .aura-card:hover lift
                 from globals.css so the accordion stays put on hover.
                 Border / shadow accent on hover remain. */
              className="aura-card overflow-hidden hover:transform-none"
              style={{ padding: 0 }}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-[14.5px] font-medium text-fg transition-colors md:px-6 md:py-5 md:text-base"
              >
                <span className="flex items-center gap-3">
                  <span
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[11px] font-bold"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--color-accent-primary) 18%, transparent)",
                      color: "var(--color-accent-primary)",
                      border:
                        "1px solid color-mix(in srgb, var(--color-accent-primary) 35%, transparent)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item.q}</span>
                </span>
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border-default"
                  style={{
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    color: isOpen
                      ? "var(--color-accent-primary)"
                      : "var(--color-fg-muted)",
                    borderColor: isOpen
                      ? "color-mix(in srgb, var(--color-accent-primary) 45%, transparent)"
                      : "var(--color-border-default)",
                    transition:
                      "transform 320ms var(--ease-aura), color 200ms var(--ease-aura), border-color 200ms var(--ease-aura)",
                  }}
                >
                  <PlusIcon />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: auraEase }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-4 pb-5 pl-[3.1rem] text-[14px] leading-relaxed text-fg/65 md:px-6 md:pb-6 md:pl-[3.6rem] md:text-[15px]">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function PlusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M7 2v10M2 7h10" />
    </svg>
  );
}
