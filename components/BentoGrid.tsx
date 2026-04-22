"use client";

import { motion } from "framer-motion";
import { auraEase } from "@/lib/motion";

type Cell = {
  span: 4 | 5 | 7;
  title: string;
  body: string;
  eyebrow: string;
  accent: "primary" | "secondary" | "tertiary";
  visual: "orbit" | "stack" | "grid" | "wave" | "rings";
};

const cells: Cell[] = [
  {
    span: 7,
    eyebrow: "01 — Surfaces",
    title: "Glass that breathes.",
    body: "Backdrop-filtered surfaces sit above grain and glow, picking up the light underneath without ever feeling heavy.",
    accent: "primary",
    visual: "orbit",
  },
  {
    span: 5,
    eyebrow: "02 — Motion",
    title: "Tactile by default.",
    body: "Every transition rides the same easing curve so the system feels like one piece of hardware.",
    accent: "secondary",
    visual: "wave",
  },
  {
    span: 5,
    eyebrow: "03 — Tokens",
    title: "Themeable to the pixel.",
    body: "Colors, radii, easings, and grain — all CSS variables, all adjustable in one place.",
    accent: "tertiary",
    visual: "stack",
  },
  {
    span: 7,
    eyebrow: "04 — Composition",
    title: "Bento-ready primitives.",
    body: "Spans of 4, 5, and 7 give you a flexible 12-column rhythm that holds up at every breakpoint.",
    accent: "primary",
    visual: "grid",
  },
  {
    span: 4,
    eyebrow: "05 — Density",
    title: "Lives in dense UIs.",
    body: "Drop into dashboards, editors, or settings panes without re-tuning a single token.",
    accent: "secondary",
    visual: "rings",
  },
  {
    span: 4,
    eyebrow: "06 — Accessibility",
    title: "Quiet contrast.",
    body: "WCAG-respecting ramps with focus rings that never break the calm of the surface.",
    accent: "tertiary",
    visual: "stack",
  },
  {
    span: 4,
    eyebrow: "07 — Performance",
    title: "60fps, even on the M-series.",
    body: "Variables drive animation properties, keeping work on the compositor thread.",
    accent: "primary",
    visual: "wave",
  },
];

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
      {cells.map((c, i) => (
        <motion.article
          key={c.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: i * 0.06, ease: auraEase }}
          className={`aura-card group relative overflow-hidden p-6 md:p-8 ${spanClass(c.span)}`}
          style={{
            background: `linear-gradient(180deg, color-mix(in srgb, var(--color-accent-${c.accent}) 5%, transparent) 0%, transparent 35%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 60%), var(--color-surface)`,
          }}
        >
          <div className="relative z-10 flex h-full flex-col">
            <p className="eyebrow mb-4">{c.eyebrow}</p>
            <h3 className="font-display text-2xl italic leading-tight text-fg md:text-3xl">
              {c.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-fg/55">
              {c.body}
            </p>

            <div className="mt-auto pt-8">
              <Visual kind={c.visual} accent={c.accent} />
            </div>
          </div>

          {/* corner glow on hover */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
            style={{
              background: `var(--color-accent-${c.accent})`,
            }}
          />
        </motion.article>
      ))}
    </div>
  );
}

function spanClass(span: 4 | 5 | 7) {
  if (span === 4) return "md:col-span-4";
  if (span === 5) return "md:col-span-5";
  return "md:col-span-7";
}

function Visual({
  kind,
  accent,
}: {
  kind: Cell["visual"];
  accent: Cell["accent"];
}) {
  const color = `var(--color-accent-${accent})`;

  if (kind === "orbit") {
    return (
      <div className="relative h-32 w-full overflow-hidden rounded-xl aura-tile">
        {[60, 100, 150].map((r, i) => (
          <span
            key={r}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: r,
              height: r,
              borderColor: `color-mix(in srgb, ${color} ${30 - i * 8}%, transparent)`,
            }}
          />
        ))}
        <span
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 24px ${color}` }}
        />
      </div>
    );
  }

  if (kind === "wave") {
    return (
      <div className="flex h-24 items-end gap-1.5 overflow-hidden rounded-xl aura-tile p-3">
        {Array.from({ length: 28 }).map((_, i) => {
          const h = 20 + Math.abs(Math.sin(i * 0.55)) * 70;
          return (
            <span
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: `linear-gradient(180deg, ${color}, color-mix(in srgb, ${color} 20%, transparent))`,
                opacity: 0.5 + Math.sin(i * 0.55) * 0.5,
              }}
            />
          );
        })}
      </div>
    );
  }

  if (kind === "grid") {
    return (
      <div className="grid h-32 grid-cols-6 gap-1.5 overflow-hidden rounded-xl aura-tile p-2">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="rounded-sm"
            style={{
              background:
                i % 5 === 0
                  ? color
                  : "rgba(255,255,255,0.04)",
              opacity: i % 5 === 0 ? 0.85 : 1,
            }}
          />
        ))}
      </div>
    );
  }

  if (kind === "stack") {
    return (
      <div className="relative h-28 w-full overflow-hidden rounded-xl aura-tile">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute left-1/2 h-16 w-4/5 -translate-x-1/2 rounded-md border border-[var(--color-border-default)]"
            style={{
              top: 18 + i * 14,
              background: `color-mix(in srgb, ${color} ${14 - i * 4}%, var(--color-surface-elevated))`,
              transform: `translateX(-50%) scale(${1 - i * 0.06})`,
              opacity: 1 - i * 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  // rings
  return (
    <div className="flex h-28 items-center justify-center overflow-hidden rounded-xl aura-tile">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="48" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle
          cx="60"
          cy="60"
          r="48"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="240 360"
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <text
          x="60"
          y="66"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="18"
          fill="white"
        >
          78%
        </text>
      </svg>
    </div>
  );
}
