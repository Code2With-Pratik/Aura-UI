"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { auraEase } from "@/lib/motion";
import SnakeAnimation from "./SnakeAnimation";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * SnakeRail
 *
 * Right-side overlay that spans the parent (Hero + WindowMockup section).
 *
 * Position is set ENTIRELY via JSX inline style — no framer-motion, no
 * CSS keyframes, no GSAP transforms touching layout properties. That
 * means the cards land in the same place on first paint, every paint,
 * every navigation, every remount. No "shift to the left" bug possible.
 *
 * GSAP only animates the SCROLL-DRIVEN bits (vertical translate `y` of
 * the inner stack, and the snake `--strokeDashoffset` CSS variable).
 */
export default function SnakeRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!railRef.current || !scrollerRef.current) return;
    const inner = scrollerRef.current;
    const rail = railRef.current;

    inner.style.setProperty("--strokeDashoffset", "0px");

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: rail,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    /* GSAP composes `y` with the CSS-defined transform on the element, so
       `translateX(-50%) scale(0.78)` from the JSX style is preserved while
       GSAP layers in the scroll-driven translateY. */
    tl.to(inner, { y: -780, duration: 0.55, force3D: true }, 0);
    tl.to(
      inner,
      { "--strokeDashoffset": "-3300px", duration: 1 },
      0,
    );

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.clearTimeout(refreshId);
      tl.scrollTrigger?.kill();
      tl.kill();
      inner.style.removeProperty("--strokeDashoffset");
      /* Strict-Mode-safe: restore the JSX-defined transform on the same
         DOM node. If we leave GSAP's composed matrix in place and the
         effect re-runs (Strict Mode dev or remount), GSAP would re-parse
         the matrix and might lose the xPercent/scale base — which was the
         "shifted left" bug. Forcing the transform back to the JSX value
         guarantees a clean starting point. */
      inner.style.transform = "translateX(-50%) scale(0.78)";
    };
  }, []);

  return (
    <div
      ref={railRef}
      aria-hidden
      className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-[600px] lg:block"
    >
      {/* Sticky viewport pane */}
      <div
        className="pointer-events-auto sticky overflow-hidden"
        style={{
          top: 96,
          height: "min(calc(100vh - 120px), 920px)",
          width: 600,
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 88%, transparent 100%)",
        }}
      >
        {/* The static transform lives RIGHT HERE in the JSX inline style.
            React applies it on every render, so the element is correctly
            positioned the moment it hits the DOM — no JS effect needed,
            no race condition possible. */}
        <div
          ref={scrollerRef}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: 740,
            transform: "translateX(-50%) scale(0.78)",
            transformOrigin: "top center",
            willChange: "transform",
          }}
        >
          {/* Entry animation lives on this INNER wrapper — same fade-up +
              blur as the HoneycombGallery and Hero copy. Crucially this is
              inside the sticky pane and the positioned scroller, so its
              `filter` + `transform` only affect the visible snake/cards,
              never the rail's outer layout or the sticky containing block.
              That's the trick: same look as the other components, no shift. */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: auraEase, delay: 0.2 }}
          >
            <SnakeAnimation />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
