"use client";

import { motion } from "framer-motion";
import { auraEase } from "@/lib/motion";
import Component1 from "./HoneyCombComponents/Component1";
import Component2 from "./HoneyCombComponents/Component2";
import Component3 from "./HoneyCombComponents/Component3";
import Component4 from "./HoneyCombComponents/Component4";
import Component5 from "./HoneyCombComponents/Component5";
import Component6 from "./HoneyCombComponents/Component6";
import Component7 from "./HoneyCombComponents/Component7";

type Tile = { Component: React.ComponentType };

/**
 * Each hex now hosts a real interactive React component (the user's
 * HoneyCombComponents/ComponentN.tsx). The components are designed for
 * full-page demos (`min-h-screen`, padded outer wrappers), so we render
 * them inside a CSS `.hex-component-frame` that:
 *   - Strips the demo's full-screen height + outer background
 *   - Centres the inner card
 *   - Scales it down to fit the hex
 *
 * No image bg, no hover-blur — pointer events go straight through to the
 * embedded component so the buttons/inputs/etc. inside stay interactive.
 */
const tiles: Tile[] = [
  { Component: Component1 },
  { Component: Component2 },
  { Component: Component3 },
  { Component: Component4 },
  { Component: Component5 },
  { Component: Component6 },
  { Component: Component7 },
];

/* Compact pointy-top hex tiles — kept small so the gallery sits in the
   hero's top-left without dominating the layout. */
const HEX_W = 200;
const HEX_H = 230;
const GAP = 24;
const HEX_CORNER_RADIUS = 14;

const H_PITCH = HEX_W + GAP;               // 224
const ROW_Y = HEX_H * 0.75 + GAP;          // 196.5

const positions: Array<{ x: number; y: number }> = [
  { x: H_PITCH, y: ROW_Y },                // center
  { x: H_PITCH * 2, y: ROW_Y },            // right
  { x: H_PITCH * 1.5, y: ROW_Y * 2 },      // lower-right
  { x: H_PITCH * 0.5, y: ROW_Y * 2 },      // lower-left
  { x: 0, y: ROW_Y },                      // left
  { x: H_PITCH * 0.5, y: 0 },              // upper-left
  { x: H_PITCH * 1.5, y: 0 },              // upper-right
];

const CONTAINER_W = H_PITCH * 2 + HEX_W;   // 648
const CONTAINER_H = ROW_Y * 2 + HEX_H;     // 623

/* ── Rounded-hex geometry ────────────────────────────────────────── */
function roundedHexPath(W: number, H: number, r: number, inset = 0) {
  const verts: Array<[number, number]> = [
    [W / 2, inset],
    [W - inset, H * 0.25],
    [W - inset, H * 0.75],
    [W / 2, H - inset],
    [inset, H * 0.75],
    [inset, H * 0.25],
  ];

  const offsetTowards = (
    from: [number, number],
    to: [number, number],
    dist: number,
  ): [number, number] => {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    const len = Math.hypot(dx, dy) || 1;
    return [from[0] + (dx * dist) / len, from[1] + (dy * dist) / len];
  };

  let d = "";
  for (let i = 0; i < 6; i++) {
    const prev = verts[(i + 5) % 6];
    const curr = verts[i];
    const next = verts[(i + 1) % 6];
    const enter = offsetTowards(curr, prev, r);
    const exit = offsetTowards(curr, next, r);
    d +=
      (i === 0 ? "M " : "L ") +
      `${enter[0].toFixed(2)} ${enter[1].toFixed(2)} `;
    d += `Q ${curr[0]} ${curr[1]} ${exit[0].toFixed(2)} ${exit[1].toFixed(2)} `;
  }
  return d + "Z";
}

const HEX_PATH_FILL = roundedHexPath(HEX_W, HEX_H, HEX_CORNER_RADIUS);
const HEX_CLIP = `path("${HEX_PATH_FILL}")`;

const STROKE_INSET = 3;
const HEX_PATH_STROKE = roundedHexPath(
  HEX_W,
  HEX_H,
  HEX_CORNER_RADIUS,
  STROKE_INSET,
);

const STRAIGHT_PERIMETER =
  4 * Math.hypot(HEX_W / 2, HEX_H * 0.25) + 2 * (HEX_H * 0.5);
const HEX_PERIMETER =
  STRAIGHT_PERIMETER - HEX_CORNER_RADIUS * (12 - 2 * Math.PI);

/* Scale of each embedded component — slightly bigger so the inside
   text/buttons read clearly inside the hex outline. */
const COMPONENT_SCALE = 0.8;

export default function HoneycombGallery() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: auraEase, delay: 0.2 }}
      className="relative"
      style={{ width: CONTAINER_W, height: CONTAINER_H }}
    >
      {/* Premium hex border-chase keyframes.
         Smooth opacity fade-in/out at the boundaries so the chase doesn't
         pop on/off — it eases in, glides around the hex, then fades out
         gracefully. Three opacity tiers (crisp / glow / inner highlight)
         layer for depth. */}
      <style>{`
        /* Crisp top line — peaks at full opacity */
        @keyframes hex-chase-cw {
          0%      { opacity: 0; stroke-dashoffset: 0; }
          2%      { opacity: 1; }
          12%     { opacity: 1; }
          14.286% { opacity: 0; stroke-dashoffset: -${HEX_PERIMETER}; }
          100%    { opacity: 0; stroke-dashoffset: -${HEX_PERIMETER}; }
        }
        @keyframes hex-chase-ccw {
          0%      { opacity: 0; stroke-dashoffset: 0; }
          2%      { opacity: 1; }
          12%     { opacity: 1; }
          14.286% { opacity: 0; stroke-dashoffset: ${HEX_PERIMETER}; }
          100%    { opacity: 0; stroke-dashoffset: ${HEX_PERIMETER}; }
        }
        /* Wide soft halo — peaks at 0.85, gives the chase its bloom */
        @keyframes hex-chase-glow-cw {
          0%      { opacity: 0; stroke-dashoffset: 0; }
          2%      { opacity: 0.85; }
          12%     { opacity: 0.85; }
          14.286% { opacity: 0; stroke-dashoffset: -${HEX_PERIMETER}; }
          100%    { opacity: 0; stroke-dashoffset: -${HEX_PERIMETER}; }
        }
        @keyframes hex-chase-glow-ccw {
          0%      { opacity: 0; stroke-dashoffset: 0; }
          2%      { opacity: 0.85; }
          12%     { opacity: 0.85; }
          14.286% { opacity: 0; stroke-dashoffset: ${HEX_PERIMETER}; }
          100%    { opacity: 0; stroke-dashoffset: ${HEX_PERIMETER}; }
        }
        /* Inner highlight — thin bright core line, pulses through the chase
           to give it the hot-metal "this is alive" sparkle. */
        @keyframes hex-chase-spark-cw {
          0%      { opacity: 0; stroke-dashoffset: 0; }
          3%      { opacity: 1; }
          11%     { opacity: 1; }
          14.286% { opacity: 0; stroke-dashoffset: -${HEX_PERIMETER}; }
          100%    { opacity: 0; stroke-dashoffset: -${HEX_PERIMETER}; }
        }
        @keyframes hex-chase-spark-ccw {
          0%      { opacity: 0; stroke-dashoffset: 0; }
          3%      { opacity: 1; }
          11%     { opacity: 1; }
          14.286% { opacity: 0; stroke-dashoffset: ${HEX_PERIMETER}; }
          100%    { opacity: 0; stroke-dashoffset: ${HEX_PERIMETER}; }
        }

        /*
          Wrapper that neutralises the embedded HoneyCombComponents'
          full-page demo styling (min-h-screen, dark outer bg, big padding)
          so they render comfortably inside a hex tile.
        */
        .hex-component-frame {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /*
          Reach the Component's actual outer div via .hex-component-scale > *.
          (.hex-component-frame > * was the SCALE wrapper, NOT the Component
          root — that's why the demo's min-h-screen + dark bg was leaking.)
        */
        .hex-component-scale > * {
          min-height: 0 !important;
          min-width: 0 !important;
          width: auto !important;
          height: auto !important;
          padding: 0 !important;
          margin: 0 !important;
          background: transparent !important;
          background-color: transparent !important;
        }
      `}</style>

      {tiles.map((tile, i) => {
        const pos = positions[i];
        const Component = tile.Component;

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: pos.x,
              top: pos.y,
              width: HEX_W,
              height: HEX_H,
            }}
          >
            {/* Embedded component — overflow CLIPPED to the hex shape, so
                the bigger scaled component stays neatly contained inside
                its hex outline (no chaotic spillover into neighbouring
                tiles). The gallery container itself stays unclipped, so
                the rosette as a whole isn't being chopped. */}
            <div
              className="hex-component-frame"
              style={{ clipPath: HEX_CLIP, overflow: "hidden" }}
            >
              <div
                className="hex-component-scale"
                style={{
                  transform: `scale(${COMPONENT_SCALE})`,
                  transformOrigin: "center center",
                  width: "max-content",
                }}
              >
                <Component />
              </div>
            </div>

            {/* Border SVG — TWO layers always visible (static gradient +
                soft glow) plus a chasing dash on top. The chase is
                staggered/alternating per tile, but the underlying border
                stays lit at all times so every hex has a glowing outline
                like the reference design. */}
            <svg
              className="pointer-events-none absolute inset-0"
              width={HEX_W}
              height={HEX_H}
              viewBox={`0 0 ${HEX_W} ${HEX_H}`}
              style={{ zIndex: 5 }}
            >
              <defs>
                {/* Refined 4-stop gradient that loops back to primary so
                    the moving chase has no visible "seam" where it crosses
                    a colour boundary. */}
                <linearGradient
                  id={`hex-glow-${i}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="var(--color-accent-primary)" />
                  <stop offset="33%" stopColor="var(--color-accent-secondary)" />
                  <stop offset="66%" stopColor="var(--color-accent-tertiary)" />
                  <stop offset="100%" stopColor="var(--color-accent-primary)" />
                </linearGradient>
                {/* Soft glow blur (for the wide halo) */}
                <filter
                  id={`hex-glow-blur-${i}`}
                  x="-30%"
                  y="-30%"
                  width="160%"
                  height="160%"
                >
                  <feGaussianBlur stdDeviation="4" />
                </filter>
                {/* Tighter blur for the inner sparkle */}
                <filter
                  id={`hex-glow-blur-tight-${i}`}
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="1.2" />
                </filter>
              </defs>

              {/* STATIC soft halo — always-on accent gradient blur. */}
              <path
                d={HEX_PATH_STROKE}
                fill="none"
                stroke={`url(#hex-glow-${i})`}
                strokeWidth={6}
                strokeLinejoin="round"
                filter={`url(#hex-glow-blur-${i})`}
                opacity={0.45}
              />

              {/* STATIC crisp border — always-on accent gradient outline. */}
              <path
                d={HEX_PATH_STROKE}
                fill="none"
                stroke={`url(#hex-glow-${i})`}
                strokeWidth={1.5}
                strokeLinejoin="round"
                opacity={0.7}
              />

              {/*
                Three-layer chasing assembly for premium depth.
                All three travel at the same pace (`linear` keeps the chase
                speed constant, which feels right for a perimeter trace),
                with the SAME `90px / (perimeter-90)` dash so they sit
                perfectly aligned.
              */}

              {/* 1) WIDE BLURRED HALO — the luminous bloom */}
              <path
                d={HEX_PATH_STROKE}
                fill="none"
                stroke={`url(#hex-glow-${i})`}
                strokeWidth={12}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#hex-glow-blur-${i})`}
                style={{
                  strokeDasharray: `90 ${HEX_PERIMETER - 90}`,
                  opacity: 0,
                  animation: `${i % 2 === 0 ? "hex-chase-glow-ccw" : "hex-chase-glow-cw"} ${tiles.length * 2.4}s linear ${i * 2.4}s infinite`,
                }}
              />

              {/* 2) CRISP MAIN LINE — the chase itself */}
              <path
                d={HEX_PATH_STROKE}
                fill="none"
                stroke={`url(#hex-glow-${i})`}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#hex-glow-blur-tight-${i})`}
                style={{
                  strokeDasharray: `90 ${HEX_PERIMETER - 90}`,
                  opacity: 0,
                  animation: `${i % 2 === 0 ? "hex-chase-ccw" : "hex-chase-cw"} ${tiles.length * 2.4}s linear ${i * 2.4}s infinite`,
                }}
              />

              {/* 3) INNER SPARK — thin white-ish core line that catches the
                  light. Gives the chase the "hot polished filament" look. */}
              <path
                d={HEX_PATH_STROKE}
                fill="none"
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth={0.9}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: `70 ${HEX_PERIMETER - 70}`,
                  opacity: 0,
                  animation: `${i % 2 === 0 ? "hex-chase-spark-ccw" : "hex-chase-spark-cw"} ${tiles.length * 2.4}s linear ${i * 2.4}s infinite`,
                }}
              />
            </svg>
          </div>
        );
      })}
    </motion.div>
  );
}
