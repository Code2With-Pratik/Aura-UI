import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fonts — Aura UI",
  description: "The type system behind Aura UI — Arima for body, Instrument Serif for display, Geist Mono for code.",
};

const families = [
  {
    name: "Arima",
    role: "Body & UI",
    cssVar: "--font-arima",
    sample: "The quiet fundamentals carry the loudest interfaces.",
    weights: [400, 500, 600, 700],
    style: { fontFamily: "var(--font-sans)" } as const,
  },
  {
    name: "Instrument Serif",
    role: "Display · italic",
    cssVar: "--font-instrument-serif",
    sample: "Interfaces with aura.",
    weights: [400],
    style: { fontFamily: "var(--font-display)", fontStyle: "italic" } as const,
  },
  {
    name: "Geist Mono",
    role: "Code & numerics",
    cssVar: "--font-geist-mono",
    sample: "const aura = (system) => system.feels.alive;",
    weights: [400, 500, 600],
    style: { fontFamily: "var(--font-mono)" } as const,
  },
];

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 — • ⌘ ↗";

export default function FontsPage() {
  return (
    <main className="relative mx-auto w-full max-w-[1240px] px-6 py-20 md:py-28">
      <header className="mb-16 max-w-2xl">
        <p className="eyebrow mb-3">Type system</p>
        <h1 className="display-clamp text-balance text-fg">
          Three families,{" "}
          <span className="not-italic font-sans font-light text-[var(--color-accent-primary)]">
            one voice.
          </span>
        </h1>
        <p className="mt-6 text-pretty text-base leading-relaxed text-fg/60">
          Arima holds the body and UI. Instrument Serif handles display moments — the place where the system breathes.
          Geist Mono carries code, shortcuts, and tabular numerics.
        </p>
      </header>

      <div className="space-y-6">
        {families.map((f) => (
          <article
            key={f.name}
            className="aura-card relative overflow-hidden p-6 md:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--color-border-default)] pb-4">
              <div>
                <h2 className="text-[22px] font-semibold text-fg">{f.name}</h2>
                <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-fg/40">
                  {f.role}
                </p>
              </div>
              <code className="rounded-md border border-[var(--color-border-default)] bg-black/40 px-2 py-1 font-mono text-[11px] text-[var(--color-accent-primary)]">
                var({f.cssVar})
              </code>
            </div>

            <p
              className="mt-8 text-balance leading-[1] text-fg"
              style={{
                ...f.style,
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {f.sample}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <p
                className="text-pretty text-fg/55"
                style={{ ...f.style, fontSize: "15px", lineHeight: 1.6 }}
              >
                {characters}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {f.weights.map((w) => (
                  <li
                    key={w}
                    className="rounded-full border border-[var(--color-border-default)] bg-fg/[0.03] px-2.5 py-1 font-mono text-[11px] text-fg/60"
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
