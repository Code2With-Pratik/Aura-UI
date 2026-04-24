import Hero from "@/components/Hero";
import WindowMockup from "@/components/WindowMockup";
import BentoGrid from "@/components/BentoGrid";
import Marquee from "@/components/Marquee";
import SnakeRail from "@/components/SnakeRail";
import Faq from "@/components/Faq";
import {
  MarkBrush,
  MarkCircle,
  MarkDoubleUnderline,
  MarkScribble,
  MarkSparkle,
  Sparkle,
} from "@/components/HandMarkers";

export default function Page() {
  return (
    <main className="relative">
      {/* SnakeRail spans Hero + WindowMockup as a sticky right-side overlay,
          so the four cards (CodePen / HTML / CSS / JS) and the snake-stroke
          flow continuously across both sections as the user scrolls. */}
      <div className="relative">
        <SnakeRail />
        <Hero />

        <section className="relative z-20 mx-auto w-full max-w-[1060px] px-6 pb-24 md:mt-12 md:pb-36">
          <WindowMockup />
        </section>
      </div>

      <Marquee />

      <section
        id="components"
        className="relative mx-auto w-full max-w-[1240px] px-6 py-24 md:py-36"
      >
        {/* Centered section header — same treatment as the Showcase block:
            eyebrow, single-line title with sparkles around the accent
            word, gradient + diamond accent line, then a richer paragraph
            with hand-drawn markers and inline sparkles. */}
        <header className="mb-12 flex flex-col items-center px-2 text-center md:mb-16">
          <p className="eyebrow mb-3">The system</p>

          <h2 className="display-clamp text-balance md:whitespace-nowrap">
            Composable
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
                primitives
              </span>
            </span>
          </h2>

          {/* Bottom accent line — same gradient + diamond as ShowcaseHeader */}
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

          <p className="mt-7 max-w-[640px] text-pretty text-base leading-relaxed text-fg/70 md:text-lg">
            Every surface — buttons, inputs,{" "}
            <MarkCircle>cards</MarkCircle>, tables — flows from the same set of{" "}
            <MarkBrush>tokens</MarkBrush>. Borders breathe with{" "}
            <MarkDoubleUnderline>depth</MarkDoubleUnderline>, glass refracts{" "}
            <MarkSparkle>light</MarkSparkle>
            {/* Mobile cuts the paragraph here for a tighter card; full
                copy continues from md+ screens. */}
            <span className="md:hidden">.</span>
            <span className="hidden md:inline">
              , glow follows the accent, and a subtle{" "}
              <MarkScribble>grain</MarkScribble> ties it all together. Swap a
              single token and watch the whole{" "}
              <MarkSparkle>system</MarkSparkle> retune itself across every
              component.
            </span>
          </p>
        </header>
        <BentoGrid />
      </section>

      <Faq />
    </main>
  );
}
